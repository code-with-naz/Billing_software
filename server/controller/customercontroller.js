const Customer = require('../model/customer');

exports.addCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);  
    } catch (error) {
        res.status(400).json({ message: 'Error adding customer', error: error.message });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers); 
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error: error.message });
    }
};
