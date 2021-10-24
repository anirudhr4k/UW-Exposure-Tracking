import Room from "../models/Room.js";
import Building from "../models/Building.js";

export const reportPositiveTest = async (req, res, next) => {
  const { buildingName, roomName, sectionToReport } = req.body;

  try {
    const positiveBuilding = await Building.findOne({ name: buildingName });
    console.log("test", positiveBuilding.rooms.length === 0);
    if (positiveBuilding.rooms.includes(roomName)) {
      const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      //const savedRoom = await
    }
  } catch (err) {
    console.log("err3", err.message);
    next(err);
  }
};

export const getRoomByName = async (req, res, next) => {
  const name = req.params.name;
};
