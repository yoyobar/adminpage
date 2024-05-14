import axios from "axios";

interface TokenType {
  expire: number;
  token: {
    token: string;
    token_type: string;
  };
}

export default async function verifyToken() {
  const localToken = localStorage.getItem("token");
  if (localToken === null) return null;
  const myToken: TokenType = JSON.parse(localToken);

  const { data } = await axios.post("http://localhost:3001/verify", myToken);
  switch (data.verify) {
    case "FALSE":
      return "FALSE";
    case "USER":
      return "USER";
    case "ADMIN":
      return "ADMIN";
    default:
      return "FALSE";
  }
}
