import React from "react";
import Header from "./../components/Header";

const MainLayout = (props) => {
  return (
    <div>
      <Header {...props} />
      <div className="main">{props.children}</div>
    </div>
  );
};

export default MainLayout;
