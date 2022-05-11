// import * as mongoose from 'mongoose';
import app from './app';

// SERVER DATABASE
// const mongoUri: string = ''/* process.env.MAIN_DB_URL */;
//
// const connectOptions: mongoose.ConnectOptions = {
// };
//
// mongoose.connect(
//   mongoUri,
//   connectOptions,
// ).then(() => {
//   console.log('Database connection sucessfull');
// }).catch((err: Error) => {
//   console.error(err.message);
// });

// SERVER PORT
const port: number = Number(process.env.PORT) || 5000;

export default app.listen(port, () => {
  console.log(`Server up and connected to port ${port}`);
});
