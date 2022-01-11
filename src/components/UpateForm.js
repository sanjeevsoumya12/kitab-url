import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateBook } from "../redux/Actions/bookDetailsAction";
import * as yup from "yup";
import RequireForm from "./form";
import humps from "humps";

const UpdateForm = (props) => {
  const {
    id,
    setStatus,
    bookDetails: { title, price, publishingDate, author },
  } = props;
  const formInitialSchema = {
    title: title,
    price: price,
    publishingDate: publishingDate,
    authorId: author.name,
  };
  const formValidationSchema = yup.object().shape({
    title: yup.string().required("name is required"),
    publishingDate: yup.date().required("date is required"),
    authorId: yup
      .string()
      .required("author need to be selected")
      .max(1, "pick atleast one author"),
    price: yup
      .number()
      .required("phonenumber is required")
      .positive()
      .integer(),
  });

  const [apiErrors, setApiErrors] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));

  const handleSubmit = (values) => {
    //duplicate one
    var values = humps.decamelizeKeys(values);
    console.log(values);
    axios
      .put(
        `http://localhost:3000/api/books/${id}`,
        {
          book: values
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const { book, author } = res.data;
        const bookData = { ...book, author };
        props.editBook(humps.camelizeKeys(bookData));
        setStatus(true);
      })
      .catch(handleErrors);
  };
  const handleErrors = (err) => {
    if (err.request) {
      setApiErrors(err.message);
    }
  };
  return (
    <div className="ms-5">
      <RequireForm
        handleSubmit={handleSubmit}
        apiErrors={apiErrors}
        formInitialSchema={formInitialSchema}
        formValidationSchema={formValidationSchema}
        type="update"
        author={author}
        setSelect={false}
      />
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    editBook: (data) => dispatch(updateBook(data)),
  };
};
export default connect(null, mapDispatchToProps)(UpdateForm);
