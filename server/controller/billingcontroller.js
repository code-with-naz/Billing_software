const Billing = require('../model/billing');

// Get all billings
exports.getAllBillings = async (req, res) => {
    try {
        const billings = await Billing.find().populate('customer').populate('products.product');
        res.json(billings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new billing
exports.createBilling = async (req, res) => {
    const { customer, products } = req.body;
    const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    const billing = new Billing({ customer, products, total });
    
    try {
        const savedBilling = await billing.save();
        res.status(201).json({ message: 'Billing added successfully!', billing: savedBilling });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a billing
exports.deleteBilling = async (req, res) => {
    try {
        const deletedBilling = await Billing.findByIdAndDelete(req.params.id);
        if (!deletedBilling) {
            return res.status(404).json({ message: 'Billing not found' });
        }
        res.json({ message: 'Billing deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
