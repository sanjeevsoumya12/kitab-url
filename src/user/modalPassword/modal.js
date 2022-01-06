import React from "react";
import styles from "./modal.module.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import humps from "humps";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Modal = ({ newPassword, onClose, setNewPassword }) => {
  // const [message, setMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);

  const formInitialSchema = {
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  };
  const formValidationSchema = yup.object().shape({
    currentPassword: yup.string().required("password is required"),
    password: yup.string().required("password is required"),
    passwordConfirmation: yup.string().required("password is required"),
  });

  const handleSubmit = (values) => {
    const token = JSON.parse(localStorage.getItem("token"));
    var values = humps.decamelizeKeys(values);
    console.log(values);
    axios
      .put(
        "http://localhost:3000/users/password",
        {
          user: values,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          console.log(res);
          // setMessage(res.data.message);
          if (res.data.message == "password updated") {
            // setMessage("");
            toast.success("update successful", {
              position: "top-center",
              autoClose: 2000,
              theme: "colored",
            });
            setTimeout(() => {
              setNewPassword(false);
            }, 2000);
          } else {
            toast.warning(res.data.message, {
              position: "top-center",
              autoClose: 5000,
              theme: "colored",
            });
          }
        }
      })
      .catch(handleErrors);
  };
  const handleErrors = (err) => {
    if (err.request) {
      console.log(err.request);
    }
  };
  if (!newPassword) {
    return null;
  }

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        <button onClick={onClose} className={`${styles.btnClose} btn-close`} />

        <Formik
          initialValues={formInitialSchema}
          validationSchema={formValidationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form>
            <ToastContainer />
            {/* <p style={{ color: "red" }}>{message}</p> */}
            <div className="input-group form-group mb-3 pt-3">
              <label
                className="input-group-text p-2"
                id="inputGroup-sizing-default"
                style={{ width: "40%" }}
              >
                Old Password
              </label>
              <Field
                type={passwordShown ? "text" : "password"}
                name="currentPassword"
                placeholder="enter your password"
                className="form-control"
                style={{ width: "40%" }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="biii bi-eye-fill mt-3 ms-2"
                viewBox="0 0 16 16"
                onClick={() => {
                  setPasswordShown(!passwordShown);
                }}
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
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
                placeholder="enter your new password"
                className="form-control"
                style={{ marginRight: "25px" }}
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
                type={passwordShown1 ? "text" : "password"}
                name="passwordConfirmation"
                placeholder="enter your password"
                className="form-control"
                style={{ width: "40%" }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="biii bi-eye-fill mt-3 ms-2 "
                viewBox="0 0 16 16"
                onClick={() => {
                  setPasswordShown1(!passwordShown1);
                }}
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
            </div>
            <p className="text-danger">
              <ErrorMessage name="passwordConfirmation" />
            </p>
            <button type="submit" className="btn btn-primary">
              update
            </button>
            {/* <button
              type="submit"
              className="btn btn-primary ms-2"
              onClick={() => {
                setNewPassword(false);
              }}
            >
              cancel
            </button> */}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Modal;
