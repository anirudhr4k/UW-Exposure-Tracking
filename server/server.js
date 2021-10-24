import express from "express";
import buildingRoute from "./routes/buildings.js";
import roomRoute from "./routes/rooms.js";
import cors from "cors";
import "./helpers/mongodb.js";

//App Config
const app = express();
const port = 8000;

//Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "172.22.1.1",
  })
);

app.get("/", (_, res) => {
  res.status(200).send("Server Up");
});

//Route Imports
app.use("/api/buildings", buildingRoute);
app.use("/api/rooms", roomRoute);

//Error handler
app.use((err, _, res, __) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

//Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
