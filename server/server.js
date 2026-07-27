import express from 'express';
import cors from 'cors';

const app = express();
const port = Number(process.env.PORT) || 3002;

app.use(cors());
app.use(express.json());

const createProductImage = (label, background, accent) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
      <rect width="900" height="1200" fill="${background}" />
      <rect x="50" y="50" width="800" height="1100" rx="36" fill="rgba(255,255,255,0.12)" />
      <text x="450" y="540" text-anchor="middle" fill="white" font-family="Arial, Helvetica, sans-serif" font-size="62">${label}</text>
      <text x="450" y="640" text-anchor="middle" fill="${accent}" font-family="Arial, Helvetica, sans-serif" font-size="34">StudioThread</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const products = [
  {
    id: 1,
    name: 'Classic Denim Jacket',
    price: 79,
    category: 'Outerwear',
    image: createProductImage('Classic Denim Jacket', '#4a6274', '#d9e2ea'),
    description: 'A timeless jacket that pairs well with everyday looks.'
  },
  {
    id: 2,
    name: 'Urban Oversized Tee',
    price: 34,
    category: 'Tops',
    image: createProductImage('Urban Oversized Tee', '#7b5a4c', '#f7e7de'),
    description: 'Soft cotton, easy fit, and ideal for layering.'
  },
  {
    id: 3,
    name: 'Tailored Black Trouser',
    price: 56,
    category: 'Bottoms',
    image: createProductImage('Tailored Black Trouser', '#222222', '#f5f5f5'),
    description: 'Sharp yet comfortable for all-day wear.'
  },
  {
    id: 4,
    name: 'Everyday Knit Set',
    price: 68,
    category: 'Sets',
    image: createProductImage('Everyday Knit Set', '#7b6e5f', '#efe5d7'),
    description: 'Easy styling with a premium-feel fabric blend.'
  }
];

app.get('/api/products', (_req, res) => {
  res.json({ products });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'clothes-store-api' });
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
