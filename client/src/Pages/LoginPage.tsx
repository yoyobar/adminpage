import { useEffect, useState } from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { CredentialResponse } from "@react-oauth/google";

interface LoginType {
  email: string;
  name: string;
  exp: string;
}
interface AdminLoginType {
  email: string;
  password: string;
  key: string;
}

export default function LoginPage() {
  const router = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router("/task", { replace: true });
    }
  }, []);

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
  const errorHandler = () => {
    console.error("login Request Error");
  };

  //? USER LOGIN
  const googleLoginHandler = (response: CredentialResponse) => {
    if (response.credential === undefined) return errorHandler();

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
        router("/task", { replace: true });
      })
      .catch(() => errorHandler());
  };

  //? ADMIN LOGIN
  const adminLoginHandler = (e: React.FormEvent<HTMLFormElement>) => {
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
        router("/task", { replace: true });
      })
      .catch(() => errorHandler());
  };

  return (
    <div className="w-full h-full bg-slate-700">
      <Login
        Props={{
          inputHandler: inputHandler,
          googleLoginHandler: googleLoginHandler,
          adminLoginHandler: adminLoginHandler,
          errorHandler: errorHandler,
          id: id,
          pw: pw,
          key: key,
        }}
      />
    </div>
  );
}
