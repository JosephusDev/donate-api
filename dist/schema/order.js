"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const zod_1 = require("zod");
exports.OrderSchema = zod_1.z.object({
    donate_location: zod_1.z.string(),
    urgency: zod_1.z.enum(['normal', 'media', 'alta']),
    description: zod_1.z.string(),
    state: zod_1.z.enum(['pendente', 'concluído', 'cancelado']),
    user_id: zod_1.z.number(),
    blood_type_id: zod_1.z.number()
});
