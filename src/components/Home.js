import { useState, useEffect } from "react";
import BookList from "./BookList";
import axios from "axios";
import { connect } from "react-redux";
import { bookListAction } from "../redux/Actions/bookListAction";
import Navbar from "./Navbar";
import humps from "humps";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Home = (props) => {
  const [errors, setErrors] = useState("");
  
  useEffect(() => {
    axios
    .get("http://localhost:3000/api/books")
    .then((res) => {
      // toast.success("login successful",{
      //   autoClose: 3000,
      //   position: "top-center"
      // });
      // var obj = res.data
      // console.log(humps.camelizeKeys(res.data))
      var obj = humps.camelizeKeys(res.data);
      props.bookList(obj);
    })
      .catch(handleErrors);
    }, []);
    const handleErrors = (err) => {
      if (err.request) {
        setErrors(err.message);
      } else {
        setErrors(err.message);
      }
    };
    
    return (
      <div>
      <Navbar />
      {/* <ToastContainer />; */}
      <div className="card border-0 shadow ">
        <BookList />
        <p style={{ color: "red", marginLeft: "10rem" }}>{errors}</p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    bookList: (data) => dispatch(bookListAction(data)),
  };
};

export default connect(null, mapDispatchToProps)(Home);
