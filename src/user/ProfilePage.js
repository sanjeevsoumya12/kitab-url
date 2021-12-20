import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProfileInfo = () => {
  const user = JSON.parse(localStorage.getItem("user-info"));
  const [newPassword, setNewPassword] = useState(false);
  const changePassword = () => {
    setNewPassword(true);
  };

  console.log(user);
  return (
    <div>
      <Navbar />
      <div className="card container shadow" style={{ width: "25rem" }}>
        {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
        <div className="card-body">
          <h5 class="card-title">Name: {user.username}</h5>
          <h5 class="card-title">Email: {user.email}</h5>
          <h5 class="card-title">PhoneNumber: {user.phn_number}</h5>
          <h5 class="card-title">DOB: {user.date_of_birth}</h5>
          <br />
          <Link to="/" class="btn btn-primary ">
            Back
          </Link>
          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={changePassword}
          >
            change password
          </button>
        </div>
        <br />
        {newPassword ? (
          <form className="container">
            <div className="form-group ">
              <label>Old Password</label>
              <input
                type="email"
                class="form-control"
                placeholder="Enter Your Old Password"
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Enter Your New Password"
              />
            </div>
            <br />
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
            <button
              type="submit"
              class="btn btn-primary ms-2"
              onClick={() => {
                setNewPassword(false);
              }}
            >
              cancel
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileInfo;
