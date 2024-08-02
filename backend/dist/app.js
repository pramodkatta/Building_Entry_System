"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors")); // Import CORS
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const app = (0, express_1.default)();
exports.app = app;
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)()); // Use CORS
app.use(body_parser_1.default.json());
const mongoUri = 'mongodb://localhost:27017/buildingEntrySystem';
mongoose_1.default.connect(mongoUri).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
app.use('/api', eventRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
