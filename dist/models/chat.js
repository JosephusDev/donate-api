"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.SelectByChat = exports.Select = exports.Create = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const Create = async (data) => {
    return await prisma_1.default.chat.create({ data });
};
exports.Create = Create;
const Select = async (id) => {
    return await prisma_1.default.chat.findMany({
        select: {
            id: true,
            message: true,
            user_id_from: true,
            user_id_to: true,
            user1: {
                select: {
                    fullname: true,
                },
            },
            user2: {
                select: {
                    fullname: true,
                },
            },
        },
        where: {
            OR: [{ user_id_from: id }, { user_id_to: id }],
        },
        orderBy: { id: 'desc' },
    });
};
exports.Select = Select;
const SelectByChat = async (id_from, id_to) => {
    return await prisma_1.default.chat.findMany({
        select: {
            id: true,
            message: true,
            user_id_from: true,
            user_id_to: true,
            user1: {
                select: {
                    fullname: true,
                },
            },
            user2: {
                select: {
                    fullname: true,
                },
            },
        },
        where: {
            OR: [
                {
                    AND: [{ user_id_from: id_from }, { user_id_to: id_to }],
                },
                {
                    AND: [{ user_id_from: id_to }, { user_id_to: id_from }],
                },
            ],
        },
        orderBy: {
            id: 'asc',
        },
    });
};
exports.SelectByChat = SelectByChat;
const Delete = async (id) => {
    return await prisma_1.default.chat.delete({
        where: {
            id,
        },
    });
};
exports.Delete = Delete;
