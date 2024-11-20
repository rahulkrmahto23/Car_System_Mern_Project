import React from "react";
import { Link } from "react-router-dom";

const NavigationLink = ({ to, bg, text, textColor, onClick }) => {
  return (
    <Link
      onClick={onClick}
      className="nav-link"
      to={to}
      style={{ background: bg, color: textColor }}
    >
      {text}
    </Link>
  );
};

export default NavigationLink;
