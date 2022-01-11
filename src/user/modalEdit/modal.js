import React, { useEffect } from "react";
import styles from "./modal.module.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import humps from "humps";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useSelector, connect } from "react-redux";
import { userUpdate } from "../../redux/Actions/userLogin";

const ModalEdit = ({profileUpdate, update, setUpdate, onClose }) => {
  const user =
    useSelector((state) => state.userDetails) ||
    JSON.parse(localStorage.getItem("user-info"));

  const formInitialSchema = {
    userName: user.userName,
    email: user.email,
    phnNumber: user.phnNumber,
    dateOfBirth: user.dateOfBirth,
  };
  var today = new Date();
  const formValidationSchema = yup.object().shape({
    userName: yup.string().required("name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("mail is required"),
    dateOfBirth: yup
      .date()
      .required("date is required")
      .default(new Date(today))
      .max(today, `Date should not exceed current date ${today}`),
    phnNumber: yup
      .string()
      .required("This field is Required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      ),
  });

  const handleSubmit = (values) => {
    const token = JSON.parse(localStorage.getItem("token"));
    var values = humps.decamelizeKeys(values);
    axios
      .put(
        "http://localhost:3000/users",
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
        const result = humps.camelizeKeys(JSON.parse(res.config.data));
        const { userName, email, phnNumber, dateOfBirth } = result.user;
        console.log(result.user);
        debugger
       profileUpdate(result.user);
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            userName,
            email,
            phnNumber,
            dateOfBirth,
          })
        );
        if (res.data) {
          if (res.data.message == "Details Updated") {
            toast.success("update successful", {
              position: "top-center",
              autoClose: 2000,
              theme: "colored",
            });
            setTimeout(() => {
              setUpdate(false);
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
  if (!update) {
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
            <div className="input-group form-group mb-3 pt-3">
              <label
                className="input-group-text p-2"
                id="inputGroup-sizing-default"
                style={{ width: "40%" }}
              >
                Name
              </label>
              <Field
                type="text"
                name="userName"
                placeholder="enter your name"
                className="form-control"
                style={{ width: "50%" }}
              />
            </div>
            <p className="text-danger">
              <ErrorMessage name="userName" />
            </p>
            <div className="input-group form-group mb-3 pt-3">
              <label
                className="input-group-text p-2"
                id="inputGroup-sizing-default"
                style={{ width: "40%" }}
              >
                Email
              </label>
              <Field
                type="text"
                name="email"
                placeholder="enter your mail"
                className="form-control"
                style={{ width: "50%" }}
              />
            </div>
            <p className="text-danger">
              <ErrorMessage name="email" />
            </p>
            <div className="input-group form-group mb-3 ">
              <label
                className="input-group-text p-2"
                id="inputGroup-sizing-default"
                style={{ width: "40%" }}
              >
                Phone Number
              </label>
              <Field
                type="text"
                name="phnNumber"
                className="form-control"
                placeholder="enter your phone number"
                style={{ width: "50%" }}
              />
            </div>
            <p className="text-danger">
              <ErrorMessage name="phnNumber" />
            </p>
            <div className="input-group form-group mb-3 ">
              <label
                className="input-group-text p-2"
                id="inputGroup-sizing-default"
                style={{ width: "40%" }}
              >
                Date Of Birth
              </label>
              <Field
                type="date"
                name="dateOfBirth"
                className="form-control "
                style={{ width: "50%" }}
              />
            </div>
            <p className="text-danger">
              <ErrorMessage name="dateOfBirth" />
            </p>
            <button className="btn btn-primary mt-2" type="submit">
              update
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    profileUpdate: (data) => {
      debugger
      return dispatch(userUpdate(data))
    }
  };
};

export default connect(null, mapDispatchToProps)(ModalEdit);
