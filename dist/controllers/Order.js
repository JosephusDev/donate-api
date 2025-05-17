"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderNotifications = exports.deleteAnOrder = exports.update = exports.getUserOrders = exports.getOrders = exports.create = void 0;
const zod_1 = require("zod");
const order_1 = require("../schema/order");
const Order_1 = require("../models/Order");
const sendSMS_1 = require("../services/sendSMS");
const create = async (req, res) => {
    try {
        const data = order_1.OrderSchema.parse(req.body);
        const order = await (0, Order_1.Create)(data);
        if (order)
            (0, sendSMS_1.sendSMS)(order);
        res.status(201).json(order);
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
exports.create = create;
const getOrders = async (req, res) => {
    try {
        const orders = await (0, Order_1.Select)();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.getOrders = getOrders;
const getUserOrders = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const orders = await (0, Order_1.userOrders)(id);
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.getUserOrders = getUserOrders;
const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = order_1.OrderSchema.partial().parse(req.body);
        await (0, Order_1.Update)(id, data);
        res.status(206).json({ message: 'Atualizado com sucesso.' });
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
exports.update = update;
const deleteAnOrder = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await (0, Order_1.Delete)(id);
        res.status(206).json({ message: 'Eliminado com sucesso.' });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.deleteAnOrder = deleteAnOrder;
const getOrderNotifications = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            const orders = await (0, Order_1.orderNotifications)(id); // Corrigindo a chamada da função
            res.status(200).json(orders);
        }
        else {
            res.status(404).json({ error: 'Este usuário não existe.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.getOrderNotifications = getOrderNotifications;
