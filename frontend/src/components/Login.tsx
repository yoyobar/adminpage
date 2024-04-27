import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Register from "./Register";

function Login() {
  const [toggle, setToggle] = useState(false);

  const registerModal = (): void => {
    setToggle(true);
  };
  const registerModalClose = (): void => {
    setToggle(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-white text-5xl mb-14">ADMIN TEMPLATE</div>
        <form className="bg-slate-700 flex w-96 flex-col justify-center items-center">
          <Input require={true} type="email" text="Email address" />
          <div className="mb-4"></div>
          <Input require={true} type="password" text="Password" />
          <div className="mb-8"></div>
          <Button type="submit" text="Login" color="indigo" />
          <div className="mb-4"></div>
          <Button type="button" text="Register" color="green" onClick={registerModal} />
        </form>
      </div>
      <div>{toggle ? <Register registerModalClose={registerModalClose} /> : null}</div>
    </>
  );
}

export default Login;
