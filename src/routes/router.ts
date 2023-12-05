import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("It works!");
});

import authRoutes from "./users/auth.routes";

router.use("/auth", authRoutes);

export default router;
