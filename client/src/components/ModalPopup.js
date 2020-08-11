import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";

const ModalPopup = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ newTitle, newLink }) => {
    console.log(newTitle + " and " + newLink);
    const token = localStorage.getItem("auth-token");
    const data = await fetch("http://localhost:5000/api/links", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title: newTitle,
        link: newLink,
      }),
    });

    const response = await data.json();

    if (data.status === 200) console.log("addition successful!!");
    else console.log("addition failed");

    //end
    props.onHide();
    window.location.reload(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a new Link
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title: </label>{" "}
          <input type="text" name="newTitle" required ref={register} />
          <br />
          <label htmlFor="link">Link: </label>{" "}
          <input type="link" name="newLink" required ref={register} />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="my-form">
          Add link
        </Button>
        <Button color="danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopup;
