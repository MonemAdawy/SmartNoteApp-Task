import { Router } from "express";
import isAuthenticated from "../../middleware/authentication.middleware.js";
import * as userService from "./user.services.js";
import { asyncHandler } from "../../utils/errorHandling/asyncHandler.js";
import isAuthorized from "../../middleware/authorization.middlware.js";
import endpoints from "./user.endpoint.js";
import { fileValidation, upload } from "../../utils/file uploading/multerUpload.js";



const router = Router();

router.post("/profile", asyncHandler(isAuthenticated), isAuthorized(endpoints.profile), asyncHandler(userService.profile));

router.post("/upload-profilePicture", asyncHandler(isAuthenticated), upload(fileValidation.images, "uploads/users").single("image"), asyncHandler(userService.profilePicture));

router.delete("/delete-profilePicture", asyncHandler(isAuthenticated), asyncHandler(userService.deleteProfilePicture));


export default router;