"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../controllers/User");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
});
router.post('/', User_1.create);
router.post('/login', User_1.login);
router.put('/update/:id', User_1.update);
exports.default = router;
