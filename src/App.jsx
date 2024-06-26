import React from "react";
import Layout from "./components/Layout";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
import { Home, Room, RouteNotFound } from "./pages/";
import "./styles/index.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="room" element={<Room />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
