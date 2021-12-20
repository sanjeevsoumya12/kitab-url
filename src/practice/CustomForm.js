import { Fragment } from "react";
import { Formik, Form, Field,ErrorMessage} from "formik";
import * as yup from "yup";
//for validation purpose we will use yup library

const CustomForm = () => {
  const formIntitalSchema = {
    name: "",
    email: "",
    password: "",
    website: "",
    comment: "",
  };
  const formValidationSchema = yup.object().shape({
    name: yup.string().required("name is required"),
    email: yup.string().required("email is required").email("Invalid email"),
    password: yup.string().required("password is required"),
    website: yup.string().required("website is required"),
    comment: yup.string().required("comment is required"),

  });
  const handleFormSubmit = (values) => {
    console.log("submitted values", values);
  };
  return (
    <Fragment>
      <h1>Formik with yup Form Validations</h1>
      <Formik
        initialValues={formIntitalSchema}
        validationSchema={formValidationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        <Form>
          <Field
            type="text"
            name="name"
            placeholder="enter your name"
            className="form-control"
          />
          <p className="text-danger">
              <ErrorMessage name="name"/>
          </p>
          <Field
            type="text"
            name="email"
            placeholder="enter your email"
            className="form-control"
          />
           <p className="text-danger">
              <ErrorMessage name="email"/>
          </p>
          <Field
            type="text"
            name="password"
            placeholder="enter your password"
            className="form-control"
          />
           <p className="text-danger">
              <ErrorMessage name="password"/>
          </p>
          <Field
            type="text"
            name="website"
            placeholder="enter your website"
            className="form-control"
          />
           <p className="text-danger">
              <ErrorMessage name="website"/>
          </p>
          <Field
            type="text"
            name="comment"
            placeholder="enter your comment"
            className="form-control"
          />
           <p className="text-danger">
              <ErrorMessage name="comment"/>
          </p>
          <button type="submit" className="btn btn-outline-primary">
            submit
          </button>
        </Form>
      </Formik>
    </Fragment>
  );
};

export default CustomForm;
