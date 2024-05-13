import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";
import Button from "./ui/Button";
import Input from "./ui/Input";

interface LoginProps {
  Props: {
    inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    googleLoginHandler: (response: CredentialResponse) => void;
    adminLoginHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    errorHandler: () => void;
    id: string;
    pw: string;
    key: string;
  };
}

export default function Login({ Props }: LoginProps) {
  return (
    <form onSubmit={Props.adminLoginHandler} className="flex gap-4 flex-col w-full h-full justify-center items-center">
      <div className="font-mono text-4xl mb-8 text-white">ADMIN PAGE TEMPLATE</div>
      <GoogleLogin shape="square" size="large" theme={"filled_black"} onSuccess={Props.googleLoginHandler} onError={Props.errorHandler} width={"400px"} />
      <div className="w-[400px] mt-8">
        <div className="pl-2 text-xl text-mono text-white">EMAIL</div>
        <Input name={"id"} text={"Admin ID..."} type="email" onChange={Props.inputHandler} require={true} value={Props.id}></Input>
      </div>
      <div className="w-[400px]">
        <div className="flex gap-4">
          <div className="pl-2 text-xl w-full text-mono text-white">PASSWORD</div>
          <div className="pl-2 text-xl w-full text-mono text-white">KEY</div>
        </div>
        <div className="flex gap-4">
          <Input name={"pw"} text={"Admin password..."} type="password" onChange={Props.inputHandler} require={true} value={Props.pw}></Input>
          <Input name={"key"} text={"Admin Key..."} type="password" onChange={Props.inputHandler} require={true} value={Props.key}></Input>
        </div>
      </div>

      <div className=" w-[150px]">
        <Button color={"indigo"} text={"Admin Login"} type={"submit"} />
      </div>
    </form>
  );
}
