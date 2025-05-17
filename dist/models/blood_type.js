"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const Select = async () => {
    return await prisma_1.default.bloodType.findMany({
        orderBy: {
            name: 'asc',
        },
    });
};
exports.Select = Select;
