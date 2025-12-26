import { Request, Response, NextFunction } from "express";

export const checkEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  // Agar email body mein nahi hai
  if (!email) {
    return res.status(400).json({ message: "Email dena zaroori hai!" });
  }

  // Agar sab theek hai, toh 'next()' call karen
  // Ye 'next()' hi request ko controller tak agay bhejta hai
  next();
};