import next from "next";
import { createServer } from "node:http";

const dev = process.env.NODE_ENV !== "production";

// 🔥 Azure me 0.0.0.0 use karna must hai
const hostname = "0.0.0.0";

// 🔥 Azure dynamic port deta hai (IMPORTANT)
const port = parseInt(process.env.PORT, 10) || 8080;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`🚀 Server ready at http://${hostname}:${port}`);
  });
});