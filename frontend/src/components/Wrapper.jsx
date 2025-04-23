// src/components/shared/Wrapper.jsx
// import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";

const Wrapper = () => {
  return (
    <>
      <ScrollToTop />
      {/* <Navbar/> */}
      <Outlet />
    </>
  );
};

export default Wrapper;
