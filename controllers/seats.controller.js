const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find({}));
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.getById = async (req, res) => {
    try {
        const dep = await Seat.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.post = async (req, res) => {
    try {
        const { day, seat, client, email } = req.body;
        const newSeat = new Seat({
            day,
            seat,
            client,
            email
        });
        await newSeat.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.put = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try {
        const dep = Seat.findById(req.params.id);
        if (dep) {
            const updatedDep = await Seat.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { day, seat, client, email } },
                { new: true }
            );
            if (updatedDep) {
                res.json({ updatedSeat: updatedDep });
            } else {
                res.status(500).json({ message: 'Error updating Seat...' });
            }
        } else {
            res.status(404).json({ message: 'Not found...' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.delete = async (req, res) => {
    try {
        const dep = Seat.findById(req.params.id);
        if (dep) {
            const deletedDep = await Seat.findOneAndDelete({
                _id: req.params.id,
            });
            res.json({ deletedSeat: deletedDep });
        } else {
            res.status(404).json({ message: 'Not found...' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};