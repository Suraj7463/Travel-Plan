import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewTravelPlan = () => {
  const [plans, setPlans] = useState([]); // State to store travel plans
  const [msg, setMsg] = useState(""); // State to manage messages
  const navigate = useNavigate(); // To navigate between routes

  // Fetch travel plans when the component loads
  useEffect(() => {
    fetchTravelPlans();
  }, []);

  // Function to fetch travel plans from backend
  const fetchTravelPlans = async () => {
    try {
      const response = await axios.get("http://localhost:8080/showplan");
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setMsg("Failed to load travel plans.");
    }
  };

  // Function to delete a specific plan by its ID
  const deletePlan = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deleteplan/${id}`);
      setMsg("Plan deleted successfully.");
      fetchTravelPlans(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting plan:", error);
      setMsg("Failed to delete plan.");
    }
  };

  // Navigate to the edit page with the selected plan's data
  const handleEdit = (plan) => {
    navigate("/editplan", { state: plan }); // Pass the plan object to EditPlan
  };

  // Function to toggle the status of a specific plan
  const toggleStatus = async (id) => {
    try {
      await axios.put(`http://localhost:8080/togglestatus/${id}`);
      fetchTravelPlans(); // Refresh plans after status update
    } catch (error) {
      console.error("Error toggling status:", error);
      setMsg("Failed to update status.");
    }
  };

  return (
    <div className="container mt-3">
      <h3 className="text-center">Travel Plans</h3>

      {msg && <div className="alert alert-info">{msg}</div>} {/* Display messages */}

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Plan ID</th>
            <th scope="col">Plan Name</th>
            <th scope="col">Category</th>
            <th scope="col">Min Budget</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.planid}>
              <th scope="row">{plan.planid}</th>
              <td>{plan.planname}</td>
              <td>{plan.plancategory}</td>
              <td>{plan.minbudget}</td>
              <td>{plan.discription}</td>
              <td>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => handleEdit(plan)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePlan(plan.planid)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className={`btn ${
                    plan.status === "Active" ? "btn-primary" : "btn-danger"
                  }`}
                  onClick={() => toggleStatus(plan.planid)}
                >
                  {plan.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/addplan">
        <button className="btn btn-success mt-3">Add New Plan</button>
      </Link>
    </div>
  );
};

export default ViewTravelPlan;
