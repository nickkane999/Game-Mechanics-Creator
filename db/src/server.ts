import express from 'express';
import cors from 'cors';
import { testConnection, createDatabase } from './config/database';
import { schemaRoutes } from './routes/schema';
import { mechanicsRoutes } from './routes/mechanics';

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/schema', schemaRoutes);
app.use('/api/mechanics', mechanicsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Game Mechanics Creator API is running',
    timestamp: new Date().toISOString()
  });
});

async function startServer(): Promise<void> {
  try {
    console.log('🚀 Starting Game Mechanics Creator Server...');
    
    await createDatabase();
    const isConnected = await testConnection();
    
    if (!isConnected) {
      throw new Error('Failed to connect to MySQL database');
    }
    
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
      console.log(`🎮 Game Mechanics API: http://localhost:${PORT}/api/mechanics`);
    });
    
  } catch (error) {
    console.error('❌ Server startup failed:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

startServer(); 