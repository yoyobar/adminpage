import { TokenType } from "../types";

export default function getToken() {
  const localToken = localStorage.getItem("token");
  if (localToken === null) return null;

  const myToken: TokenType = JSON.parse(localToken);

  if (myToken.expire <= Date.now()) {
    localStorage.removeItem("token");
    return null;
  }

  return myToken.token;
}
