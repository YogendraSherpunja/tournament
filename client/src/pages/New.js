import React, { useState } from "react";

import Input from "../components/Input";

import { postTournament } from "../services/tournament";

export default function View() {
  const [formData, setData] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postTournament(formData);
    window.location.pathname = "/";
  };

  const formStyle = {
    width: "70%",
    padding: "30px 0",
    margin: "0 auto",
  };

  return (
    <div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <Input
          name="title"
          placeholder="Tournament Title"
          label="Tournament Title"
          type="text"
          onChange={handleChange}
          required
        />
        <Input
          name="contestant"
          placeholder="Contestant"
          label="Contestant Name"
          type="text"
          onChange={handleChange}
          required
        />
        <Input
          name="opponent"
          placeholder="Opponent (optional)"
          label="Opponent Name"
          type="text"
          onChange={handleChange}
        />
        <Input
          name="expected_score"
          placeholder="Score (number)"
          label="Expected Score"
          type="text"
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary">
          Add New Tournament
        </button>
      </form>
    </div>
  );
}
