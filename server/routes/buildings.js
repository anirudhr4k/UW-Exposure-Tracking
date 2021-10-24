import express from "express";
import {
  searchBuildingBySubtring,
  addBuilding,
} from "../controllers/buildings.js";

const router = express.Router();

router.post("/add-building", addBuilding);
router.get("/get-buildings/:substring", searchBuildingBySubtring);

export default router;
