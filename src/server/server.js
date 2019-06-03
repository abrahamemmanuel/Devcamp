import express from 'express';
import path from 'path';
import ejs from 'ejs';

// Create server
const app = express();

// Set static folder
app.use(express.static('public'));
app.use('/css', express.static('public'))

// Set View Engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Set server to listen to port
const PORT = process.env.PORT || 5000;

// Get Landing page
app.get('/', (req, res) => res.status(200).render('landingpage'));
if (!module.parent) { app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); }// eslint-disable-line no-console

export default app;
