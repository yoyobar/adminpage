import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Register from "./Register";
import React from "react";
import axios from "axios";

function Login() {
  const [registerToggle, setRegisterToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginVerify, setLoginVerify] = useState(false);

  //? 회원가입 창 보여주기
  const registerModal = (): void => {
    setRegisterToggle(true);
  };

  //? 회원가입 창 숨기기
  const registerModalClose = (): void => {
    setRegisterToggle(false);
  };

  //? input 핸들러
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setLoginVerify(false);
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setLoginVerify(false);
  };

  //? 로그인 시도
  const loginAttempt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginStatus = await axios.post("http://localhost:3001/login", { email, password });
    if (loginStatus.data) {
      window.location.reload();
      return localStorage.setItem("token", JSON.stringify(loginStatus.data));
    }
    return setLoginVerify(true);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-center">
          <div className="text-white text-5xl">ADMIN TEMPLATE</div>
          <div className={loginVerify ? "text-red-400 visible animate-bounce" : "invisible"}>No matching account information!</div>
        </div>
        <form onSubmit={loginAttempt} className="bg-slate-700 mt-8 flex w-96 flex-col justify-center items-center">
          <Input require={true} onChange={emailHandler} value={email} type="email" text="Email address" />
          <div className="mb-4"></div>
          <Input require={true} onChange={passwordHandler} value={password} type="password" text="Password" />
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
