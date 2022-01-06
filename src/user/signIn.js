import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import humps from "humps";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Registration() {
  {
    useEffect(() => {
      if (localStorage.getItem("user-info")) {
        history.push("/");
      }
    }, []);
  }
  const [passwordShown, setPasswordShown] = useState(false);
  const user = {
    email: "",
    password: "",
  };
  const formValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("mail is required"),
    password: yup.string().required("password is required"),
  });
  const history = useHistory();
  const [apiErrors, setApiErrors] = useState("");

  const handleSubmit = (user) => {
    axios
      .post("http://localhost:3000/users/sign_in", {
        user,
      })
      .then((res) => {
        // alert("sign_in successful");
        // toast("sign_in successful")

        // console.log(humps.camelizeKeys(res.data.user))
        const userDetail = humps.camelizeKeys(res.data.user);
        const token = humps.camelizeKeys(res.data.token);
        console.log(res);
        // localStorage.setItem("user-info", JSON.stringify(userDetail));
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            userName: userDetail.userName,
            email: userDetail.email,
            phnNumber: userDetail.phnNumber,
            dateOfBirth: userDetail.dateOfBirth,
          })
        );
        localStorage.setItem("token", token);
        if (res.data.message === "login successful") {
          toast.success("signin successful", {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
          });
          setTimeout(() => {
            history.push("/");
          }, 2000);
        }
      })
      .catch(handleErrors);
  };
  const handleErrors = (err) => {
    if (err.request) {
      setApiErrors("email and possowrd not matched ");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h3>user's signin page</h3>
        <p style={{ color: "red" }}>{apiErrors}</p>
        <Formik
          initialValues={user}
          validationSchema={formValidationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form>
            <ToastContainer />
            <div className="input-group form-group mb-3 pt-3">
              <label
                className="input-group-text p-2"
                id="inputGroup-sizing-default"
                style={{ width: "30%" }}
              >
                email
              </label>
              <Field
                type="text"
                name="email"
                placeholder="enter your mail"
                className="form-control"
                style={{ marginRight: "23px" }}
              />
            </div>
            <p className="text-danger">
              <ErrorMessage name="email" />
            </p>
            <div className="input-group form-group mb-3 pt-3">
              <label
                className="input-group-text p-2"
                id="inputGroup-sizing-default"
                style={{ width: "30%" }}
              >
                password
              </label>
              <Field
                type={passwordShown ? "text" : "password"}
                name="password"
                placeholder="enter your password"
                className="form-control"
                style={{ width: "40%" }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bii bi-eye-fill mt-3 ms-2 "
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
            <button className="btn btn-primary mt-2" type="submit">
              Sign In
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Registration;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { useHistory } from "react-router-dom";

// function LogIn() {
//   {
//     useEffect(() => {
//       if (localStorage.getItem("user-info")) {
//         history.push("/");
//       }
//     }, []);
//   }

//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");

//   const history = useHistory();

// async function signIn() {
//   let user = {
//     password: password,
//     email: email,
//   };
// axios
//   .post("http://localhost:3000/users/sign_in", {
//     user,
//   })
//   .then(() => {
//     localStorage.setItem("user-info", JSON.stringify(user));
//     history.push("/");
//   });

//     //   let item = {
//     //     username: userName,
//     //     password: password,
//     //     email: email,
//     //     phn_number: number,
//     //     date_of_birth: date,
//     //   };
//     //   console.log(item);
//     //  let result = await fetch("http://localhost:3000/users", {
//     //     method: "post",
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //       "Accept": "application/json",
//     //     },
//     //     body: JSON.stringify(item),
//     //   });
//     //   result = await result.json()
//     //   console.log("result",result)
//   }
//   return (
//     <div>
//       <Navbar />
//       <div className="container">
//         <h1>User Sign In</h1>
//         <input
//           type="email"
//           value={email}
//           placeholder="email"
//           onChange={(e) => setEmail(e.target.value)}
//           className="form-control"
//         />
//         <br />
//         <input
//           type="password"
//           value={password}
//           placeholder="password"
//           onChange={(e) => setPassword(e.target.value)}
//           className="form-control"
//         />
//         <br />

//         <button onClick={signIn} className="btn btn-primary offset-sm-5">
//           sign up
//         </button>
//       </div>
//     </div>
//   );
// }

// export default LogIn;
