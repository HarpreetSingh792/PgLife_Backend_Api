import express from "express";
import { deleteAmenities, getAllProperties, getSearched, setAmenities, updateAmenities } from "../controllers/amenities.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/all",getAllProperties);
router.post("/add",isAuthenticated,setAmenities)
router.route("/:id").put(isAuthenticated,updateAmenities).delete(isAuthenticated,deleteAmenities);
router.get("/",getSearched)

export default router;