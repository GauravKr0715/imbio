import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ email, password }) => {
    if (localStorage.getItem("ex-user")) localStorage.removeItem("ex-user");
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      localStorage.setItem("auth-token", data.token);
      window.location.reload(false);
      //   history.push("/");
    }
  };

  return (
    <div>
      <h1>Please Log In to Continue..</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email ID: </label>
        <input type="email" name="email" required ref={register} />
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" required ref={register} />
        <br />
        <button type="submit">Log IN!!</button>
      </form>
    </div>
  );
};

export default LoginPage;
