import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { bookCreateAction } from "../redux/Actions/bookListAction";
import { connect } from "react-redux";
import RequireForm from "./form";
import * as yup from "yup";
import Navbar from "./Navbar";

const Create = (props) => {
  const [apiErrors, setApiErrors] = useState("");
  const history = useHistory();

  const formInitialSchema = {
    title: "",
    price: "",
    publishing_date: "",
    author_id: "",
  };
  const formValidationSchema = yup.object().shape({
    title: yup.string().required("name is required"),
    publishing_date: yup.date().required("date is required"),
    author_id: yup.string().required("author need to be selected"),
    price: yup
      .number()
      .required("phonenumber is required")
      .positive()
      .integer(),
  });

  const handleSubmit = (book) => {
    axios
      .post("http://localhost:3000/api/books", {
        book,
      })
      .then(() => {
        props.bookCreate(book);
        history.push("/");
      })
      .catch(handleErrors);
  };
  const handleErrors = (err) => {
    if (err.request) {
      setApiErrors(err.message);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="card border-0 shadow ">
        <div className="card-header "> Add a Book</div>
        <RequireForm
          handleSubmit={handleSubmit}
          apiErrors={apiErrors}
          formInitialSchema={formInitialSchema}
          formValidationSchema={formValidationSchema}
          type="new"
          setSelect={true}
          handleErrors={handleErrors}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    bookCreate: (data) => dispatch(bookCreateAction(data)),
  };
};
export default connect(null, mapDispatchToProps)(Create);
