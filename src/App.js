import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

// pages
//import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import "./homepg.scss";

//firebase
import { auth, handleUserProfile } from "./firebase/utils";

const initialState = {
  currentUser: null,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  authListener = null;

  // use auth for Login and Logout
  // handle user profile: firebase Database
  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }
      this.setState({
        currentUser: userAuth,
      });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <HomepageLayout currentUser={currentUser}>
                <Homepage />
              </HomepageLayout>
            }
          />
          <Route
            path="/registration"
            element={
              currentUser ? ( //When you logout, return to main page
                <Navigate to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Registration />
                </MainLayout>
              )
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? ( //When you login and logout, return to main page
                <Navigate to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Login />
                </MainLayout>
              )
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
