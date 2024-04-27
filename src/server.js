import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 6000;

app.listen(port, () => {
  console.log(`서버 가동테스트 ${port}`);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/react-project/build/index.html"));
});
