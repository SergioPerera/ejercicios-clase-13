import express from "express";
import { User } from "../models/user.js";
import { Products } from "../models/products.js";

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save()
    return res.status(201).send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

userRouter.get("/users", async (req, res) => {
  const { name } = req.query;
  try {
    let users;
    if (name) {
      // Find all users that match the name
      users = await User.find({ name });
    } else {
      // Find all users
      users = await User.find();
    }
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send();
  }
});

userRouter.patch("/users", async (req, res) => {
  //actualizar un usaurio por su nombre
  const name = req.query.name;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "mail",
    "preferences",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = await User.findOneAndUpdate({ name }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

userRouter.delete("/users", async (req, res) => {
  // Borrar un usuario por su nombre
  const name = req.query.name;
  try {
    const user = await User.findOneAndDelete({ name });
    if (!user) {
      return res.status(404).send();
    }
    await Products.updateMany({ users: user._id }, { $pull: { users: user._id } });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
  
});
