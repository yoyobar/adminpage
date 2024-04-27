import Button from "./ui/Button";
import Input from "./ui/Input";

function Login() {
  {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-white text-5xl mb-14">ADMIN TEMPLATE</div>
        <div className="bg-slate-700 flex w-96 flex-col justify-center items-center">
          <div className="text-white text-2xl mb-8 font-bold">Sign in to your account</div>
          <Input text="Email address" />
          <div className="mb-4"></div>
          <Input text="Password" />
          <div className="mb-8"></div>
          <Button text="Login" type="indigo" />
          <div className="mb-4"></div>
          <Button text="Register" type="green" />
        </div>
      </div>
    );
  }
}

export default Login;
