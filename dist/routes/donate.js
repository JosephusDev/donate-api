"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Donate_1 = require("../controllers/Donate");
const router = (0, express_1.Router)();
router.get('/:id', Donate_1.getDonates);
exports.default = router;
