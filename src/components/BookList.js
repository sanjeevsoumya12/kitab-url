import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BookList() {
  const books = useSelector((state) => state.books);

  console.log(books);
  return (
    <div className="book-list " >
      <div className="container ">
        <div className="row">
          <div className="col-8 ">
            <strong>Title</strong>
          </div>
          <div className="col " >
            <strong>Author</strong>
          </div>
        </div>
        {books.map((book) => (
          <div className="book-preview" key={book.id}>
            <Link to={`/books/${book.id}`} style={{ textDecoration: "none" }}>
              <div className="row">
                <div className="col-8">{book.title}</div>
                <div className="col">{book.author_name}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
