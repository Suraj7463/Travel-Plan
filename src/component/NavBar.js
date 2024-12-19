import React from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
export default class NavBar extends React.Component{
    render(){
        return <>
        <nav className="navbar navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand text-white" href="#">Travel Plan Application</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link active text-white" aria-current="page" to="/addplan">Add New Travel Plan</Link>
        <Link className="nav-link active text-white" aria-current="page" to="/viewplan">View Travel Plan Table</Link>

        
        <Link className="nav-link disabled" aria-disabled="true">Disabled</Link>
      </div>
    </div>
  </div>
</nav>
        </>
    }
}