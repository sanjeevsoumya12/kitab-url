import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";

const RequireForm = ({
  handleSubmit,
  apiErrors,
  author,
  formInitialSchema,
  formValidationSchema,
  type,
  setSelect,
  handleErrors,
}) => {
  const buttonText = type === "new" ? "Create Book" : "Update ";
  const [authors, setAuthors] = useState([]);
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
                <Field
                  style={{ width: "70%" }}
                  name="author_id"
                  as="select"
                >
                  {setSelect ? (
                    <option value={0}>--select--</option>
                  ) : (
                    <option value={0}>{author.name}</option>
                  )}

                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </Field>
                <p className="text-danger">
                  <ErrorMessage name="author_id" />
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
                  date
                </label>
                <Field
                  type="date"
                  name="publishing_date"
                  className="form-control "
                  placeholder="enter your email"
                  style={{ width: "40%" }}
                />
              </div>
              <p className="text-danger">
                <ErrorMessage name="publishing_date" />
              </p>
              <button className="btn btn-primary mt-2" type="submit">
                {buttonText}
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default RequireForm;
