import express from "express";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import dotenv from "dotenv";
import { createApolloGraphQLServer } from "./graphql/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

async function startServer() {
  const gqlServer = await createApolloGraphQLServer();

  app.use(cors());
  app.use(express.json());

  app.use("/graphql", expressMiddleware(gqlServer));

  app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
  });

  app.listen(port, () => {
    console.log(`running at http://localhost:${port}/graphql`);
  });
}
//make sure that docker is also up and running
//dont forget to do docker-compose up
// npm run dev to start the server
startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
