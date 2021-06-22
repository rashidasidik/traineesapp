const Trainee = require("../models/traineeSchema");

const createTrainee = async (req, res) => {
  const newTrainee = new Trainee({
    name: req.body.name,
    destination: req.body.destination,
    email: req.body.email,
    dob: req.body.dob,
  });

  await newTrainee.save();
  res.status(202).json(newTrainee);
};

//GET ALL TRAINEES

const getAllTrainees = async (req, res) => {
  const trainees = await Trainee.find();
  res.json(trainees);
};

//GET A TRAINEE
const getSingleTrainee = async (req, res) => {
  const trainee = await Trainee.findById(req.params._id);
  res.json(trainee);
};

// UPDATE A TRAINEE

const updateTrainee = async (req, res) => {
  const foundtrainee = await Trainee.findById(req.params._id);

  //destructuring
  // const {name, destination,email,dob}=req.body

  if (foundTrainee) {
    foundTrainee.name = req.name.name;
    foundTrainee.destination = req.name.destination;
    foundTrainee.email = req.name.email;
    foundTrainee.dob = req.name.dob;

    const updatedTrainee = await foundTrainee.save();
    res.json({ updatedTrainee });
  }
};

//DELETE A TRAINEE

const deleteTrainee = async (req, res) => {
  const foundTrainee = await Trainee.findById(req.params._id);
  if (foundTrainee) {
    foundTrainee.remove();
    res.json({ msg: `${foundTrainee.name} removed` });
  } else {
    res.status(404).json({ error: "Trainee not found" });
  }
};

module.exports = {
  createTrainee,
  getAllTrainees,
  getSingleTrainee,
  updateTrainee,
  deleteTrainee,
};
