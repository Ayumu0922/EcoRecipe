import { Link, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import { faHome, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "../styles/partials/_navbar.scss";

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const links = [
    {
      name: "ホーム",
      path: "/",
      icon: faHome,
    },
    {
      name: "登録",
      path: "/authentication/signin",
      icon: faUser,
    },
    {
      name: "レシピ",
      path: "/recipes",
      icon: faList,
    },
  ];

  function closeSidebar() {
    setShowSidebar(false);
  }
  return (
    <>
      <div className="navbar container">
        <Link to="/" className="logo">
          EcoRecipe
        </Link>
        <div className="nav-links">
          {links.map((link) => (
            <Link
              className={location.pathname === link.path ? "active" : ""}
              to={link.path}
              key={link.name}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div
          onClick={() => setShowSidebar(true)}
          className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      {showSidebar && <Sidebar close={closeSidebar} links={links} />}
    </>
  );
}
