import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CredentialResponse } from "@react-oauth/google";
import { AdminLoginType, LoginType } from "../types";

export default function Login() {
  const nav = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [key, setKey] = useState("");

  //? INPUT HANDLER
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.target;
    if (event.name === "id") setId(event.value);
    if (event.name === "pw") setPw(event.value);
    if (event.name === "key") setKey(event.value);
  };

  //? ERROR HANDLER
  const errorHandle = () => {
    console.error("login Request Error");
  };

  //? ADMIN LOGIN
  const adminLoginHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataForm: AdminLoginType = {
      email: id,
      password: pw,
      key: key,
    };
    axios
      .post("http://localhost:3001/login", dataForm, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const myToken = {
          token: response.data,
          expire: Date.now() + 60 * 60 * 1000,
        };
        localStorage.setItem("token", JSON.stringify(myToken));
        nav("/task", { replace: true });
      })
      .catch(() => errorHandle());
  };

  //? USER LOGIN
  const loginHandle = (response: CredentialResponse) => {
    if (response.credential === undefined) return errorHandle();

    const decodeToken: LoginType = jwtDecode(response.credential);
    const dataForm = {
      email: decodeToken.email,
      name: decodeToken.name,
      exp: decodeToken.exp,
    };
    axios
      .post("http://localhost:3001/login", dataForm, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const myToken = {
          token: response.data,
          expire: Date.now() + 60 * 60 * 1000,
        };
        localStorage.setItem("token", JSON.stringify(myToken));
        nav("/task", { replace: true });
      })
      .catch(() => errorHandle());
  };

  return (
    <form onSubmit={adminLoginHandle} className="flex gap-4 flex-col w-full h-full justify-center items-center">
      <div className="font-mono text-4xl mb-8 text-white">ADMIN PAGE TEMPLATE</div>
      <GoogleLogin shape="square" size="large" theme={"filled_black"} onSuccess={loginHandle} onError={errorHandle} width={"400px"} />
      <div className="w-[400px] mt-8">
        <div className="pl-2 text-xl text-mono text-white">EMAIL</div>
        <Input name={"id"} text={"Admin ID..."} type="email" onChange={inputHandler} require={true} value={id}></Input>
      </div>
      <div className="w-[400px]">
        <div className="flex gap-4">
          <div className="pl-2 text-xl w-full text-mono text-white">PASSWORD</div>
          <div className="pl-2 text-xl w-full text-mono text-white">KEY</div>
        </div>
        <div className="flex gap-4">
          <Input name={"pw"} text={"Admin password..."} type="password" onChange={inputHandler} require={true} value={pw}></Input>
          <Input name={"key"} text={"Admin Key..."} type="password" onChange={inputHandler} require={true} value={key}></Input>
        </div>
      </div>

      <div className=" w-[150px]">
        <Button color={"indigo"} text={"Admin Login"} type={"submit"} />
      </div>
    </form>
  );
}
