const errors = require('restify-errors')

const Donor = require('../models/Donor');
module.exports = server => {
    // Fetch All Donors 
    server.get('/api/donors', async (req, res, next) => {
        try {
            const donors = await Donor.find(req.query)
            res.send(donors);
            next();
        } catch (error) {
            return next(new errors.InvalidContentError(error))
        }

    });

    // Add a new Donor to list 
    server.post('/api/donors', async (req, res, next) => {
        // Check if what is being passed is in JSON
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("This API expects: 'application/json'"))
        }
        const { name, email, phone, pledge } = req.body;
        const donor = new Donor({
            name,
            email,
            phone,
            pledge


        });

        try {
            const newDonor = await donor.save()
            res.send(201)
            next();

        } catch (error) {
            return next(new errors.InternalError(error.message))
        }
    });

    //Fetch a Single Donor 
    server.get('/api/donors/:id', async (req, res, next) => {
        try {
            const donor = await Donor.findById(req.params.id)
            res.send(donor);
            next();
        } catch (error) {
            return next(new errors.NotFoundError(`Hi, there seems to be no donor with ID of: ${req.params.id}`))
        }

    });


    // Update The Details of an Exising Donor
    server.put('/api/donors/:id', async (req, res, next) => {
        // Check if what is being passed is in JSON
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("This API expects: 'application/json'"))
        }

        try {
            const donor = await Donor.findOneAndUpdate({ _id: req.params.id }, req.body)
            res.send(200)
            next();

        } catch (error) {
            return next(new errors.NotFoundError(`Hi, there seems to be no donor with ID of: ${req.params.id}`))
        }
    });
    //Delete an Already Existing Donor

    server.del('/api/donors/:id', async (req, res, next) => {
        try {
            const donor = await Donor.findOneAndRemove({ _id: req.params.id })
            res.send(204);
            next()
        } catch (error) {
            return next(new errors.NotFoundError(`Hi, there seems to be no donor with ID of: ${req.params.id}`))
        }
    })

}
