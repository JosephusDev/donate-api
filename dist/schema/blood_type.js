"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloodTypeSchema = void 0;
const zod_1 = require("zod");
exports.BloodTypeSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
});
