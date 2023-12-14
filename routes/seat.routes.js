const Joi = require('joi');
const express = require('express');
const router = express.Router();
const db = require('../db');
const validateInput = require('../validateInput');
const isSeatOccupied = require('../isSeatOccupied');


const seatSchema = Joi.object({
    day: Joi.number().required(),
    seat: Joi.number().required(),
    client: Joi.string().required(),
    email: Joi.string().email().required(),

});

router.get('/seats',
    //validateInput(seatSchema),
    (req, res) => {
        res.json(db.seats);
    });

router.get('/seats/:id',
    //validateInput(seatSchema),
    (req, res) => {

        const seatId = parseInt(req.params.id, 10);
        const seat = db.seats.find(item => item.id === seatId);

        res.json(seat);
    });

router.post('/seats',
    //validateInput(seatSchema),
    (req, res) => {
        const { day, seat, client, email } = req.body;

        const isSeatOccupiedResult = db.seats.some(
            item => item.day === day && item.seat === seat
        );

        if (isSeatOccupiedResult) {
            return res.json({ message: "The slot is already taken..." });
        }

        const newSeat = {
            id: db.seats.length > 0 ? Math.max(...db.seats.map(item => item.id)) + 1 : 1,
            day,
            seat,
            client,
            email,
        };
        db.seats.push(newSeat);
        res.status(201).json({ message: 'OK' });
    });

module.exports = router;