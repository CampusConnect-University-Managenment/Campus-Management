import React from "react";
import LoginPageInline from "./component/LoginPageInline";

const Home = () => (
  <div style={{ background: "#f8fbff", minHeight: "100vh", paddingBottom: "50px" }}>
    
    {/* Header */}

    {/* Add spacing between Header and Login Form */}
    <div style={{ marginTop: "100px" }} className="container text-center">
      <div className="d-flex justify-content-center mb-5">
        <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
          {/* <h2 className="text-center mb-4 fw-bold text-primary">Campus Connect</h2> */}

          {/* Login form */}
          <LoginPageInline />
        </div>
      </div>
    </div>
  </div>
);

export default Home;