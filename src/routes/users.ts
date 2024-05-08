import { Router } from "express";
import { createUser, updateProfile, updateUser, getUsers } from "../controllers/users";

const router = Router();

router.post('/', createUser )
router.put('/:id', updateUser)
router.put('/profiles/:id', updateProfile)
router.get('/', getUsers)

export default router