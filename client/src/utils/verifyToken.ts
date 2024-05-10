import axios from "axios";

interface TokenType {
  expire: number;
  token: object;
}

export default async function verifyToken() {
  const localToken = localStorage.getItem("token");
  if (localToken === null) return null;

  const myToken: TokenType = JSON.parse(localToken);

  if (myToken.expire <= Date.now()) {
    localStorage.removeItem("token");
    return null;
  }

  const { data } = await axios.post("http://localhost:3001/verify", myToken);
  if (data.error) return false;
  return true;
}
