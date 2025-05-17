"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderNotifications = exports.userOrders = exports.Delete = exports.Update = exports.Select = exports.Create = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const Create = async (data) => {
    return await prisma_1.default.order.create({ data });
};
exports.Create = Create;
const Select = async () => {
    return await prisma_1.default.order.findMany({
        select: {
            id: true,
            donate_location: true,
            urgency: true,
            description: true,
            state: true,
            user_id: true,
            blood_type_id: true,
            date: true,
            user: {
                select: {
                    fullname: true,
                },
            },
            blood_type: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: { urgency: 'asc' },
    });
};
exports.Select = Select;
const Update = async (id, data) => {
    return await prisma_1.default.order.update({
        data,
        where: {
            id,
        },
    });
};
exports.Update = Update;
const Delete = async (id) => {
    return await prisma_1.default.order.delete({
        where: {
            id,
        },
    });
};
exports.Delete = Delete;
const userOrders = async (id) => {
    return await prisma_1.default.order.findMany({
        select: {
            id: true,
            donate_location: true,
            description: true,
            urgency: true,
            state: true,
            blood_type: {
                select: {
                    name: true,
                },
            },
        },
        where: {
            user_id: id,
        },
    });
};
exports.userOrders = userOrders;
const orderNotifications = async (id) => {
    return await prisma_1.default.order.findMany({
        select: {
            id: true,
            donate_location: true,
            description: true,
            urgency: true,
            state: true,
            user: {
                select: {
                    id: true,
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
                not: id, // Garante que o usuário não veja suas próprias ordens como notificações
            },
            blood_type_id: {
                in: await prisma_1.default.user
                    .findMany({
                    select: {
                        blood_type_id: true,
                    },
                    where: {
                        id: id,
                    },
                })
                    .then(users => users.map(value => value.blood_type_id).filter((id) => id !== null)),
            },
        },
        orderBy: {
            urgency: 'asc',
        },
    });
};
exports.orderNotifications = orderNotifications;
