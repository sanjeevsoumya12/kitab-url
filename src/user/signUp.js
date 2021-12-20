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
    username: "",
    email: "",
    password: "",
    phn_number: "",
    date_of_birth: "",
  };
  const formValidationSchema = yup.object().shape({
    username: yup.string().required("name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("mail is required"),
    password: yup.string().required("password s required"),
    date_of_birth: yup.date().required("date is required"),
    phn_number: yup
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
    axios
      .post("http://localhost:3000/users", {
        user,
      })
      .then(() => {
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            username: user.username,
            email: user.email,
            phn_number: user.phn_number,
            date_of_birth: user.date_of_birth,
          })
        );
        history.push("/");
      })
      .catch(handleErrors);
  };
  const handleErrors = (err) => {
    if (err.request.status == 422) {
      setApiErrors("email already exist");
    } else if (err.request.status == 500) {
      setApiErrors("usename already exist");
    }
  };
  return (
    <div>
      <Navbar />
      <h3>user's signup page</h3>
      <p style={{ color: "red" }}>{apiErrors}</p>
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
                name
              </label>
              <Field
                type="text"
                name="username"
                placeholder="enter your name"
                className="form-control"
                style={{ width: "40%" }}
              />
            </div>
            <p className="text-danger">
              <ErrorMessage name="username" />
            </p>
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
            <div className="input-group form-group mb-3 ">
              <label
                className="input-group-text p-2"
                id="inputGroup-sizing-default"
                style={{ width: "30%" }}
              >
                phonenumber
              </label>
              <Field
                type="text"
                name="phn_number"
                className="form-control"
                placeholder="enter your phone number"
                style={{ width: "40%" }}
              />
            </div>
            <p className="text-danger">
              <ErrorMessage name="phn_number" />
            </p>
            <div className="input-group form-group mb-3 ">
              <label
                className="input-group-text p-2"
                id="inputGroup-sizing-default"
                style={{ width: "30%" }}
              >
                DateOfBirth
              </label>
              <Field
                type="date"
                name="date_of_birth"
                className="form-control "
                style={{ width: "40%" }}
              />
            </div>
            <p className="text-danger">
              <ErrorMessage name="date_of_birth" />
            </p>
            <button className="btn btn-primary mt-2" type="submit">
              signUp
            </button>
          </Form>
        </Formik>
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
