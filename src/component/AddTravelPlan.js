import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";

const AddTravelPlan = () => {
  const [travel, setTravel] = useState({
    planid: 0,
    planname: "",
    plancategory: "",
    minbudget: "",
    discription: "",
    status: "Active",
  });

  const [categories, setCategories] = useState([]); // Store fetched categories
  const [msg, setMsg] = useState("");

  // Fetch categories from the backend when component loads
  useEffect(() => {
    fetchCategories();

    // Initialize jQuery logic for form behavior
    $(document).ready(function () {
      $(".form-select").change(function () {
        const selectedValue = $(this).val();
        if (selectedValue) {
          $("#minBudgetDiv").show();
        } else {
          $("#minBudgetDiv").hide();
        }
      });
    });
  }, []);

  // Fetch categories from the backend API
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getcategories");
      setCategories(response.data); // Store fetched categories
    } catch (error) {
      console.error("Error fetching categories:", error);
      setMsg("Failed to load categories.");
    }
  };

  // Handle form submission to create a new plan
  const createPlan = (e) => {
    e.preventDefault();

    const planJsObj = {
      planid: travel.planid,
      planname: travel.planname,
      plancategory: travel.plancategory,
      minbudget: travel.minbudget ? parseInt(travel.minbudget) : null,
      discription: travel.discription,
      status: travel.status,
    };

    axios
      .post("http://localhost:8080/addplan", planJsObj)
      .then((res) => {
        setMsg("Plan Added Successfully");
        // Optionally reset the form
        setTravel({
          planid: 0,
          planname: "",
          plancategory: "",
          minbudget: "",
          discription: "",
          status: "Active",
        });
      })
      .catch((err) => {
        console.error("Error adding plan:", err);
        setMsg("Some problem occurred.");
      });
  };

  // Update state on input change
  const acceptData = (e) => {
    const { name, value } = e.target;
    setTravel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h2 className="mt-3">Add New Travel Plan</h2>
      <form onSubmit={createPlan}>
        <div className="mb-3">
          <label htmlFor="planname" className="form-label">
            Plan Name
          </label>
          <input
            type="text"
            name="planname"
            className="form-control"
            id="planname"
            placeholder="Plan Name"
            value={travel.planname}
            onChange={acceptData}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="plancategory" className="form-label">
            Plan Category
          </label>
          <select
            className="form-select"
            name="plancategory"
            value={travel.plancategory}
            onChange={acceptData}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryid} value={category.categoryname}>
                {category.categoryname}
              </option>
            ))}
          </select>
        </div>

        {/* Min Budget Field - Initially Hidden */}
        <div className="mb-3" id="minBudgetDiv" style={{ display: "none" }}>
          <label htmlFor="minbudget" className="form-label">
            Min Budget
          </label>
          <input
            type="number"
            name="minbudget"
            className="form-control"
            id="minbudget"
            placeholder="Min Budget ($)"
            value={travel.minbudget}
            onChange={acceptData}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="discription" className="form-label">
            Plan Description
          </label>
          <textarea
            name="discription"
            className="form-control"
            id="discription"
            placeholder="Plan Description"
            value={travel.discription}
            onChange={acceptData}
          />
        </div>

        <button type="submit" className="btn btn-primary form-control mt-3">
          Add New Plan
        </button>
      </form>

      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
};

export default AddTravelPlan;
