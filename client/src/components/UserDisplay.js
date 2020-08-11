import React, { useState, useEffect } from "react";

const UserDisplay = ({ match }) => {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getLinks();
  }, []);

  const getLinks = async () => {
    const data = await fetch(
      `http://localhost:5000/api/links/${match.params.user_name}`
    );
    const links = await data.json();
    if (data.status === 200) setLinks(links);
    else setError("No User Found");
    // console.log(links);
  };

  return (
    <div>
      <h1>{match.params.user_name}</h1>
      {!error ? (
        <div>
          {links.map((link) => (
            <div key={link._id}>
              <h4>{link.title}</h4>
              <a href={link.link}>
                <i>{link.link}</i>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <h2> No Such user found!!</h2>
      )}
    </div>
  );
};

export default UserDisplay;
