import React from "react";
import "./SectionName.css";

function SectionName({ children }) {
  return (
    <h2 className="section-name">{children}</h2>
  );
};

export default SectionName;