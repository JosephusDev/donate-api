"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.getMessages = exports.getChats = exports.createMessage = void 0;
const chat_1 = require("../models/chat");
const zod_1 = require("zod");
const chat_2 = require("../schema/chat");
const createMessage = async (req, res) => {
    try {
        const data = chat_2.ChatSchema.parse(req.body);
        const user = await (0, chat_1.Create)(data);
        res.status(201).json(user);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ error: error.errors[0] });
        }
        else {
            res.status(500).json({ error: error });
        }
    }
};
exports.createMessage = createMessage;
const getChats = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const chats = await (0, chat_1.Select)(id);
        res.status(200).json(chats);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.getChats = getChats;
const getMessages = async (req, res) => {
    try {
        const id_from = parseInt(req.query.id_from, 10);
        const id_to = parseInt(req.query.id_to, 10);
        const chats = await (0, chat_1.SelectByChat)(id_from, id_to);
        res.status(200).json(chats);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.getMessages = getMessages;
const deleteMessage = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const chats = await (0, chat_1.Delete)(id);
        res.status(200).json(chats);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.deleteMessage = deleteMessage;
