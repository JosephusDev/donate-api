"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blood_type_1 = require("../controllers/blood_type");
const router = (0, express_1.Router)();
router.get('/', blood_type_1.getBloodType);
exports.default = router;
