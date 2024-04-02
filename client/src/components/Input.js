import React from "react";

export default function Input(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label || props.placeholder}</label>
      <input
        type={props.type}
        className="form-control"
        id={props.name}
        placeholder={props.placeholder}
        name={props.name}
        required={props.required}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}
