import express from "express";
import { createDocumentTemplate } from "../controllers/documentDrafting.js";

const router = express.Router();

router.post("/draftDoc", createDocumentTemplate);

export default router;
