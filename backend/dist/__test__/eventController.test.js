"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const mongoose_1 = __importDefault(require("mongoose"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect('mongodb://localhost:27017/buildingEntrySystemTest');
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe('Event Controller', () => {
    it('should register an entry', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post('/api/entry').send({ personId: '1', gate: 'A' });
        expect(res.status).toBe(201);
    }));
    it('should register an exit', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post('/api/exit').send({ personId: '1', gate: 'B' });
        expect(res.status).toBe(201);
    }));
    it('should get people inside', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/api/people');
        expect(res.status).toBe(200);
    }));
    it('should get analytics', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/api/analytics');
        expect(res.status).toBe(200);
    }));
});
