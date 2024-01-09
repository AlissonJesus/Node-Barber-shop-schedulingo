import { Router } from "express";
import { registerStore, findStore } from "../controllers/storeController.js";
import { findServiceByStore, registerService, removeService, removeServicePhoto } from "../controllers/serviceController.js";
import multer from "../middlewares/multer.js";
import { registerCollaborator } from "../controllers/collaborator.js";
import { findSchedules, registerScheduling } from "../controllers/schedulingController.js";


const router = Router();

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
router.post("/schedules/store/:storeId",registerScheduling)
router.get("/schedules/store/:id", findSchedules)

export default router;

