"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const donate_1 = __importDefault(require("./routes/donate"));
const chat_1 = __importDefault(require("./routes/chat"));
const Authentication_1 = require("./middleware/Authentication");
const User_1 = __importDefault(require("./routes/User"));
const Order_1 = __importDefault(require("./routes/Order"));
const blood_type_1 = __importDefault(require("./routes/blood_type"));
const app = (0, express_1.default)();
// Configuração básica
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Rotas públicas
app.use('/user', User_1.default);
// Rotas privadas
app.use('/order', Authentication_1.authenticateToken, Order_1.default);
app.use('/bloodtypes', Authentication_1.authenticateToken, blood_type_1.default);
app.use('/donates', Authentication_1.authenticateToken, donate_1.default);
app.use('/chat', Authentication_1.authenticateToken, chat_1.default);
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
try {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
}
