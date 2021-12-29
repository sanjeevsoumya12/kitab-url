import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


const RequireForm = ({
  handleSubmit,
  apiErrors,
  formInitialSchema,
  formValidationSchema,
  type,
  handleErrors,
}) => {
  const buttonText = type === "new" ? "Create Book" : "Update ";
  const [authors, setAuthors] = useState([]);
  const history = useHistory()
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/authors")
      .then((res) => {
        setAuthors(res.data);
      })
      .catch(handleErrors);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      {apiErrors ? (
        <p style={{ color: "red" }}>{apiErrors}</p>
      ) : (
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
                  style={{ width: "30%" }}
                >
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  placeholder="enter book title"
                  className="form-control"
                  style={{ width: "40%" }}
                />
              </div>
              <p className="text-danger">
                <ErrorMessage name="title" />
              </p>
              <div className="input-group form-group mb-3">
                <label
                  className="input-group-text p-2"
                  id="inputGroup-sizing-default"
                  style={{ width: "30%" }}
                >
                  Author
                </label>
                <Field style={{ width: "70%" }} name="authorId" as="select">
                  {/* {setSelect ? (
                    <option value={0}>--select--</option>
                  ) : (
                    <option value={0}>{author.name}</option>
                  )} */}
                  <option value={0}>--select--</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </Field>
                <p className="text-danger">
                  <ErrorMessage name="authorId" />
                </p>
              </div>
              <div className="input-group form-group mb-3 ">
                <label
                  className="input-group-text p-2"
                  id="inputGroup-sizing-default"
                  style={{ width: "30%" }}
                >
                  Price
                </label>
                <Field
                  type="text"
                  name="price"
                  className="form-control"
                  placeholder="enter book price"
                  style={{ width: "40%" }}
                />
              </div>
              <p className="text-danger">
                <ErrorMessage name="price" />
              </p>
              <div className="input-group form-group mb-3 ">
                <label
                  className="input-group-text p-2"
                  id="inputGroup-sizing-default"
                  style={{ width: "30%" }}
                >
                  Date
                </label>
                <Field
                  type="date"
                  name="publishingDate"
                  className="form-control "
                  placeholder="enter your email"
                  style={{ width: "40%" }}
                />
              </div>
              <p className="text-danger">
                <ErrorMessage name="publishingDate" />
              </p>
              <button className="btn btn-primary mt-2" type="submit">
                {buttonText}
              </button>
              {
                type === "update"? <button className="btn btn-primary ms-2 mt-2" onClick={()=>{
                  history.goBack()
                }}>Back</button>:null
              }
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default RequireForm;
