"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBloodType = void 0;
const blood_type_1 = require("../models/blood_type");
const getBloodType = async (req, res) => {
    try {
        const response = await (0, blood_type_1.Select)();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.getBloodType = getBloodType;
