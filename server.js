import { createRequestHandler } from "@remix-run/express";
import { installGlobals } from "@remix-run/node";
import express from "express";

const PORT = '8080';

installGlobals();
const remixHandler = createRequestHandler({ build: await import("./build/server/index.js") });
const app = express();
app.use("/assets", express.static("./build/client/assets"));
app.all("*", remixHandler);
app.listen(PORT, () => console.log(`listening on port ${PORT}`));