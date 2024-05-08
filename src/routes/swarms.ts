import { Router } from "express";
import {getSwarms, createSwarm} from "../controllers/swarms";

const router = Router()

router.get('/', getSwarms);
router.post('/', createSwarm);

export default router;