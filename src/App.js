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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/books/:id" component={BookDetails} />
              <Route path="/create" component={Create} />
              <Route path="/signup" component={Registration} />
              <Route path="/signin" component={LogIn} />
              <Route path="/profile" component={ProfileInfo}/>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
    // <div>
    //   <CustomForm/>
    // </div>
  );
}

export default App;
