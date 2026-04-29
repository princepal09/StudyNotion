const Contact = require('../models/Contact')


exports.contactController = async (req, res) => {
    try {
        const { firstname, lastname, email, countrycode, phoneNo, message } = req.body
        if (!firstname || !lastname || !email || !countrycode || !phoneNo || !message) {
            return res.status(403).json({
                success: false,
                message: "All fields are mandaatory"
            })
        }

        await Contact.create({ firstname, lastname, email, countrycode, phoneNo, message })

        return res.status(201).json({
            success: true,
            message: "Contact Form Submitted Successfully!"
        })


    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            status: false,
            message: "Error, Something went wrong!!"
        })
    }
}