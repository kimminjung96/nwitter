import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "routes/Profile";
import styled from "styled-components";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      {/* isLoggedIn 가 참일때 Navigation이 존재 */}

      {isLoggedIn ? (
        <div
          style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Routes>
            <>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route
                path="/profile"
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }
              />
              {/* <Route path="*" element={<Navigation replace to="/" />} /> */}
              {/* <Redirect from="*" to="/" /> */}
            </>
          </Routes>
        </div>
      ) : (
        <Routes>
          <>
            <Route path="/" element={<Auth />} />
            {/* <Route path="*" element={<Navigation replace to="/" />} /> */}
          </>
        </Routes>
      )}
    </Router>
  );
};

export default AppRouter;
