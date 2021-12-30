import mongoose from 'mongoose';

const mongoConnect = () => {
    mongoose.connect(`mongodb+srv://agano:agano@cluster0.034m7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    mongoose.connection
        .once('open', () => console.log('Database Connected :-)'))
        .on('error', (error) => {
            console.log('Error ', error);
        });
}

export default mongoConnect;
