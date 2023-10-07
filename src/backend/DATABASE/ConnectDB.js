import mongoose from "mongoose"

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// connecting to database
const ConnectDB = async () => {
  mongoose.connect(process.env.DB_URI).then(() => {
  console.log("database connected")}).catch((err) => {
  console.log("error while connecting to database",err)
})
}

export default ConnectDB
