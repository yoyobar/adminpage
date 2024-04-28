import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Register from "./Register";
import React from "react";
import axios from "axios";

function Login() {
  const [registerToggle, setRegisterToggle] = useState(false);

  //? 회원가입 창 보여주기
  const registerModal = (): void => {
    setRegisterToggle(true);
  };

  //? 회원가입 창 숨기기
  const registerModalClose = (): void => {
    setRegisterToggle(false);
  };

  //? 로그인 시도
  const loginAttempt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginStatus = await axios.get("http://localhost:3001/verify");
    console.log(loginStatus);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-white text-5xl mb-14">ADMIN TEMPLATE</div>
        <form onSubmit={loginAttempt} className="bg-slate-700 flex w-96 flex-col justify-center items-center">
          <Input require={true} type="email" text="Email address" />
          <div className="mb-4"></div>
          <Input require={true} type="password" text="Password" />
          <div className="mb-8"></div>
          <Button type="submit" text="Login" color="indigo" />
          <div className="mb-4"></div>
          <Button type="button" text="Register" color="green" onClick={registerModal} />
        </form>
      </div>
      <div>{registerToggle ? <Register registerModalClose={registerModalClose} /> : null}</div>
    </>
  );
}

export default Login;
