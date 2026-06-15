const Contact = require("../models/Contact");

const saveContact = async (req, res) => {

    try {

        const { name, email, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: "Message Sent Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

module.exports = {
    saveContact
};