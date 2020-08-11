import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const res = await registerAPI(data);
    console.log(res);
    // console.log(data);
  };

  const registerAPI = async ({ username, email, password }) => {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    const data = response.json();
    history.push("/");
    return data;
  };

  return (
    <div>
      <h1>Please Register to Continue..</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username: </label>
        <input type="username" name="username" required ref={register} />
        <br />
        <label htmlFor="email">Email ID: </label>
        <input type="email" name="email" required ref={register} />
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" required ref={register} />
        <br />
        <button type="submit">Register!!</button>
      </form>
    </div>
  );
};

export default RegisterPage;
