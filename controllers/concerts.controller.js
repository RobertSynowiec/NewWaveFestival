const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find({}));
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.getById = async (req, res) => {
    try {
        const dep = await Concert.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.post = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({
            performer,
            genre,
            price,
            day,
            image
        });
        await newConcert.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.put = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const dep = Concert.findById(req.params.id);
        if (dep) {
            const updatedDep = await Concert.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { performer, genre, price, day, image } },
                { new: true }
            );
            if (updatedDep) {
                res.json({ updatedConcert: updatedDep });
            } else {
                res.status(500).json({ message: 'Error updating Concert...' });
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
        const dep = Concert.findById(req.params.id);
        if (dep) {
            const deletedDep = await Concert.findOneAndDelete({
                _id: req.params.id,
            });
            res.json({ deletedConcert: deletedDep });
        } else {
            res.status(404).json({ message: 'Not found...' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};