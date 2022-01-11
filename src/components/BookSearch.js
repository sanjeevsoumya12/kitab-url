import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { bookListAction } from "../redux/Actions/bookListAction";
import humps from "humps";

const Search = (props) => {
  const { noData, setNoData } = props;
  const [searchBox, setSearchBox] = useState(true);
  // const books = useSelector((state) => state.books);
  const search = (value) => {
    fetch("http://localhost:3000/api/search?q=" + value).then((data) => {
      data.json().then((res) => {
        console.log(res.length);
        var obj = humps.camelizeKeys(res);

        if (obj.length > 0) {
          console.log(obj);
          props.bookList(obj);
        }
      });
    });
  };
  return (
    <div>
      {/* <input type="text" placeholder="Search..."onChange={(event) => search(event.target.value)} /> */}
      <div>
        {searchBox ? (
          <div>
            <div className="bi-cover"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
              onClick={() => setSearchBox(false)}
              // onMouseEnter={()=>setSearchBox(false)}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
        ) : (
          <div style={{marginLeft: "194px"}}>
            <input
              className="search ms-2"
              type="text"
              placeholder="Enter Any Book Name"
              onChange={(event) => search(event.target.value)}
              onMouseLeave={() => {
                setSearchBox(true);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    bookList: (data) => dispatch(bookListAction(data)),
  };
};
export default connect(null, mapDispatchToProps)(Search);

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// const Search = () => {
//   const books = useSelector((state) => state.books);
//   const [searchData, setSearchData] = useState("");
//   const message = "no data found";

//   return (
//     <div className="List">
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   width="16"
//   height="16"
//   fill="currentColor"
//   className="bi bi-search"
//   viewBox="0 0 16 16"
// >
//   <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
// </svg>
// <input
//   className="search ms-2"
//   type="text"
//   placeholder="Search..."
//   onChange={(event) => setSearchData(event.target.value)}
// />
//       <div className="container ">
//         <div className="row">
//           <div className="col-8 ">
//             <strong>Title</strong>
//           </div>
//           <div className="col ">
//             <strong>Author</strong>
//           </div>
//         </div>
//         {books
//           .filter((book) => {
//             if (searchData == "") {
//               return book;
//             } else if (
//               book.title.toLowerCase().includes(searchData.toLowerCase())
//             ){
//               return book;
//             }
//           })
//           .map((book) => (
//             <div className="book-preview" key={book.id}>
//               <Link to={`/books/${book.id}`} style={{ textDecoration: "none" }}>
//                 <div className="row">
//                   <div className="col-8">{book.title}</div>
//                   <div className="col">{book.authorName}</div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Search;
