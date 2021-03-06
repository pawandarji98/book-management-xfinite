const mongoose = require('mongoose');

// Catching Uncaught Exception Error
process.on('unCaughtException', err => {
    console.log('Caught Exception');
    console.log(err.name, err.message);
    process.exit(1);
})
const app = require('./app');
const db = 'mongodb+srv://pawandarji98:pawan773384@cluster0.pvxtu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('connected to server!');
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT , () => {
    console.log(`App listening on port ${PORT}`)
});

// Error handler for bad request
process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection ! Shutting down.........');
    console.log( err.message);
    server.close( () => {
        process.exit(1);
    });
});