import express from "express";
import { reportPositiveTest, getRoomByName } from "../controllers/rooms.js";

const router = express.Router();
router.post("/report-positive", reportPositiveTest);
router.get("/get-room/:name", getRoomByName);

export default router;
