import express from "express";
import {
  checkRoleUser,
  createUsers,
  deleteUsers,
  getListUser,
  getUser,
  getUserById,
  //   Register,
  Login,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { uploadImages } from "../components/UploadImage.js";
import validateImage from "../middleware/Multer.js";
import validatePDF from "../middleware/Multer2.js";
import { uploadFiles } from "../components/UploadFile.js";
import {
  deleteInfrastruktur,
  editInfrastruktur,
  editProcessInfrastruktur,
  getDetailInfrastruktur,
  getListInfrastruktur,
  setInfrastruktur,
} from "../controllers/Infrastruktur.js";
const router = express.Router();

router.post("/infrastruktur", verifyToken, getListInfrastruktur);
router.post("/infrastruktur/detail", verifyToken, getDetailInfrastruktur);
router.post("/infrastruktur/create", verifyToken, setInfrastruktur);
router.post("/infrastruktur/set_process", verifyToken, editProcessInfrastruktur);
router.post("/infrastruktur/edit", verifyToken, editInfrastruktur);
router.post("/infrastruktur/delete", verifyToken, deleteInfrastruktur);



router.post("/me", verifyToken, getUser);
router.post("/list_users", verifyToken, getListUser);
router.post("/user/check_role", verifyToken, checkRoleUser);
router.post("/users/create", verifyToken, createUsers);
router.post("/users/delete", verifyToken, deleteUsers);
router.post("/users/detail", verifyToken, getUserById);
// router.put("/users/:id", verifyToken, updateUsers);
// router.delete("/users/:id", deleteUsers);

// router.post("/users", Register);
// router.post("/verify", Verify);
router.post("/login", Login);
// router.delete("/logout", Logout);

router.post(
  "/upload_images",
  verifyToken,
  validateImage.single("file"),
  uploadImages
);

router.post(
  "/upload_files",
  verifyToken,
  validatePDF.single("file"),
  uploadFiles
);

export default router;
