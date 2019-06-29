import express from 'express';

const app = express();

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => res.status(200).json({ success: 'Welcome To Fast Food Fast' }));

if (!module.parent) { app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); }// eslint-disable-line no-console

export default app;
