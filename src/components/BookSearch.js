import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Search = () => {
  const books = useSelector((state) => state.books);
  const [searchData, setSearchData] = useState("");
  const message = "no data found";

  return (
    <div className="List">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
      <input
        className="search ms-2"
        type="text"
        placeholder="Search..."
        onChange={(event) => setSearchData(event.target.value)}
      />
      <div className="container ">
        <div className="row">
          <div className="col-8 ">
            <strong>Title</strong>
          </div>
          <div className="col ">
            <strong>Author</strong>
          </div>
        </div>
        {books
          .filter((book) => {
            if (searchData == "") {
              return book;
            } else if (
              book.title.toLowerCase().includes(searchData.toLowerCase())
            ){
              return book;
            }
          })
          .map((book) => (
            <div className="book-preview" key={book.id}>
              <Link to={`/books/${book.id}`} style={{ textDecoration: "none" }}>
                <div className="row">
                  <div className="col-8">{book.title}</div>
                  <div className="col">{book.authorName}</div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// const Search = () => {
//   const [searchData, setSearchData] = useState("");
//   const [noData, setNoData] = useState(false);
//   const books = useSelector((state) => state.books);
//   const search = (value) => {
//     // console.log(value)
//     fetch("http://localhost:3000/api/search?q=" + value).then((data) => {
//       data.json().then((res) => {
//         console.log(res.length);
//         if (res.length > 0) {
//           setSearchData(res);
//           setNoData(false);
//         } else {
//           setSearchData("");
//           setNoData(true);
//         }
//       });
//     });
//   };
//   return (
//     <div>
//       <input type="text" placeholder="Search..."onChange={(event) => search(event.target.value)} />
//       {searchData ? (
//         <div>
//           <div className="container ">
//             <div className="row">
//               <div className="col-8 ">
//                 <strong>Title</strong>
//               </div>
//               <div className="col ">
//                 <strong>Author</strong>
//               </div>
//             </div>
//             {searchData.map((item) => (
//               <div className="book-preview" key={item.id}>
//                 <Link
//                   to={`/books/${item.id}`}
//                   style={{ textDecoration: "none" }}
//                 >
//                   <div className="row">
//                     <div className="col-8">{item.title}</div>
//                     <div className="col">{item.author_name}</div>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : null}
//       {noData ? <div>No Data Found</div> : null}
//     </div>
//   );
// };

// export default Search;
