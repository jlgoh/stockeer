import React from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <div>
      <div className="ui sidebar inverted vertical menu">
        <div className="item">
          <div className="item">
            <Link to="/">App Name</Link>
          </div>
        </div>
        <Link to="/" className="item">
          Home
        </Link>
      </div>
      <div className="pusher"></div>
    </div>
  );
};

export default Sidebar;
