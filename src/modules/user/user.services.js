
import User, { defaultProfilePec, defaultPublicID, defaultSecureURL } from "../../DB/models/user.model.js";
import fs from "fs";
import path from "path";


export const profile = async (req, res, next) => {
    const {user} = req;

    return res.status(200).json({
        success: true, 
        data: {username: user.username, email: user.email}
    });
}


export const profilePicture = async (req, res, next) => {
    if (!req.file) {
        return next(new Error("No file uploaded!", {cause: 400}))
    }

    const user = await User.findByIdAndUpdate(req.user._id, {profilePicture: req.file.path}, {new: true});

    return res.status(200).json({success: true, message: "Profile picture updated successfully!", data: user});
}



export const deleteProfilePicture = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new Error("User not found", { cause: 404 }));
    }

    if (!user.profilePicture || user.profilePicture === defaultProfilePec) {
        return next(new Error("No custom profile picture to delete", { cause: 400 }));
    }

    const imgPath = path.resolve(".", user.profilePicture);
    const folderPath = path.dirname(imgPath);

    fs.rm(folderPath, { recursive: true, force: true }, async (err) => {
        if (err) {
            return next(new Error("Failed to delete profile folder", { cause: 500 }));
        }

        user.profilePicture = defaultProfilePec;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile picture and folder deleted successfully",
        });
    });
}

