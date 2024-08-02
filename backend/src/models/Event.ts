import { Schema, model } from 'mongoose';

interface IEvent {
  personId: string;
  timestamp: Date;
  gate: string;
  type: 'entry' | 'exit';
}

const eventSchema = new Schema<IEvent>({
  personId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  gate: { type: String, required: true },
  type: { type: String, enum: ['entry', 'exit'], required: true }
});

const Event = model<IEvent>('Event', eventSchema);

export default Event;
