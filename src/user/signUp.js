import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import humps from "humps";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomNavbar from "../components/Navbar";

function Registration() {
  {
    useEffect(() => {
      if (localStorage.getItem("user-info")) {
        history.push("/");
      }
    }, []);
  }
  const [confirmation, setConfirmation] = useState(false);
  const user = {
    userName: "",
    email: "",
    password: "",
    phnNumber: "",
    dateOfBirth: "",
    passwordConfirmation: "",
  };
  var today = new Date();
  const formValidationSchema = yup.object().shape({
    userName: yup.string().required("name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("mail is required"),
    password: yup.string().required("password is required"),
    passwordConfirmation: yup
      .string()
      .required("confirmation password is required"),
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
  const history = useHistory();
  const [apiErrors, setApiErrors] = useState("");

  const handleSubmit = (user) => {
    var user = humps.decamelizeKeys(user);
    axios
      .post("http://localhost:3000/users", {
        user,
      })
      .then((res) => {
        console.log(res);
        var userDetail = humps.camelizeKeys(user);
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            userName: userDetail.userName,
            email: userDetail.email,
            phnNumber: userDetail.phnNumber,
            dateOfBirth: userDetail.dateOfBirth,
          })
        );
        if (res.data.message === "registration successful") {
          toast.success("registration successful", {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
          });
          setTimeout(() => {
            if (res.request.statusText === "OK") {
              setConfirmation(true);
              setApiErrors("");
              // window.open( "http://localhost:3000/letter_opener/",'_blank');
              // history.push("/");
            }
          }, 2000);
        }
      })
      .catch(handleErrors);
  };
  const handleErrors = (err) => {
    if (err.request) {
      console.log(err.request.response);
      const errorResponse = JSON.parse(err.request.response);
      const error = errorResponse.message;
      console.log(error);
      if (error) setApiErrors(error);
      else setApiErrors("User Name already exit");
    }
  };
  return (
    <div>
      {/* <Navbar /> */}
      {/* <CustomNavbar/> */}
      <div className="container mt-5">
        <h3>user's signup page</h3>
        <p style={{ color: "red" }}>{apiErrors}</p>
        {confirmation ? (
          <div>
            <h4> want to confirm your account</h4>
            <button
              className="btn btn-primary"
              onClick={() => {
                window.open("http://localhost:3000/letter_opener/", "_blank");
              }}
            >
              confirm
            </button>
          </div>
        ) : (
          <div>
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
                    Name
                  </label>
                  <Field
                    type="text"
                    name="userName"
                    placeholder="enter your name"
                    className="form-control"
                    style={{ width: "40%" }}
                  />
                </div>
                <p className="text-danger">
                  <ErrorMessage name="userName" />
                </p>
                <div className="input-group form-group mb-3 pt-3">
                  <label
                    className="input-group-text p-2"
                    id="inputGroup-sizing-default"
                    style={{ width: "30%" }}
                  >
                    Email
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
                    Password
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
                    style={{ width: "30%" }}
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
                <div className="input-group form-group mb-3 ">
                  <label
                    className="input-group-text p-2"
                    id="inputGroup-sizing-default"
                    style={{ width: "30%" }}
                  >
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    name="phnNumber"
                    className="form-control"
                    placeholder="enter your phone number"
                    style={{ width: "40%" }}
                  />
                </div>
                <p className="text-danger">
                  <ErrorMessage name="phnNumber" />
                </p>
                <div className="input-group form-group mb-3 ">
                  <label
                    className="input-group-text p-2"
                    id="inputGroup-sizing-default"
                    style={{ width: "30%" }}
                  >
                    Date Of Birth
                  </label>
                  <Field
                    type="date"
                    name="dateOfBirth"
                    className="form-control "
                    style={{ width: "40%" }}
                  />
                </div>
                <p className="text-danger">
                  <ErrorMessage name="dateOfBirth" />
                </p>
                <button className="btn btn-primary mt-2" type="submit">
                  Sign Up
                </button>
              </Form>
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}

export default Registration;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import Navbar from "../components/Navbar";

// function Registration() {
//   {
//     useEffect(() => {
//       if (localStorage.getItem("user-info")) {
//         history.push("/");
//       }
//     }, []);
//   }
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [number, setNumber] = useState("");
//   const [date, setDate] = useState("");
//   const history = useHistory();
//   const [apiErrors, setApiErrors] = useState("");

//   async function signUp() {
//     let user = {
//       username: userName,
//       password: password,
//       email: email,
//       phn_number: number,
//       date_of_birth: date,
//     };
//     axios
//       .post("http://localhost:3000/users", {
//         user,
//       })
//       .then(() => {
//         localStorage.setItem("user-info", JSON.stringify(user));
//         history.push("/");
//       })
//       .catch(handleErrors);

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
//   const handleErrors = (err) => {
//     if (err.request) {
//       setApiErrors(err.message);
//     }
//   };
//   return (
//     <div>
//       {apiErrors ? (
//         <p style={{ color: "red" }}>{apiErrors}</p>
//       ) : (
//         <div>
//           <Navbar />
//           <div className="container">
//             <h1>User Sign Up</h1>
//             <input
//               type="text"
//               value={userName}
//               placeholder="name"
//               onChange={(e) => setUserName(e.target.value)}
//               className="form-control"
//             />
//             <br />
//             <input
//               type="email"
//               value={email}
//               placeholder="email"
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//             />
//             <br />
//             <input
//               type="password"
//               value={password}
//               placeholder="password"
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//             />
//             <br />

//             <input
//               type="number"
//               value={number}
//               placeholder="number"
//               onChange={(e) => setNumber(e.target.value)}
//               className="form-control"
//             />
//             <br />
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="form-control"
//             />
//             <br />
//             <button onClick={signUp} className="btn btn-primary offset-sm-5">
//               sign up
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Registration;
