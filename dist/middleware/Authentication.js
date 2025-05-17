"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    // Your authentication logic here
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Acesso negado' });
        return;
    }
    if (!process.env.JWT_SECRET) {
        res.status(400).json({ message: 'JWT Secret key is missing' });
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err)
                return res.status(403).json({ message: 'Token inválido' });
            next();
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
exports.authenticateToken = authenticateToken;
