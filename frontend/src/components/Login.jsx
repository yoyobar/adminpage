import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { useState } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [key, setKey] = useState("");

  const inputHandler = (e) => {
    const event = e.target;
    if (event.name === "id") setId(event.value);
    if (event.name === "pw") setPw(event.value);
    if (event.name === "key") setKey(event.value);
  };
  const loginHandle = (response) => {
    const decodeToken = jwtDecode(response.credential);
  };
  const errorHandle = (error) => {
    console.error(error);
  };

  return (
    <form className="flex gap-4 flex-col w-full h-full justify-center items-center">
      <div className="font-mono text-4xl mb-8 text-white">ADMIN PAGE TEMPLATE</div>
      <GoogleLogin shape="square" size="large" theme={"filled_black"} onSuccess={loginHandle} onFailure={errorHandle} cookiePolicy={"single_host_origin"} width={"400px"} />
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