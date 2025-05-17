"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSchema = void 0;
const zod_1 = require("zod");
exports.EmailSchema = zod_1.z.object({
    fullname: zod_1.z.string(),
    donate: zod_1.z.string(),
    description: zod_1.z.string(),
    donate_mail: zod_1.z.string().email(),
    owner_mail: zod_1.z.string().email(),
    donate_location: zod_1.z.string(),
});
