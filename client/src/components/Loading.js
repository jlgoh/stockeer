import React from "react";

const Loading = () => {
  return (
    <div className="ui container" style={{ height: "100vh" }}>
      <div className="ui active inverted dimmer">
        <div className="ui large text loader">Loading</div>
      </div>
    </div>
  );
};

export default Loading;
