"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSchema = void 0;
const zod_1 = require("zod");
exports.ChatSchema = zod_1.z.object({
    user_id_from: zod_1.z.number({
        message: 'O ID do usuário de origem é obrigatório.',
    }),
    user_id_to: zod_1.z.number({
        message: 'O ID do usuário de destino é obrigatório.',
    }),
    message: zod_1.z
        .string({
        message: 'A mensagem é obrigatória.',
    })
        .min(1),
});
