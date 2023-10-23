import * as mongoose from "mongoose"

export const PostSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    body: String,
    category: String,
    likes: String,
    tags: Array,
    date: String
})