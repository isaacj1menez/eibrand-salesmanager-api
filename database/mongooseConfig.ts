import mongoose from 'mongoose';

const connectDataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
    } catch (error: any) {
        console.error(`Error: ${ error.message }`);
    }
};

export default connectDataBase;
