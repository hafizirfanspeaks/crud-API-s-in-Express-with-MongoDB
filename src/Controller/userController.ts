import type { Request, Response } from "express";
import User from "../model/userModel.js";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, email, address } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({ name, email, address });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetch = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(400).json({ messaage: "User not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




interface UserUpdateBody {
  name?: string;
  email?: string;
  address?: string;
}

interface UserParams {
  id: string;
}

export const update = async (req: Request<UserParams, {}, UserUpdateBody>, res: Response) => {
  try {
    const id = req.params.id;

    const userExist = await User.findOne({ _id: id });

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



interface UserParams {
  id: string;
}

export const deleteUser = async (req: Request<UserParams>, res: Response) => {
  try {
    const id = req.params.id;

    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};