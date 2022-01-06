import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import humps from "humps";
import {
  bookDetailsAction,
  updateBook,
} from "../redux/Actions/bookDetailsAction";
import { deleteBook } from "../redux/Actions/bookListAction";
import UpdateForm from "./UpateForm";

function BookDetails(props) {
  const [status, setStatus] = useState(true);
  const history = useHistory();
  const { id } = useParams();
  {
    useEffect(() => {
      if (!localStorage.getItem("user-info")) {
        history.push("/signup");
      }
    });
  }
  useEffect(() => {
    axios.get(`http://localhost:3000/api/books/${id}`).then((res) => {
      debugger
      const { book, author } = res.data;
      const bookData = { ...book, author };
      // const book = res.data.book;
      // const author = res.data.author;
      // const bookData = { ...book, author };
      console.log(humps.camelizeKeys(bookData));
      props.bookDetail(humps.camelizeKeys(bookData));
    });
  }, [id]);

  const onDelete = () => {
    axios.delete(`http://localhost:3000/api/books/${id}`).then(() => {
      props.removeBook({ id });
      props.editBook({});
      history.replace("/");
    });
  };

  const {
    bookDetails: { title, price, publishingDate, author },
  } = props;
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card border-0 shadow ">
          <div className="card text-center">
            <div className="card-header">Information</div>
            <div className="card-body me-5">
              {!status ? (
                <UpdateForm {...props} setStatus={setStatus} id={id} />
              ) : (
                <div className="container ms-3">
                  <div className="row">
                    <div className="col">Title</div>
                    <div className="col">{title}</div>
                  </div>
                  <div className="row">
                    <div className="col">Author</div>
                    <div className="col">{author?.name}</div>
                  </div>
                  <div className="row">
                    <div className="col">Price</div>
                    <div className="col">{price}</div>
                  </div>
                  <div className="row">
                    <div className="col">Publishing Date</div>
                    <div className="col">{publishingDate}</div>
                  </div>
                  <div className="Buttons" style={{ marginTop: "15px" }}>
                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure,you want to delete this item ?"
                          )
                        )
                          onDelete(id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setStatus(false);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    bookDetails: state.bookDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    bookDetail: (data) => dispatch(bookDetailsAction(data)),
    removeBook: (data) => dispatch(deleteBook(data)),
    editBook: (data) => dispatch(updateBook(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
