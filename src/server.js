import express from 'express';

const app = express();

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => res.status(200).json({ success: 'Create a developer profile & portfolio, share posts and get help from other developers' }));

if (!module.parent) { app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); }// eslint-disable-line no-console

export default app;
