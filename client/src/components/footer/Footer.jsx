import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
          Built with love by
          <span>
            <Link
              style={{ color: "white" }}
              className="nav-link"
              to={"https://youtube.com/indiancoders"}
              target="_blank" // Open link in new tab
              rel="noopener noreferrer" // Security for external links
            >
              Rahul Kumar Mahto
            </Link>
          </span>
          💘
        </p>
      </div>
    </footer>
  );
};

export default Footer;
