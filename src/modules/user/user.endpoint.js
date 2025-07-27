import { roles } from "../../DB/models/user.model.js";

const endpoints = {
    profile: [roles.user, roles.admin],
}




export default endpoints;