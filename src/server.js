import express from 'express';
import path from 'path';
import ejs from 'ejs';

const app = express();

app.use(express.static('public'));
app.use('/css', express.static('public'))

//Set View Engine
app.set('views', './views');
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => res.status(200).render('landingpage'));
if (!module.parent) { app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); }// eslint-disable-line no-console

export default app;
