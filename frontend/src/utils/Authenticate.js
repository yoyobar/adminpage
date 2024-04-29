import axios from "axios";

const myToken = JSON.parse(localStorage.getItem("token"));

//? LOCAL STORAGE JSON -> OBJECT
export const getToken = () => {
  if (!myToken) return null;

  if (myToken.expire <= Date.now()) {
    localStorage.removeItem("token");

    return null;
  }

  return myToken;
};

export const verifyToken = async () => {
  const result = await axios.post("http://localhost:3001/verify", myToken);
  console.log(result);
};
