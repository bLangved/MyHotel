import React from "react";
import Layout from "./components/Layout";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home, Booking, RouteNotFound } from "./pages/";
import "./styles/index.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
