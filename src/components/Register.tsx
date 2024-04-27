import Button from "./ui/Button";
import Input from "./ui/Input";
import { RegisterPropsType } from "../types";

function Register({ registerModalClose }: RegisterPropsType) {
  return (
    <>
      <form className="flex opacity-95 flex-col justify-center items-center absolute right-0 top-0 w-[100%] h-full bg-slate-900">
        <div className="absolute top-2 right-10">
          <Button onClick={registerModalClose} text=">" type="gray" />
        </div>
        <div className="w-10/12 flex-col flex justify-center items-center">
          <div className="text-white text-2xl mb-8 font-bold">Sign in Your Account</div>
          <div className="flex flex-col w-full gap-2 justify-between items-start ">
            <div className="font-mono text-white flex-grow">Email</div>
            <Input type="email" require={true} text="Email address" />
          </div>
          <div className="mt-12 flex flex-col w-full gap-2 justify-between items-start ">
            <div className="font-mono text-white flex-grow">password</div>
            <Input type="password" require={true} text="password" />
            <Input type="password" require={true} text="password confirm" />
          </div>
        </div>
        <div className="flex justify-between mt-4 gap-10 w-10/12">
          <Button text="Submit" type="green" />
        </div>
      </form>
    </>
  );
}
export default Register;
