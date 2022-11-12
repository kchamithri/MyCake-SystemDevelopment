import React from "react";
import "../../Styles/DashboardContent.css";

const DashboardContent = () => {
  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}

        <div className="main__title">
          <div className="main__greeting">
            <h1>Hello Achini</h1>
            <p>Welcome to the dashboard</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
