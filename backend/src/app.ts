import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'; // Import CORS
import eventRoutes from './routes/eventRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Use CORS
app.use(bodyParser.json());

const mongoUri = 'mongodb://localhost:27017/buildingEntrySystem';

mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use('/api', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
