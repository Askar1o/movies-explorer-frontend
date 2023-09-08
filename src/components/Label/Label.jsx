import React from "react";
import "./Label.css";

function Label({
  title,
  name,
  values,
  handleChange,
  errors,
  minLength,
  maxLength,
}) {
  return (
    <label className="label">
      <span className="label__input-name">{title}</span>
      <input
        type={name}
        name={name}
        placeholder=""
        value={values[`${name}`] ?? ""}
        onChange={handleChange}
        className="label__input"
        minLength={minLength || null}
        maxLength={maxLength || null}
        autoComplete={name}
        required
      />
      <span className="label__span-error">{errors[`${name}`]}</span>
    </label>
  );
}

export default Label;
