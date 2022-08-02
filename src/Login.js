import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { app } from "./Firebase";

export default function Login(props) {
  
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");

  function setuser() {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        props.con(true);
        navigate("/Afterlogin");
      })
      .catch((error) => {
        alert("Incorrect Credientials")
        
      });
  }
  function next() {
    navigate("/Signup");
  }

  return (
    <div>
      <h2 style={{ marginTop: "30px" }}>Login</h2>
      <div
        style={{
          display: "inline-flex",
          width: "400px",
          marginTop: "20px",
          paddingBottom: "20px",
          borderRadius: "7px",
          padding: "20px",
        }}
        className="border border-primary"
      >
        <form
          style={{ width: "75%", margin: "auto" }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(item) => {
                setemail(item.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(item) => {
                setpass(item.target.value);
              }}
            />
          </div>
          <button onClick={setuser} className="btn btn-primary">
            Submit
          </button>
          &nbsp;&nbsp;
          <span>Not a user&nbsp;&nbsp;</span>
          <button className="btn btn-primary" onClick={next}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
