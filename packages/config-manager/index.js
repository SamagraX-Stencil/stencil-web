const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get('/configs/:id', async (req, res) => {
  const { id } = req.params;
  const config = await prisma.config.findUnique({
    where: { id: parseInt(id) },
    include: { history: true }
  });
  res.json(config);
});

app.post('/configs', async (req, res) => {
  const { name, data } = req.body;
  const newConfig = await prisma.config.create({
    data: {
      name,
      data,
      history: { create: { data } }
    },
    include: { history: true }
  });
  res.json(newConfig);
});

app.put('/configs/:id', async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updatedConfig = await prisma.config.update({
    where: { id: parseInt(id) },
    data: {
      data,
      history: { create: { data } } 
    },
    include: { history: true }
  });
  res.json(updatedConfig);
});

app.get('/configs/:id/history', async (req, res) => {
  const { id } = req.params;
  const history = await prisma.configHistory.findMany({
    where: { configId: parseInt(id) },
    orderBy: { timestamp: 'desc' }
  });
  res.json(history);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
