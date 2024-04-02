import React from "react";

export default function TournamentItem(props) {
  const data = props.data || {};

  const mainStyle = {
    margin: "10px",
  };

  return (
    <div className="card" style={mainStyle}>
      <div class="card-body">
        <h3 class="card-title">{data.title}</h3>
        {data.expected_score ? (
          <h6 class="card-subtitle mb-2 text-muted">
            Score: {data.expected_score}
          </h6>
        ) : null}

        <div className="pt-3">
          <h6>Contestant: {data.contestant}</h6>
          <h6>Opponent: {data.opponent}</h6>
        </div>
        <button class="btn btn-primary card-link mt-3">Manage</button>
      </div>
    </div>
  );
}
