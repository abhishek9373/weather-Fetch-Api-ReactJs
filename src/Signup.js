import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "./Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Signup(props) {
  let {aut} = props;
  const provider = new GoogleAuthProvider();
  function signupwithgoogle() {
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        props.con(true);
        navigate('/Afterlogin')
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function setuser() {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, pass)
      .then(() => {

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");

  function next() {
    navigate("/");
  }

  return (
    <div>
      <h2 style={{marginTop:"30px"}}>Sign Up</h2>
      <div
      style={{
        display: "inline-flex",
        width: "400px",
        marginTop: "0px",
        paddingBottom: "20px",
        borderRadius:"7px",
        padding:"20px"
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
        <span>Already a user&nbsp;&nbsp;</span>
        <button className="btn btn-primary" onClick={next}>
          Login
        </button>
        <br />
        <br />
        <button className="btn btn-danger" onClick={signupwithgoogle}>
          Signin with google
        </button>
      </form>
    </div>
    </div>
    
  );
}
