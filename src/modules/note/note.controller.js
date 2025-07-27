import { Router } from "express";
import * as noteService from "./note.services.js";
import * as noteSchema from "./note.validation.js";
import { asyncHandler } from "../../utils/errorHandling/asyncHandler.js";
import validation from "../../middleware/validation.middleware.js";
import isAuthenticated from "../../middleware/authentication.middleware.js";

const router = new Router();

router.post("/create",
    asyncHandler(isAuthenticated),
    validation(noteSchema.createNoteSchema),
    asyncHandler(noteService.createNote)
);

router.get("/get-all",
    asyncHandler(isAuthenticated), 
    asyncHandler(noteService.getAllNotes)
);

router.delete("/:noteId",
    asyncHandler(isAuthenticated),
    asyncHandler(noteService.deleteNote)
);

router.post("/:noteId/summarize",
    asyncHandler(isAuthenticated),
    asyncHandler(noteService.summarizeNote)
);

export default router;