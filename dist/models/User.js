"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getAvalebleDonate = exports.orderNotifications = exports.getDonate = exports.Login = exports.updateUser = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createUser = async (data) => {
    return await prisma_1.default.user.create({ data });
};
exports.createUser = createUser;
const updateUser = async (data, id) => {
    return await prisma_1.default.user.update({ data, where: { id } });
};
exports.updateUser = updateUser;
const Login = async (data) => {
    return await prisma_1.default.user.findMany({ where: data });
};
exports.Login = Login;
const getDonate = async (user_id) => {
    return await prisma_1.default.user.findMany({
        select: {
            id: true,
            fullname: true,
            gender: true,
            blood_type: {
                select: {
                    name: true,
                },
            },
        },
        where: {
            user_type: 'individual',
            state: true,
            blood_type: {
                isNot: null,
            },
            id: {
                not: user_id,
            },
        },
    });
};
exports.getDonate = getDonate;
const orderNotifications = async (user_id) => {
    return await prisma_1.default.order.findMany({
        select: {
            donate_location: true,
            description: true,
            urgency: true,
            state: true,
            user: {
                select: {
                    fullname: true,
                    gender: true,
                    phone: true,
                    blood_type: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
        where: {
            state: 'pendente',
            user_id: {
                not: user_id,
            },
        },
        orderBy: {
            urgency: 'desc', // Ordenando da maior para a menor urgência
        },
    });
};
exports.orderNotifications = orderNotifications;
//Obter os doadores disponiveis
const getAvalebleDonate = async (id, blood_type_id) => {
    return await prisma_1.default.user.findMany({
        select: {
            fullname: true,
            email: true,
        },
        where: {
            id: {
                not: id,
            },
            user_type: 'individual',
            state: true,
            blood_type: {
                isNot: null,
            },
            blood_type_id: {
                equals: blood_type_id,
            },
        },
    });
};
exports.getAvalebleDonate = getAvalebleDonate;
//Obter um usuario especifico
const getUser = async (id) => {
    return await prisma_1.default.user.findFirstOrThrow({
        where: {
            id: {
                equals: id,
            },
        },
    });
};
exports.getUser = getUser;
