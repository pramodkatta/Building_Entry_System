import { Request, Response } from 'express';
import Event from '../models/Event';

export const registerEntry = async (req: Request, res: Response) => {
  const { personId, gate } = req.body;
  const event = new Event({ personId, gate, type: 'entry' });
  await event.save();
  res.status(201).send(event);
};

export const registerExit = async (req: Request, res: Response) => {
  const { personId, gate } = req.body;
  const event = new Event({ personId, gate, type: 'exit' });
  await event.save();
  res.status(201).send(event);
};

export const getPeopleInside = async (_req: Request, res: Response) => {
  const entries = await Event.find({ type: 'entry' });
  const exits = await Event.find({ type: 'exit' });
  const peopleInside = entries.filter(entry =>
    !exits.some(exit => exit.personId === entry.personId && exit.timestamp > entry.timestamp)
  ).map(entry => entry.personId);
  res.send(peopleInside);
};

export const getHistory = async (req: Request, res: Response) => {
  const { personId, startDate, endDate } = req.query;
  const history = await Event.find({
    personId,
    timestamp: { $gte: new Date(startDate as string), $lte: new Date(endDate as string) }
  });
  res.send(history);
};

export const getAnalytics = async (_req: Request, res: Response) => {
  const entries = await Event.find({ type: 'entry' });
  const exits = await Event.find({ type: 'exit' });

  const peopleInside = entries.filter(entry =>
    !exits.some(exit => exit.personId === entry.personId && exit.timestamp > entry.timestamp)
  ).map(entry => entry.personId).length;

  const averageDuration = entries.reduce((acc, entry) => {
    const exit = exits.find(exit => exit.personId === entry.personId && exit.timestamp > entry.timestamp);
    if (exit) {
      acc += (new Date(exit.timestamp).getTime() - new Date(entry.timestamp).getTime());
    }
    return acc;
  }, 0) / entries.length / 1000 / 60; // in minutes

  const peakEntryTimes = entries.map(entry => entry.timestamp.getHours()).reduce((acc: { [key: number]: number }, hour) => {
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  const peakExitTimes = exits.map(exit => exit.timestamp.getHours()).reduce((acc: { [key: number]: number }, hour) => {
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  const entryGates = entries.map(entry => entry.gate).reduce((acc: { [key: string]: number }, gate) => {
    acc[gate] = (acc[gate] || 0) + 1;
    return acc;
  }, {});

  const exitGates = exits.map(exit => exit.gate).reduce((acc: { [key: string]: number }, gate) => {
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
};
