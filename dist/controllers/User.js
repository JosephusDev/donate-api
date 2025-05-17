"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.update = exports.create = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const user_1 = require("../schema/user");
const zod_1 = require("zod");
const library_1 = require("@prisma/client/runtime/library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const create = async (req, res) => {
    try {
        const data = user_1.UserSchema.parse(req.body);
        const passwordHash = bcrypt_1.default.hashSync(data.password, 10);
        data.password = passwordHash;
        const user = await (0, User_1.createUser)(data);
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
exports.create = create;
const update = async (req, res) => {
    try {
        const data = user_1.UserSchema.parse(req.body);
        if (data.password) {
            const passwordHash = bcrypt_1.default.hashSync(data.password, 10);
            data.password = passwordHash;
        }
        console.log(req.params.id);
        const user = await (0, User_1.updateUser)(data, Number(req.params.id));
        res.status(200).json(user);
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
const login = async (req, res) => {
    try {
        const { username, password } = user_1.UserSchema.partial().parse(req.body);
        if (username && password) {
            const users = await (0, User_1.Login)({ username });
            if (users.length == 0) {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
            else {
                users.forEach(user => {
                    const passwordHashed = bcrypt_1.default.compareSync(password, user.password);
                    if (passwordHashed) {
                        if (!process.env.JWT_SECRET) {
                            res.status(400).json({ message: 'JWT Secret key is missing.' });
                            return;
                        }
                        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
                            expiresIn: '24h',
                        });
                        res.status(200).json({ user, token });
                    }
                    else {
                        res.status(404).json({ error: 'Palavra-passe incorrecta' });
                    }
                });
            }
        }
        else {
            res.status(400).json({ error: 'Usuário e Senha são Obrigatórios' });
        }
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ error: error.errors[0] });
        }
        else if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
        else {
            res.status(500).json({ error: error });
        }
    }
};
exports.login = login;
