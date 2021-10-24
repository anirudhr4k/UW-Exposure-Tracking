import Building from "../models/Building.js";

export const addBuilding = async (req, res, next) => {
  const { name, code, rooms } = req.body;
  const building = new Building({ name, code, rooms });
  try {
    const savedBuilding = await building.save();
    res.status(200).send(savedBuilding);
  } catch (err) {
    console.log("err2", err.message);
    next(err);
  }
};

export const searchBuildingBySubtring = async (req, res, next) => {
  const substring = req.params.substring;
  try {
    const building = await Building.find({
      $or: [
        { name: { $regex: new RegExp(substring, "i") } },
        { code: { $regex: new RegExp(substring, "i") } },
      ],
    });
    res.status(201).send(building);
  } catch (err) {
    console.log("err1", err.message);
    next(err);
  }
};
