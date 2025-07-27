import { model, Schema } from "mongoose";

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Note title is required'],
            trim: true,
            minlength: 3,
            maxlength: 100,
        },
        content: {
            type: String,
            required: [true, 'Note content is required'],
            minlength: 5,
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Note must have an owner'],
        },
        summary: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

noteSchema.index({ title: 'text', ownerId: 1, createdAt: -1 });

const Note = model("Note", noteSchema);


export default Note;