const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find({}));
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.getById = async (req, res) => {
    try {
        const dep = await Testimonial.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.post = async (req, res) => {
    try {
        const { author, text } = req.body;
        const newTestimonial = new Testimonial({ author, text });
        await newTestimonial.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.put = async (req, res) => {
    const { author, text } = req.body;
    try {
        const dep = Testimonial.findById(req.params.id);
        if (dep) {
            const updatedDep = await Testimonial.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { author, text } },
                { new: true }
            );
            if (updatedDep) {
                res.json({ updatedTestimonial: updatedDep });
            } else {
                res.status(500).json({ message: 'Error updating Testimonial...' });
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
        const dep = Testimonial.findById(req.params.id);
        if (dep) {
            const deletedDep = await Testimonial.findOneAndDelete({
                _id: req.params.id,
            });
            res.json({ deletedTestimonial: deletedDep });
        } else {
            res.status(404).json({ message: 'Not found...' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};