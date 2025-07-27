import Note from "../../DB/models/note.model.js";
import * as dbService from "../../DB/db.service.js";
import {OpenAI} from "openai";


export const createNote = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;
    const newNote = new Note({
        title,
        content,
        ownerId: userId,
    });
    await newNote.save();
    res.status(201).json({ success: true, message: "Note created successfully", note: newNote });
}


export const getAllNotes = async (req, res, next) => {
    let { page, size } = req.query;
    const skip = (page - 1) * size;
    const userId = req.user.id;

    const notes = await dbService.find({
        model: Note,
        filter: { ownerId: userId },
        skip,
        limit: size,
    });


    if (!notes || notes.length === 0) {
        return next(new Error("No notes found for this user", { cause: 404 }));
    }
    res.status(200).json({ success: true, data: notes });
}


export const deleteNote = async (req, res, next) => {
    const { noteId } = req.params;
    const userId = req.user.id;

    const note = await Note.findOne({ _id: noteId, ownerId: userId });
    if (!note) {
        return next(new Error("Note not found or you do not have permission to delete it", { cause: 404 }));
    }

    await Note.deleteOne({ _id: noteId });
    res.status(200).json({ success: true, message: "Note deleted successfully" });
}



export const summarizeNote = async (req, res, next) => {
    const { noteId } = req.params;
    console.log("Summarizing note with ID:", noteId);
    const userId = req.user.id;

    const note = await Note.findOne({ _id: noteId, ownerId: userId });
    if (!note) {
        return next(new Error("Note not found or you do not have permission to summarize it", { cause: 404 }));
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    console.log(openai);


    const completion = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
            {
            role: "user",
            content: `Summarize this note in one short paragraph:\n${note.content}`,
            },
        ],
        temperature: 0.5,
    });

    const summary = completion.choices[0].message.content;
    if (!summary) {
        return next(new Error("Failed to summarize the note", { cause: 500 }));
    }

    res.status(200).json({ success: true, summary });
}