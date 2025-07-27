import connectDB from "./DB/connection.js"
import User from "./DB/models/user.model.js";
import Token from "./DB/models/token.model.js";
import Note from "./DB/models/note.model.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import noteRouter from "./modules/note/note.controller.js";
import glopalErrorHandler from "./utils/errorHandling/globalErrorHandler.js";
import notFoundHandler from "./utils/errorHandling/notFound.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { graphqlHTTP } from "express-graphql";
import { graphqlSchema } from "./modules/note/note.graphql.js";


const limiter = rateLimit({
    limit: 5,
    windowMs: 2 * 60 * 1000,
    message: {err:"Rate limit reached"},
    statusCode: 429,
    standardHeaders: "draft-8",
});

const bootstrap = async (app, express) => {
    let whitelist = process.env.whitelist ? process.env.whitelist.split(",") : [];
    let corsOptions = {
        origin: (origin, callback) => {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    };

    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(limiter)

    await connectDB();

    app.use(express.json());

    console.log("Registering route: /auth");
    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/note", noteRouter);

    app.use(
        "/graphql",
        graphqlHTTP({
            schema: graphqlSchema,
            graphiql: true,
        })
    );


    app.use(notFoundHandler)

    app.use(glopalErrorHandler);
}


export default bootstrap;