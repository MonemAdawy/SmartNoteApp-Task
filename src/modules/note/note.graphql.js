import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLInputObjectType,
} from "graphql";

import Note from "../../DB/models/note.model.js";
import User from "../../DB/models/user.model.js";

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        _id: { type: GraphQLID },
        email: { type: GraphQLString },
    },
});

const NoteType = new GraphQLObjectType({
    name: "Note",
    fields: {
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        summary: { type: GraphQLString },
        ownerId: { type: UserType },
        createdAt: { type: GraphQLString },
    },
});


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        notes: {
            type: new GraphQLList(NoteType),
            args: {
                userId: { type: GraphQLID },
                title: { type: GraphQLString },
                fromDate: { type: GraphQLString },
                toDate: { type: GraphQLString },
                page: { type: GraphQLInt },
                limit: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                const { userId, title, fromDate, toDate, page = 1, limit = 10 } = args;
                const query = {};

                if (userId) query.ownerId = userId;
                if (title) query.title = { $regex: title, $options: "i" };
                if (fromDate || toDate) {
                    query.createdAt = {};
                    if (fromDate) query.createdAt.$gte = new Date(fromDate);
                    if (toDate) query.createdAt.$lte = new Date(toDate);
                }

                const notes = await Note.find(query)
                    .populate("ownerId", "email")
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .sort({ createdAt: 1 });

                return notes;
            },
        },
    },
});

export const graphqlSchema = new GraphQLSchema({
    query: RootQuery,
});
