import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import Create from "./components/Create";
import store from "./store";
import Registration from "./user/signUp";
import LogIn from "./user/signIn";
import ProfileInfo from "./user/ProfilePage";
import CustomNavbar from "./components/Navbar";
import { userLogin } from "./redux/Actions/userLogin";
import { connect, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import WishList from "./components/WishList";

function App(props) {
  const [user,setUser] = useState("")
  const userData = JSON.parse(localStorage.getItem("user-info"));
  useEffect(() => {
    if (!!userData) {
      props.login(userData)
      setUser(userData) 
    }
  }, []);
  return (
    <div>
      <CustomNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/books/:id" component={BookDetails} />
        <Route path="/create" component={Create} />
        <Route path="/signup" component={Registration} />
        <Route path="/signin" component={LogIn} />
        {/* <Route path="/profile"  component={() => (<ProfileInfo user={user} />)} /> */}
        <Route path="/profile"  component={ProfileInfo } />

        <Route path="/wishlist" component={WishList}/>
      </Switch>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(userLogin(data)),
  };
};
export default connect(null, mapDispatchToProps)(App);

// export default App;
