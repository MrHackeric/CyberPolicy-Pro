import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//local mongo connection
// const LOCALURL = process.env.MONGO_LOCAL_URL;

// export const connectDBLocal = async () => {
//   try {
//     const conn = await mongoose.connect(LOCALURL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// online connection
const ONLINEURL = process.env.MONGO_ONLINE_URL;

export const connectDBOnline = async () => {
  try {
    const conn = await mongoose.connect(ONLINEURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
