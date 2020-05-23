import React from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <div>
      <div className="ui sidebar inverted vertical menu">
        <div className="item">
          <div className="item">
            <Link to="/">Stocky</Link>
          </div>
        </div>
        <Link to="/search" className="item">
          Search
        </Link>
      </div>
      <div className="pusher"></div>
    </div>
  );
};

export default Sidebar;
