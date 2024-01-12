import { Router } from "express";
import { registerStore, findStore } from "../controllers/storeController.js";
import { findServiceByStore, registerService, removeService, removeServicePhoto } from "../controllers/serviceController.js";
import multer from "../middlewares/multer.js";
import { registerCollaborator } from "../controllers/collaboratorController.js";
import { findSchedules, registerScheduling } from "../controllers/schedulingController.js";
import { loginUser, registerUser } from "../controllers/userController.js";
import requiredUser from "../middlewares/auth.js";


const router = Router();

router.post("/users/register", registerUser)
router.post("/users/login", loginUser)

// Shop
router.post("/stores", registerStore)
router.get("/services/:storeId", findServiceByStore )
router.get("/stores/:id", findStore)
//service
router.post("/services",multer.single('profile'), registerService)
router.delete("/services/file/:id", removeServicePhoto)
router.delete("/services/:id", removeService)

//collaborator

router.post("/collaborators", registerCollaborator)


//agendamento
router.get("/schedules", findSchedules);
router.post("/schedules/store/:storeId",requiredUser(["admin"]), registerScheduling)
router.get("/schedules/store/:id",requiredUser(["admin"]), findSchedules)

export default router;

