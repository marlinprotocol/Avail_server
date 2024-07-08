import express from "express";
import {
  getVersion,
  proveTransaction,
} from "../../controllers/proverControllers/proverController";
import { validateApiSecret } from "../../middleware/authHelper";

export const prover_router = express.Router();

//Version check
prover_router.get("/version", validateApiSecret, getVersion);

//Prove Transaction public
prover_router.post("/proveTx", validateApiSecret, proveTransaction);

