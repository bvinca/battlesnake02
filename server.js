import process from "node:process";
import express from "express";

export default function runServer(handlers) {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json());

  app.get("/", (request, response) => {
    response.send(handlers.info());
  });

  app.post("/start", (request, response) => {
    handlers.start(request.body);
    response.send("ok");
  });

  app.post("/move", (request, response) => {
    response.send(handlers.move(request.body));
  });

  app.post("/end", (request, response) => {
    handlers.end(request.body);
    response.send("ok");
  });

  app.use(function (request, response, next) {
    response.set("Server", "battlesnake/replit/starter-snake-javascript");
    next();
  });

  const host = "0.0.0.0";
  const port = process.env.PORT || 8000;

  app.listen(port, host, () => {
    console.log(`Running Battlesnake at http://${host}:${port}...`);
  });
}
