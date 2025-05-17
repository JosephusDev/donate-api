"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDonates = void 0;
const User_1 = require("../models/User");
const getDonates = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            const response = await (0, User_1.getDonate)(id);
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: 'Este usuário não existe.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.getDonates = getDonates;
