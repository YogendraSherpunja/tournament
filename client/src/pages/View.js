import React, { useEffect, useState } from "react";

import Input from "../components/Input";
import { deleteTouranment, patchTouranment } from "../services/tournament";

export default function View(props) {
  const [data, setData] = useState({
    title: "",
    contestant: "",
    opponent: "",
    expected_score: "",
  });

  useEffect(() => {
    const id = props.match.params.tournamentId;
    if (id) {
      setData({
        _id: id,
        ...JSON.parse(localStorage.getItem(id)),
      });
    }
  }, [props.match]);

  const handleChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _id, ...rest } = data;
    await patchTouranment(_id, rest);
    window.location.pathname = "/";
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const { _id } = data;
    await deleteTouranment(_id);
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
          value={data.title}
          required
        />
        <Input
          name="contestant"
          placeholder="Contestant"
          label="Contestant Name"
          type="text"
          onChange={handleChange}
          value={data.contestant}
          required
        />
        <Input
          name="opponent"
          placeholder="Opponent (optional)"
          label="Opponent Name"
          type="text"
          onChange={handleChange}
          value={data.opponent}
        />
        <Input
          name="expected_score"
          placeholder="Score (number)"
          label="Expected Score"
          type="text"
          onChange={handleChange}
          value={data.expected_score}
        />

        <button type="submit" className="btn btn-primary">
          Save
        </button>

        <button onClick={handleDelete} className="btn btn-danger ml-3">
          Delete
        </button>
      </form>
    </div>
  );
}
