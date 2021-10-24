import Room from "../models/Room.js";
import Building from "../models/Building.js";

export const reportPositiveTest = async (req, res, next) => {
  const { buildingName, roomName, sectionToReport } = req.body;

  try {
    const positiveBuilding = await Building.findOne({ name: buildingName });
    console.log("test", positiveBuilding.rooms.length === 0);
    if (!positiveBuilding.rooms.includes(roomName)) {
      const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      arr[sectionToReport - 1] = 1;
      const room = new Room({
        name: roomName,
        totalReports: 1,
        quantSubdivision: arr,
      });
      const savedRoom = await room.save();
      const updateBuilding = await positiveBuilding.update({
        $push: { rooms: roomName },
      });
      res.status(201).send(savedRoom);
    } else {
      const updatedRoom = await Room.findOneAndUpdate(
        {
          name: roomName,
        },
        {
          $inc: {
            [`quantSubdivision.${sectionToReport - 1}`]: 1,
            totalReports: 1,
          },
        },
        { new: true }
      );
      res.status(201).send(updatedRoom);
    }
  } catch (err) {
    console.log("err3", err.message);
    next(err);
  }
};

export const getRoomByName = async (req, res, next) => {
  const name = req.params.name;
  try {
    const room = await Room.findOne({ name });
    res.status(201).send(room);
  } catch (err) {
    console.log("err4", err.message);
    next(err);
  }
};
