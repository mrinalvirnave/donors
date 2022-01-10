const restify = require('restify'); //loads restify
const mongoose = require('mongoose'); //loads mongoose
const config = require('./config'); //loads our configuration file
const rjwt = require('restify-jwt-community');  //loads 
const corsMiddleware = require('restify-cors-middleware2'); // cors middleware
const server = restify.createServer();
const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['Authorization']
  })

//Middleware
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser());

//Protected Routes
server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/api/auth', '/auth/register', '/api/donors/','/api/donors:id'] }));
server.listen(config.PORT, () => {
    // mongoose.set('useFindAndModify', false)
    mongoose.connect(
        config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,   
    }
    );
});

const database = mongoose.connection;
database.on('error', (err) => {
    console.log(err)
})

database.once('open', () => {
    require('./routes/donors')(server)
    require('./routes/users')(server)
    console.log(`Server running on Port: ${config.PORT}`);
})
