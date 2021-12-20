import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";

function Registration() {
  {
    useEffect(() => {
      if (localStorage.getItem("user-info")) {
        history.push("/");
      }
    }, []);
  }
  const user = {
    email: "",
    password: "",
  };
  const formValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("mail is required"),
    password: yup.string().required("password s required"),
  });
  const history = useHistory();
  const [apiErrors, setApiErrors] = useState("");

  const handleSubmit = (user) => {
    axios
      .post("http://localhost:3000/users/sign_in", {
        user,
      })
      .then((res) => {
        localStorage.setItem("user-info", JSON.stringify(res.data.user));
        history.push("/");
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
      <h3>user's signin page</h3>
      <p style={{color: "red"}}>{apiErrors}</p>
        <div>
          <Formik
            initialValues={user}
            validationSchema={formValidationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
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
                  style={{ width: "40%" }}
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
              <button className="btn btn-primary mt-2" type="submit">
                signin
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
