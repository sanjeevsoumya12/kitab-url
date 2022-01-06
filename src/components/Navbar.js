import { Link, useHistory } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";

const Navbar = () => {
  const history = useHistory();
  function logout() {
    localStorage.clear();
    history.push("/");
  }
  const user = JSON.parse(localStorage.getItem("user-info"));

  return (
    // <nav className="navbar shadow fixed-top ">
    //   <div className="container ">
    //     <>
    // <Link to="/" className="navbar-brand">
    //   <h2>Kitaabs</h2>
    // </Link>
    //     </>
    //     {localStorage.getItem("user-info") ? (
    //       <>
    //         <Link to={`/create`} className="navbar-brand col-sm-6">
    //           <h2>New Boook</h2>
    //         </Link>
    //       </>
    //     ) : (
    //       <>
    //         <Link to={`/signup`} className="navbar-brand col-sm-8">
    //           <h2>SignUp</h2>
    //         </Link>
    //         <Link to={`/signin`} className="navbar-brand">
    //           <h2>SignIn</h2>
    //         </Link>
    //       </>
    //     )}
    //     {localStorage.getItem("user-info") ? (
    //       <Nav>
    //         <NavDropdown
    //           className="dropdown"
    //           style={{ fontSize: "20px" }}
    //           title={user && user.userName}
    //         >
    //           <div>
    //             <div className="dropdown-item" onClick={logout}>
    //               Logout
    //             </div>
    //             <Link className="dropdown-item" to={`/profile`}>
    //               <h6>Profile</h6>
    //             </Link>
    //           </div>
    //         </NavDropdown>
    //       </Nav>
    //     ) : null}
    //   </div>
    // </nav>
    <header id="header" className="fixed-top d-flex align-items-center" >
      <div className="container" >
        <div
          className="header-container d-flex align-items-center justify-content-between "
          // style={{ height: "4rem" }}
        >
          <div className="logo">
            <h4 className="text-light">kitabbs</h4>
          </div>
          {/* <nav className="navbar shadow fixed-top "> */}
          <nav id="navbar" className="navbar">
            {/* <div className="container "> */}

            <Link to="/" className="nav-link scrollto active">
              <span>Home</span>
            </Link>
            {localStorage.getItem("user-info") ? (
              <>
                <Link
                  to={`/create`}
                  className="navbar-brand2nav-link scrollto active "
                >
                  New Boook
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={`/signup`}
                  className="navbar-nav-link scrollto active "
                >
                  SignUp
                </Link>
                <Link to={`/signin`} className="navbar-brand4">
                  SignIn
                </Link>
              </>
            )}
            {localStorage.getItem("user-info") ? (
              <Nav>
                <NavDropdown
                  className="dropdown"
                  style={{ fontSize: "20px" }}
                  title={user && user.userName}
                >
                  <div>
                    <div className="dropdown-item" onClick={logout}>
                      Logout
                    </div>
                    <Link className="dropdown-item" to={`/profile`}>
                      <h6>Profile</h6>
                    </Link>
                  </div>
                </NavDropdown>
              </Nav>
            ) : null}
            {/* </div> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
