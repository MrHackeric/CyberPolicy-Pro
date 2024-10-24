import express from "express";
import pkg from "lodash";
const { get, merge } = pkg;
import { getUserBySessionToken } from "../models/users.js";

const CYBER_SECRET = process.env.CYBERPOLICY_PRO_SECRET;

export const isOwner = (req, res, next) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id");

    if (!currentUserId) {
      return res.status(403);
    }
    if (currentUserId.toString() != id) {
      return res.status(403);
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

export const isAuthenticated = async (req, res, next) => {
  try {
    const sessionToken = req.cookies[CYBER_SECRET];
    if (!sessionToken) {
      return res.status(403).json({ msg: "Unauthoorized" });
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(403).json({ msg: "Unauthorised" });
    }

    merge(req, { identity: existingUser });

    next();
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
