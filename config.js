module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 5000,
    URL: process.env.BASE_URL || 'http://localhost:5000',
    MONGODB_URI: 'mongodb://root:example@localhost:27017/?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey'
}