import Button from "./ui/Button";
import Input from "./ui/Input";
import { RegisterPropsType } from "../types";
import { useState } from "react";
import axios from "axios";

function Register({ registerModalClose }: RegisterPropsType) {
  const [emailVerify, setEmailVerify] = useState(false);
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [password1, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  //? MYSQL DB
  async function userCreate(email: string, pw1: string, pw2: string) {
    try {
      await axios.post("http://localhost:3001/api", { email, pw1, pw2 });
    } catch (err) {
      console.error("Error", err);
    }
  }

  //? FORM 데이터 처리
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
  const formVerify = (email: string, pw1: string, pw2: string): boolean => {
    const emailCase = email.split("@")[1];
    if (!emailCase.includes(".com")) {
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
      userCreate(email, password1, password2);
    } else {
      return;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex opacity-95 flex-col justify-center items-center absolute right-0 top-0 w-[100%] h-full bg-slate-900">
        <div className="absolute top-2 right-10">
          <Button type="button" onClick={registerModalClose} text=">" color="gray" />
        </div>
        <div className="w-10/12 flex-col flex justify-center items-center">
          <div className="text-white text-2xl mb-8 font-bold">Sign in Your Account</div>
          <div className="flex flex-col w-full gap-2 justify-between items-start ">
            <div className="font-mono flex gap-4 text-white flex-grow">
              <div>Email</div>
              <div className={emailVerify ? "text-red-400" : "hidden"}>Email is not Correct! EX: Email@address.com</div>
            </div>
            <Input onChange={emailChange} type="email" value={email} require={true} text="Email address" />
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
