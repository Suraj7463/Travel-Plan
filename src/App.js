import React from "react";
import ReactDom from "react-dom";
import NavBar from "./component/NavBar";
import AddTravelPlan from "./component/AddTravelPlan";
import ViewTravelPlan from "./component/ViewTravelPlan";
import EditPlan from "./component/EditPlan";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default class App extends React.Component{
  render(){
    return <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      
      <Route path="/addplan" element={<AddTravelPlan/>}></Route>
      <Route path="/viewplan" element={<ViewTravelPlan/>}></Route>
      <Route path="/editplan" element={<EditPlan/>}></Route>
      <Route path="*" element={<h1>Page Not Found</h1>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  }
}
