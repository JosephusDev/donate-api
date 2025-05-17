"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    email: zod_1.z.string().email('O e-mail deve ser válido'),
    username: zod_1.z
        .string({
        message: 'O nome de usuário é obrigatório',
    })
        .min(3, 'O Nome de usuário deve ter no mínimo 3 caracteres')
        .trim()
        .toLowerCase(),
    password: zod_1.z
        .string({
        message: 'A senha de usuário é obrigatória',
    })
        .min(4, 'A senha deve ter pelo menos 4 caracteres')
        .trim(),
    fullname: zod_1.z.string().min(3, 'O Nome deve ter no mínimo 3 caracteres').trim(),
    gender: zod_1.z.enum(['masculino', 'femenino', 'outro']),
    state: zod_1.z.boolean(),
    user_type: zod_1.z.enum(['individual', 'hospital']),
    address: zod_1.z.string().trim().nullable(),
    phone: zod_1.z.string().length(9, 'O número de telefone deve ter 9 dígitos').trim().nullable(),
    description: zod_1.z.string().trim().nullable(),
    blood_type_id: zod_1.z.number().nullable(),
});
