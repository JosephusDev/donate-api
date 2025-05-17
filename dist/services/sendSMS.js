"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = void 0;
const User_1 = require("../models/User");
const sendSMS = async (order) => {
    const user = await (0, User_1.getUser)(order.user_id);
    const donates = await (0, User_1.getAvalebleDonate)(order.user_id, order.blood_type_id);
    donates?.map(async (donate) => {
        fetch('https://api.useombala.ao/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.USEOMBALA_API_KEY}`,
            },
            body: JSON.stringify({
                message: `Olá Sr(a). ${donate.fullname}, ${order.description}. Local: ${order.donate_location}. Contacto: ${user.phone}, Atenciosamente: ${user.fullname}`,
                from: 'Plataforma Doe',
                to: donate.email,
            }),
        });
    });
};
exports.sendSMS = sendSMS;
