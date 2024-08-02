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
exports.getAnalytics = exports.getHistory = exports.getPeopleInside = exports.registerExit = exports.registerEntry = void 0;
const Event_1 = __importDefault(require("../models/Event"));
const registerEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { personId, gate } = req.body;
    const event = new Event_1.default({ personId, gate, type: 'entry' });
    yield event.save();
    res.status(201).send(event);
});
exports.registerEntry = registerEntry;
const registerExit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { personId, gate } = req.body;
    const event = new Event_1.default({ personId, gate, type: 'exit' });
    yield event.save();
    res.status(201).send(event);
});
exports.registerExit = registerExit;
const getPeopleInside = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entries = yield Event_1.default.find({ type: 'entry' });
    const exits = yield Event_1.default.find({ type: 'exit' });
    const peopleInside = entries.filter(entry => !exits.some(exit => exit.personId === entry.personId && exit.timestamp > entry.timestamp)).map(entry => entry.personId);
    res.send(peopleInside);
});
exports.getPeopleInside = getPeopleInside;
const getHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { personId, startDate, endDate } = req.query;
    const history = yield Event_1.default.find({
        personId,
        timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });
    res.send(history);
});
exports.getHistory = getHistory;
const getAnalytics = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entries = yield Event_1.default.find({ type: 'entry' });
    const exits = yield Event_1.default.find({ type: 'exit' });
    const peopleInside = entries.filter(entry => !exits.some(exit => exit.personId === entry.personId && exit.timestamp > entry.timestamp)).map(entry => entry.personId).length;
    const averageDuration = entries.reduce((acc, entry) => {
        const exit = exits.find(exit => exit.personId === entry.personId && exit.timestamp > entry.timestamp);
        if (exit) {
            acc += (new Date(exit.timestamp).getTime() - new Date(entry.timestamp).getTime());
        }
        return acc;
    }, 0) / entries.length / 1000 / 60; // in minutes
    const peakEntryTimes = entries.map(entry => entry.timestamp.getHours()).reduce((acc, hour) => {
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
    }, {});
    const peakExitTimes = exits.map(exit => exit.timestamp.getHours()).reduce((acc, hour) => {
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
    }, {});
    const entryGates = entries.map(entry => entry.gate).reduce((acc, gate) => {
        acc[gate] = (acc[gate] || 0) + 1;
        return acc;
    }, {});
    const exitGates = exits.map(exit => exit.gate).reduce((acc, gate) => {
        acc[gate] = (acc[gate] || 0) + 1;
        return acc;
    }, {});
    res.send({
        peopleInside,
        averageDuration,
        peakEntryTimes,
        peakExitTimes,
        entryGates,
        exitGates
    });
});
exports.getAnalytics = getAnalytics;
