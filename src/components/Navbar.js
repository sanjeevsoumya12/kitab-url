import { Link, useHistory } from "react-router-dom";
import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";
import { useEffect } from "react";
import { userLogin, userLogout } from "../redux/Actions/userLogin";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";

const CustomNavbar = (props) => {
  const history = useHistory();
  const user =
    useSelector((state) => state.userDetails) ||
    JSON.parse(localStorage.getItem("user-info"));

  function logout() {
    localStorage.clear();
    props.logout(null);
    history.push("/");
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={{height: "62px"}}>
      <Container style={{marginTop: "1px"}}>
        <Navbar.Brand>KITAABS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="/create">New Book</Nav.Link> */}
            {localStorage.getItem("user-info") ? (
              <>
                <Nav.Link href="/create">New Boook</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href={`/signup`}>SignUp</Nav.Link>
                <Nav.Link href={`/signin`}>SignIn</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {localStorage.getItem("user-info") ? (
              <Nav>
                <Nav.Link href={`/wishlist`} style={{marginBottom: "19px",marginRight: "20px"}}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="30"
                    fill="currentColor"
                    className="bi bi-journal-bookmark "
                    // viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"
                    />
                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                  </svg>
                </Nav.Link>
                <NavDropdown
                  className="dropdown"
                  style={{ fontSize: "20px" ,marginTop: "25px"}}
                  title={user && user.userName}
                >
                  <div>
                    <Nav.Link className="dropdown-item" onClick={logout}>
                      Logout
                    </Nav.Link>
                    <Link className="dropdown-item" to={`/profile`}>
                      Profile
                    </Link>
                    <Link className="dropdown-item" to={"/wishlist"}>
                      wishList
                    </Link>
                  </div>
                </NavDropdown>
              </Nav>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (data) => dispatch(userLogout(data)),
  };
};
export default connect(null, mapDispatchToProps)(CustomNavbar);
// export default (CustomNavbar)
// <nav className="navbar shadow fixed-top ">
//   <div className="container ">
//     <>
// <Link to="/" className="navbar-brand">
//   <h2>Kitaabs</h2>
// </Link>
//     </>
// {localStorage.getItem("user-info") ? (
//   <>
//     <Link to={`/create`} className="navbar-brand col-sm-6">
//       <h2>New Boook</h2>
//     </Link>
//   </>
// ) : (
//   <>
//     <Link to={`/signup`} className="navbar-brand col-sm-8">
//       <h2>SignUp</h2>
//     </Link>
//     <Link to={`/signin`} className="navbar-brand">
//       <h2>SignIn</h2>
//     </Link>
//   </>
// )}
// {localStorage.getItem("user-info") ? (
//   <Nav>
//     <NavDropdown
//       className="dropdown"
//       style={{ fontSize: "20px" }}
//       title={user && user.userName}
//     >
//       <div>
//         <div className="dropdown-item" onClick={logout}>
//           Logout
//         </div>
//         <Link className="dropdown-item" to={`/profile`}>
//           <h6>Profile</h6>
//         </Link>
//       </div>
//     </NavDropdown>
//   </Nav>
// ) : null}
//   </div>
// </nav>
// <header id="header" className="fixed-top d-flex align-items-center" >
//   <div className="container" >
//     <div
//       className="header-container d-flex align-items-center justify-content-between "
//       // style={{ height: "4rem" }}
//     >
//       <div className="logo">
//         <h4 className="text-light">kitabbs</h4>
//       </div>
//       {/* <nav className="navbar shadow fixed-top "> */}
//       <nav id="navbar" className="navbar">
//         {/* <div className="container "> */}

//         <Link to="/" className="nav-link scrollto active">
//           <span>Home</span>
//         </Link>
//         {localStorage.getItem("user-info") ? (
//           <>
//             <Link
//               to={`/create`}
//               className="navbar-brand2nav-link scrollto active "
//             >
//               New Boook
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link
//               to={`/signup`}
//               className="navbar-nav-link scrollto active "
//             >
//               SignUp
//             </Link>
//             <Link to={`/signin`} className="navbar-brand4">
//               SignIn
//             </Link>
//           </>
//         )}
//         {localStorage.getItem("user-info") ? (
//           <Nav>
//             <NavDropdown
//               className="dropdown"
//               style={{ fontSize: "20px" }}
//               title={user && user.userName}
//             >
//               <div>
//                 <div className="dropdown-item" onClick={logout}>
//                   Logout
//                 </div>
//                 <Link className="dropdown-item" to={`/profile`}>
//                   <h6>Profile</h6>
//                 </Link>
//               </div>
//             </NavDropdown>
//           </Nav>
//         ) : null}
//         {/* </div> */}
//       </nav>
//     </div>
//   </div>
// </header>
