import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPlan = () => {
  const { state: travel } = useLocation(); // Extract state safely
  const navigate = useNavigate();

  const [plan, setPlan] = useState({
    planid: travel?.planid || 0,
    planname: travel?.planname || "",
    plancategory: travel?.plancategory || "",
    minbudget: travel?.minbudget || 0,
    discription: travel?.discription || "",
    status: travel?.status || "Active",
  });

  useEffect(() => {
    if (!travel) {
      // Redirect to /viewplans if state is null
      navigate("/viewplans");
    }
  }, [travel, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/updateplan/${plan.planid}`, plan);
      alert("Plan updated successfully!");
      navigate("/viewplans");
    } catch (error) {
      console.error("Error updating plan:", error);
      alert("Failed to update plan.");
    }
  };

  return (
    <div className="container mt-3">
      <h3>Edit Travel Plan</h3>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="planname" className="form-label">Plan Name</label>
          <input
            type="text"
            name="planname"
            value={plan.planname}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter plan name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="plancategory" className="form-label">Plan Category</label>
          <select
            name="plancategory"
            value={plan.plancategory}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Category</option>
            <option value="Economy">Economy</option>
            <option value="Premium">Premium</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="minbudget" className="form-label">Min Budget</label>
          <input
            type="number"
            name="minbudget"
            value={plan.minbudget}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter minimum budget"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="discription" className="form-label">Description</label>
          <input
            type="text"
            name="discription"
            value={plan.discription}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter plan description"
          />
        </div>

        <button type="submit" className="btn btn-primary">Update Plan</button>
        <button type="reset" className="btn btn-danger ms-2" onClick={() => navigate("/viewplans")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPlan;
