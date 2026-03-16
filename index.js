import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import './connect.js';

import favoritesRoutes from './routes/favorites.js';
import pokemonsRoutes from './routes/pokemons.js';
import authRoutes from './routes/auth.js';
import statsRoutes from './routes/stats.js';
import teamsRoutes from './routes/teams.js';

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Fichiers statiques (images)
app.use('/assets', express.static('assets'));

// Route de test
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Routes Auth
app.use('/api/auth', authRoutes);

// Routes Pokémons
app.use('/api/pokemons', pokemonsRoutes);

// Routes Favoris
app.use('/api/favorites', favoritesRoutes);

// Routes Stats
app.use('/api/stats', statsRoutes);

// Routes Teams
app.use('/api/teams', teamsRoutes);

// Lancement du serveur
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});