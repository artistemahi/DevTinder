const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://Mahesh:CfBSVpK8BriJK2rm@ac-zy8dtix-shard-00-00.1limp6o.mongodb.net:27017,ac-zy8dtix-shard-00-01.1limp6o.mongodb.net:27017,ac-zy8dtix-shard-00-02.1limp6o.mongodb.net:27017/?ssl=true&replicaSet=atlas-9dbyba-shard-0&authSource=admin&appName=Cluster0");
};
module.exports = connectDB;
