import { RequestHandler } from "express";
import { authSignInSchema } from "../schemas/auth-signin";
import { getUserByEmail } from "../services/user";
import { generateOTP } from "../services/otp";

export const signin: RequestHandler = async (req, res) => {
  const data = authSignInSchema.safeParse(req.body);
  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors });
    return;
  }

  const user = await getUserByEmail(data.data.email);
  if (!user) {
    res.json({ error: "Usuario nao existe" });
    return;
  }

  const otp = await generateOTP(user.id);

  res.json({ id: otp.id });
};
