import Button from "./ui/Button";
import Input from "./ui/Input";
import { RegisterPropsType } from "../types";
import { useState } from "react";
import axios from "axios";

function Register({ registerModalClose }: RegisterPropsType) {
  const [nameVerify, setNameVerify] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailError, setEmailError] = useState("");

  //? POST 계정생성
  const userCreate = async (email: string, pw: string, name: string) => {
    try {
      const post = await axios.post("http://localhost:3001/register", { email, pw, name });
      if (post.data === "email") {
        setEmailError("Email is Already ! Use another email please");
        return setEmailVerify(true);
      }
      if (post.data === "name") {
        return setNameVerify(true);
      }
      setEmail("");
      setPassword("");
      setPassword2("");
      registerModalClose();
    } catch (err) {
      console.error("Error", err);
    }
  };

  //? FORM 데이터 처리
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameVerify(false);
  };
  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailVerify(false);
  };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordVerify(false);
  };
  const password2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
    setPasswordVerify(false);
  };

  //? FORM 데이터 검증
  const formVerify = (email: string, pw1: string, pw2: string) => {
    const emailCase = email.split("@")[1];
    if (!emailCase.includes(".com")) {
      setEmailError("Email is not Correct! EX: Email@address.com");
      setEmailVerify(true);
      return false;
    }
    if (pw1 !== pw2) {
      setPasswordVerify(true);
      return false;
    }
    return true;
  };

  //? FORM 데이터 DB등록
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formVerify(email, password1, password2)) {
      userCreate(email, password1, name);
    }
  };

  //! handleSubmit → formVerify true? userCreate(DB) false? errorStatus

  return (
    <>
      <form onSubmit={handleSubmit} className="flex opacity-95 flex-col justify-center items-center absolute right-0 top-0 w-[100%] h-full bg-slate-900">
        <div className="absolute top-2 right-10">
          <Button type="button" onClick={registerModalClose} text=">" color="gray" />
        </div>
        <div className="w-10/12 flex-col flex justify-center items-center">
          <div className="text-white text-center text-2xl mb-8 font-bold">Sign in Your Account</div>
          <div className="flex flex-col w-full gap-2 justify-between items-start ">
            <div className="font-mono flex gap-4 text-white flex-grow">
              <div>Email</div>
              <div className={emailVerify ? "text-red-400" : "hidden"}>{emailError}</div>
            </div>
            <Input onChange={emailChange} type="email" value={email} require={true} text="Email address" />
          </div>
          <div className="mt-4 flex flex-col w-full gap-2 justify-between items-start ">
            <div className="font-mono flex gap-4 text-white flex-grow">
              <div>Username</div>
              <div className={nameVerify ? "text-red-400" : "hidden"}>Already Have this name</div>
            </div>
            <Input onChange={nameChange} type="text" value={name} require={true} text="Username" />
          </div>
          <div className="mt-12 flex flex-col w-full gap-2 justify-between items-start ">
            <div className="font-mono flex gap-4 text-white flex-grow">
              <div>password</div>
              <div className={passwordVerify ? "text-red-400" : "hidden"}>password is not Correct!</div>
            </div>
            <Input onChange={passwordChange} type="password" value={password1} require={true} text="password" />
            <Input onChange={password2Change} type="password" value={password2} require={true} text="password confirm" />
          </div>
        </div>
        <div className="flex justify-between mt-4 gap-10 w-10/12">
          <Button text="Submit" type="submit" color="green" />
        </div>
      </form>
    </>
  );
}
export default Register;
