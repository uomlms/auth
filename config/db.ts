const mongoose = require("mongoose");

const connectDB = async () => {
  const cοnn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected: ${cοnn.connection.host}`);
};

export { connectDB as connectDB }