const express = require('express'); // importuje server
const app = express();  // uruchomienie servera
const cors = require('cors'); // importuje server
const path = require('path');


// import routes
const testimonialsRoutes = require('./routes/testimonial.routes');
const concertRoutes = require('./routes/concert.routes');
const seatRoutes = require('./routes/seat.routes');
app.use(express.static(path.join(__dirname, '/client/build')));


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
});

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});
