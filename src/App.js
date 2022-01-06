import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import Create from "./components/Create";
import { Provider } from "react-redux";
import store from "./store";
import Registration from "./user/signUp";
import LogIn from "./user/signIn";
import ProfileInfo from "./user/ProfilePage";
import Navbar from "./components/Navbar";
import BookList from "./components/BookList";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <div classNameName="App">
            <section id="hero" className="d-flex align-items-center">
              <div
                className="container text-center position-relative "
                data-aos="fade-in"
                data-aos-delay="200"
              ></div>
            </section>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/books/:id" component={BookDetails} />
              <Route path="/create" component={Create} />
              <Route path="/signup" component={Registration} />
              <Route path="/signin" component={LogIn} />
              <Route path="/profile" component={ProfileInfo} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
    // <div>
    //   <CustomForm/>
    // </div>
    // <>
    //   <Navbar />
    // <section id="hero" className="d-flex align-items-center">
    //   <div
    //     className="container text-center position-relative"
    //     data-aos="fade-in"
    //     data-aos-delay="200"
    //   >
    //     <h1>Your New Online Presence with Bethany</h1>
    //     <h2>
    //       We are team of talented designers making websites with Bootstrap
    //     </h2>
    //     <a href="#about" className="btn-get-started scrollto">
    //       Get Started
    //     </a>
    //   </div>
    // </section>
    // </>
  );
}

export default App;

{
  /* <footer id="footer">
<div class="footer-top">
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-6 footer-contact">
        <h3>Bethany</h3>
        <p>
          A108 Adam Street <br />
          New York, NY 535022
          <br />
          United States <br></br>
          <strong>Phone:</strong> +1 5589 55488 55
          <br />
          <strong>Email:</strong> info@example.com
          <br />
        </p>
      </div>

      <div class="col-lg-2 col-md-6 footer-links">
        <h4>Useful Links</h4>
        <ul>
          <li>
            <i class="bx bx-chevron-right"></i> <a href="#">Home</a>
          </li>
          <li>
            <i class="bx bx-chevron-right"></i> <a href="#">About us</a>
          </li>
          <li>
            <i class="bx bx-chevron-right"></i> <a href="#">Services</a>
          </li>
          <li>
            <i class="bx bx-chevron-right"></i>{" "}
            <a href="#">Terms of service</a>
          </li>
          <li>
            <i class="bx bx-chevron-right"></i>{" "}
            <a href="#">Privacy policy</a>
          </li>
        </ul>
      </div>

      <div class="col-lg-3 col-md-6 footer-links">
        <h4>Our Services</h4>
        <ul>
          <li>
            <i class="bx bx-chevron-right"></i>{" "}
            <a href="#">Web Design</a>
          </li>
          <li>
            <i class="bx bx-chevron-right"></i>{" "}
            <a href="#">Web Development</a>
          </li>
          <li>
            <i class="bx bx-chevron-right"></i>{" "}
            <a href="#">Product Management</a>
          </li>
          <li>
            <i class="bx bx-chevron-right"></i>{" "}
            <a href="#">Marketing</a>
          </li>
          <li>
            <i class="bx bx-chevron-right"></i>{" "}
            <a href="#">Graphic Design</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="container d-md-flex py-4">
  <div class="me-md-auto text-center text-md-start">
    <div class="copyright">
      &copy; Copyright{" "}
      <strong>
        <span>Bethany</span>
      </strong>
      . All Rights Reserved
    </div>
    <div class="credits">
      Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
    </div>
  </div>
  <div class="social-links text-center text-md-right pt-3 pt-md-0">
    <a href="#" class="twitter">
      <i class="bx bxl-twitter"></i>
    </a>
    <a href="#" class="facebook">
      <i class="bx bxl-facebook"></i>
    </a>
    <a href="#" class="instagram">
      <i class="bx bxl-instagram"></i>
    </a>
    <a href="#" class="google-plus">
      <i class="bx bxl-skype"></i>
    </a>
    <a href="#" class="linkedin">
      <i class="bx bxl-linkedin"></i>
    </a>
  </div>
</div>
</footer> */
}
