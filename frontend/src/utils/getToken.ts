export default function getToken() {
  const myToken = JSON.parse(localStorage.getItem("token") as string);

  if (!myToken) return null;

  if (myToken.expire <= Date.now()) {
    localStorage.removeItem("token");
    return null;
  }

  return myToken.token;
}
