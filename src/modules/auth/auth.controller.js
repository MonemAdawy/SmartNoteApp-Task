import { Router } from "express";
import * as authService from "./auth.services.js";
import * as authSchema from "./auth.validation.js";
import { asyncHandler } from "../../utils/errorHandling/asyncHandler.js";
import validation from "../../middleware/validation.middleware.js";
import isAuthenticated from "../../middleware/authentication.middleware.js";



const router = new Router();

router.post("/verify", validation(authSchema.sendOTP), asyncHandler(authService.sendOTP));

router.post("/register", validation(authSchema.register), asyncHandler(authService.register));

router.post("/login", validation(authSchema.login), asyncHandler(authService.login));

router.post("/forgot-password", validation(authSchema.forgotPassword), asyncHandler(authService.forgotPassword));

router.post("/reset-password", validation(authSchema.resetPassword), asyncHandler(authService.resetPassword));

router.post("/new_access", validation(authSchema.newAccess), asyncHandler(authService.newAccess));

router.post("/logout", asyncHandler(isAuthenticated), asyncHandler(authService.logout));


export default router;