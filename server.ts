import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_mode';

// Mock Databases
const users = [
  {
    id: 'user-1',
    name: 'Aurelien Zankou',
    email: 'aurelien.zankou@example.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'client'
  },
  {
    id: 'admin-1',
    name: 'Admin Thus',
    email: 'admin@thusartisan.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin'
  }
];

const orders = [
  { id: 'ORD-001', userId: 'user-1', products: ['VAS-001'], status: 'Livré', total: 450, date: '2024-03-15' },
  { id: 'ORD-002', userId: 'user-1', products: ['TEX-002'], status: 'En cours', total: 280, date: '2024-04-10' }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Auth API ---
  app.post('/api/auth/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }
    const newUser = {
      id: `user-${users.length + 1}`,
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      role: role === 'artisan' ? 'artisan' : 'client'
    };
    users.push(newUser);
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
  });

  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });

  // --- Protected Stats API ---
  app.get('/api/user/orders', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send();
    try {
      const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET) as any;
      const userOrders = orders.filter(o => o.userId === decoded.id);
      res.json(userOrders);
    } catch {
      res.status(401).send();
    }
  });

  app.get('/api/admin/stats', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send();
    try {
      const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET) as any;
      if (decoded.role !== 'admin') return res.status(403).send();
      res.json({
        totalSales: 12540,
        activeArtisans: 24,
        totalOrders: orders.length,
        recentOrders: orders.slice(-5)
      });
    } catch {
      res.status(401).send();
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server matching heartbeat at http://localhost:${PORT}`);
  });
}

startServer();
