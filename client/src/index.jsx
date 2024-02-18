import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import NavBar from "./NavBar";
import InputOptimalCow from "./InputOptimalCow";
import BullList from "./BullList";
import BullInfo from "./BullInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<InputOptimalCow />} />
          <Route path="bullinfo" element={<BullInfo />} />
          <Route path="bull-list" element={<BullList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
