import { useState, useEffect } from "react";
import BookList from "./BookList";
import axios from "axios";
import { connect } from "react-redux";
import { bookListAction } from "../redux/Actions/bookListAction";
import Navbar from "./Navbar";

const Home = (props) => {
  const [errors, setErrors] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/books")
      .then((res) => {
        props.bookList(res.data);
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
      <Navbar/>
    <div className="card border-0 shadow ">
      {/* <BookList books={props.books} />  */}
      {/* we dot need to pass props,we can directly fetch the data from redux by using useFectch */}
      <BookList />
      <p style={{ color: "red",marginLeft: "10rem" }}>{errors}</p>
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
