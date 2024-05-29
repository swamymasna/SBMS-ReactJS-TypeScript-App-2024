import React from "react";
import "./App.css";
import ToastContainerComponent from "./modules/employees/components/ToastContainerComponent";
import { ToastUtil } from "./utils/ToastUtil";
import { Routes, Route } from "react-router-dom";
import ListEmployees from "./modules/employees/pages/list-employees/ListEmployees";
import CreateEmployee from "./modules/employees/pages/create-employee/CreateEmployee";
import UpdateEmployee from "./modules/employees/pages/update-employee/UpdateEmployee";
import ViewEmployee from "./modules/employees/pages/view-employee/ViewEmployee";
import NotFound404 from "./modules/employees/components/NotFound404";
import Navbar from "./layout/Navbar";

function App() {
  const click = () => {
    ToastUtil.displaySuccessToast("Toast Displayed Successfully");
  };

  return (
    <div className="App">
      <ToastContainerComponent />
      <Navbar />

      <Routes>
        <Route path="/" element={<ListEmployees />}></Route>
        <Route path="/employees" element={<ListEmployees />}></Route>
        <Route path="/create-employee" element={<CreateEmployee />}></Route>
        <Route path="/update-employee/:id" element={<UpdateEmployee />}></Route>
        <Route path="/view-employee/:id" element={<ViewEmployee />}></Route>
        <Route path="/*" element={<NotFound404 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
