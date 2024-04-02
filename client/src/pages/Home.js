import React, { useEffect } from "react";

import Columned from "react-columned";
import { Link } from "react-router-dom";

import TournamentItem from "../components/TournamentItem";

import { getTournaments } from "../services/tournament";

export default function Home(props) {
  const [tournaments, setTournaments] = React.useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    const data = await getTournaments();
    setTournaments(data || []);
  };

  const { url } = props.match;
  const tabsStyle = { paddingBottom: "20px" };

  return (
    <>
      <div style={tabsStyle}>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button className="nav-link active">Tournaments</button>
          </li>
        </ul>
      </div>

      <Columned columns={{ 320: 1, 480: 2, 800: 2, 1366: 3, 1920: 4 }}>
        {tournaments.map((value, index) => {
          return (
            <Link
              key={index}
              to={`${url}/${value._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() =>
                localStorage.setItem(value._id, JSON.stringify(value))
              }
            >
              <TournamentItem data={value} />
            </Link>
          );
        })}
      </Columned>
    </>
  );
}
