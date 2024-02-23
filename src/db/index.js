import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const ConnectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`Error:`, error);
    process.exit(1); // Read about this process and exit,
  }
};
export default ConnectDb;
