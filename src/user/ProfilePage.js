import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { Field, Form, Formik, ErrorMessage } from "formik";
// import * as yup from "yup";
// import axios from "axios";
// import humps from "humps";
import Modal from "./modalPassword/modal";
import ModalEdit from "./modalEdit/modal"

const ProfileInfo = () => {
  const user = JSON.parse(localStorage.getItem("user-info"));
  const [newPassword, setNewPassword] = useState(false);
  const [update,setUpdate] = useState(false)
  const changePassword = () => {
    setNewPassword(true);
  };
  const setEdit = () => {
    setUpdate(true)
  }
  return (
    <div>
      <Navbar />
      <div className="container ms-2">
        <h4>Profile Info:</h4>
      </div>
      <div className="card container shadow " style={{ width: "32rem",height: "20rem" }}>
        {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
        <div className="card-body mt-4 ms-4">
          <h5 class="card-title">Name: {user.userName}</h5>
          <h5 class="card-title">Email: {user.email}</h5>
          <h5 class="card-title">Phone Number: {user.phnNumber}</h5>
          <h5 class="card-title">Date Of Birth: {user.dateOfBirth}</h5>
          <br />
          <Link to="/" class="btn btn-primary ">
            Back
          </Link>
          <button type="button" className="btn btn-primary ms-2" onClick={setEdit}>Edit</button>
          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={changePassword}
          >
            Change Password
          </button>
        </div>
        <br />
        <div>
          <Modal
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            onClose={() => setNewPassword(false)}
          />
        </div>
        <div>
          <ModalEdit update={update} setUpdate={setUpdate} onClose={()=>setUpdate(false)}/>
        </div>
        {/* {newPassword ? (
          <div>
            <Formik
              initialValues={formInitialSchema}
              validationSchema={formValidationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              <Form>
                <div className="input-group form-group mb-3 pt-3">
                  <label
                    className="input-group-text p-2"
                    id="inputGroup-sizing-default"
                    style={{ width: "40%" }}
                  >
                    Old Password
                  </label>
                  <Field
                    type="password"
                    name="currentPassword"
                    placeholder="enter your password"
                    className="form-control"
                    style={{ width: "40%" }}
                  />
                </div>
                <p className="text-danger">
                  <ErrorMessage name="password" />
                </p>
                <div className="input-group form-group mb-3 pt-3">
                  <label
                    className="input-group-text p-2"
                    id="inputGroup-sizing-default"
                    style={{ width: "40%" }}
                  >
                    New Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="enter your password"
                    className="form-control"
                    style={{ width: "40%" }}
                  />
                </div>
                <p className="text-danger">
                  <ErrorMessage name="password" />
                </p>
                <div className="input-group form-group mb-3 pt-3">
                  <label
                    className="input-group-text p-2"
                    id="inputGroup-sizing-default"
                    style={{ width: "40%" }}
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="passwordConfirmation"
                    placeholder="enter your password"
                    className="form-control"
                    style={{ width: "40%" }}
                  />
                </div>
                <p className="text-danger">
                  <ErrorMessage name="passwordConfirmation" />
                </p>
                <button type="submit" className="btn btn-primary">
                  update
                </button>
                <button
                  type="submit"
                  className="btn btn-primary ms-2"
                  onClick={() => {
                    setNewPassword(false);
                  }}
                >
                  cancel
                </button>
              </Form>
            </Formik>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default ProfileInfo;
