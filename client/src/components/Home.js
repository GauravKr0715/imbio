import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import LoginPage from "./LoginPage";
import Spinner from "./Spinner";
import ModalPopup from "./ModalPopup";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const exUser = localStorage.getItem("ex-user");
    const token = localStorage.getItem("auth-token");
    if (token) {
      if (exUser) {
        const user = JSON.parse(exUser);
        setUser(user);
        //   console.log(user._id);
        getLinks(user._id, token);
      } else getUser(token);
    } else setLoading(false);
  }, []);

  const getUser = async (token) => {
    const data = await fetch("http://localhost:5000/api/verifyUser", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const user = await data.json();
    // console.log(user);
    if (data.status === 200) {
      setUser(user);
      localStorage.setItem("ex-user", JSON.stringify(user));
      getLinks(user._id, token);
    }
  };

  const getLinks = async (id, token) => {
    // console.log(id + ":" + token);
    const data = await fetch("http://localhost:5000/api/links", {
      method: "GET",
      headers: {
        Authorization: token,
        id: id,
      },
    });
    const links = await data.json();
    if (data.status === 200) {
      console.log(links);
      setLinks(links);
    } else {
      console.log("Some error occured!! Try again later..");
    }
    setLoading(false);
  };

  const toggle = () => setModal(!modal);

  const deleteLink = async (id) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      const response = await fetch("http://localhost:5000/api/links", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          userID: user._id,
          linkID: id,
        }),
      });
      const data = await response.json();
      if (response.status === 200) console.log(data);
    }
    window.location.reload(false);
    // console.log(id);
  };

  return loading ? (
    <Spinner />
  ) : user ? (
    <div>
      <h1>This is the Home page</h1>
      <h1>{user.username}</h1>
      <h3>
        <b>{user.email}</b>
      </h3>
      <div>
        {links.map((link) => (
          <div key={link._id}>
            <h4>{link.title}</h4>
            <a href={link.link}>
              <b>{link.link}</b>
            </a>
            <Button
              color="danger"
              onClick={() => {
                deleteLink(link._id);
              }}
            >
              Delete Link
            </Button>
          </div>
        ))}
      </div>
      <Button color="danger" onClick={toggle}>
        Add New Link
      </Button>
      <ModalPopup show={modal} onHide={() => setModal(false)} />
    </div>
  ) : (
    <div>
      <LoginPage />
    </div>
  );

  //   return user ? (
  //     <div>
  //       <h1>This is the Home page</h1>
  //       <h1>{user.username}</h1>
  //       <h3>
  //         <b>{user.email}</b>
  //       </h3>
  //       <div>
  //         {links.map((link) => (
  //           <div key={link._id}>
  //             <h4>{link.title}</h4>
  //             <a href={link.link}>
  //               <b>{link.link}</b>
  //             </a>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   ) : (
  //     <div>
  //       <LoginPage />
  //     </div>
  //   );
};

export default Home;
