// src/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo-bg-removed.png";
import "../styles/nav.css";
import useMediaQuery from "../hooks/useMediaQuery";
import MobileNavbar from "./MobileNavbar";
const Navbar = () => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (isMobile) {
    return <MobileNavbar/>;
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-28 text-white font-semibold z-20 transition-colors duration-300 ${isScrolled || location.pathname !== "/"
          ? "bg-[#02294A] shadow-2xl "
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto px-6 pt-1 flex justify-between items-center select-none">
        <div className="text-2xl font-bold">
          <Link to="/">
            <img src={logo} alt="logo" className="w-[100px]" />
          </Link>
        </div>
        <ul className="flex space-x-4 text-lg">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""
                }`}
              onClick={handleScrollToTop}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className={`nav-link ${location.pathname === "/about" ? "active" : ""
                }`}
              onClick={handleScrollToTop}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/projects"
              className={`nav-link ${location.pathname.startsWith("/projects") ? "active" : ""
                }`}
              onClick={handleScrollToTop}
            >
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contactus"
              className={`nav-link ${location.pathname === "/contactus" ? "active" : ""
                }`}
              onClick={handleScrollToTop}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
