import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { bookCreateAction } from "../redux/Actions/bookListAction";
import { connect } from "react-redux";
import RequireForm from "./form";
import * as yup from "yup";
import Navbar from "./Navbar";
import humps from "humps";
import CustomNavbar from "./Navbar";

const Create = (props) => {
  const [apiErrors, setApiErrors] = useState("");
  const history = useHistory();
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  const token = JSON.parse(localStorage.getItem("token"));

  //need to decamilize it

  const formInitialSchema = {
    title: "",
    price: "",
    publishingDate: "",
    authorId: "",
  };
  const formValidationSchema = yup.object().shape({
    title: yup.string().required("name is required"),
    publishingDate: yup.date().required("date is required"),
    authorId: yup.string().required("author need to be selected"),
    price: yup
      .number()
      .required("phonenumber is required")
      .positive()
      .integer(),
  });

  const handleSubmit = (book) => {
    var book = humps.decamelizeKeys(book);
    axios
      .post(
        "http://localhost:3000/api/books",
        {
          book,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        // console.log(humps.camelizeKeys(book));
        props.bookCreate(humps.camelizeKeys(book));
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
      {/* <Navbar /> */}
      {/* <CustomNavbar/> */}
      {userInfo.admin ? (
        <div className="container mt-5">
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
      ) : (
        history.push("/signup")
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    bookCreate: (data) => dispatch(bookCreateAction(data)),
  };
};
export default connect(null, mapDispatchToProps)(Create);
