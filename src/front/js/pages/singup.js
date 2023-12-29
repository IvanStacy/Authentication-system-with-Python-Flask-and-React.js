import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Singup = () => {
  const {store, actions} = useContext(Context);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const Navigate = useNavigate();
  const singup = (e) => {
    e.preventDefault()
    fetch(process.env.BACKEND_URL + "/api/singup", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ email: email, password: password })

    })
      .then((response) => response.json())
      .then((result) => {
        if (result.includes('User already exists :(')) {
          setError('User already exists :(');
        } else {
          console.log(result);
          Navigate("/Login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = async () => {
    const requiredFields = ["email", "password"];

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    let result = await actions.signup(formData);

    if (result) {
      const destination = result ? "/" : "/signup";
      Navigate(destination);
      setFormData({
        email: "",
        password: ""
      });
      setConfirmPassword(""); // Reset confirmPassword as well
    }
  }

  // return(
  //     <div className="container pt-3">
  //         <div className="Card mx-auto" style={{width: "25rem"}}>
  //             <h3 className="text-center">Singup</h3>
  //             <p className="text-center">Please create your account</p>
  //             <label htmlFor="email" className="form-label">Email</label>
  //             <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="form-control" id="exampleInputEmail" aria-activedescendant="Email"></input> 
  //             <label htmlFor="password" className="form-label">Password</label>
  //             <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control" id="exampleInputPassword"></input>
  //             <button className="btn btn-success mt-3 w-100">Submit</button>
  //         </div>
  //     </div>
  // )
  // }
  return (
    <form onSubmit={singup} className="container">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail" className="form-label">
          Email address
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email} placeholder="youremail@mail.com"
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          {error}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="*******"
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          name="password"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
        Confirm Password
        </label>
        <input
          onChange={handleConfirmPasswordChange}
          value={confirmPassword}
          placeholder="*******"
          type="password"
          className="form-control"
          id="exampleConfirmPassword"
          name="confirmPassword"
          required
        />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck" />
        <label className="form-check-label" htmlFor="exampleCheck">
          Remember Me
        </label>
      </div>
      <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary">
        Create Account
      </button>
      <Link to="/Login">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </Link>
    </form>
  );
}