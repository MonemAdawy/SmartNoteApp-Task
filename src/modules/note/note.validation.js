import joi from 'joi';

export const createNoteSchema = joi.object({
    title: joi.string().min(3).max(100).required(),
    content: joi.string().min(5).required(),
});

