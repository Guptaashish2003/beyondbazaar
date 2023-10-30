import Product from "../model/Product.js";
import User from "../model/User.js";
// import Category from "../model/Category";
// import SubCategory from "../model/SubCategory";
import ConnectDB from "../DATABASE/ConnectDB.js";
// import product from "../../Data/product.json";
// import user from "../../Data/user.json";
import fs from 'fs'; 
  
// Use fs.readFile() method to read the file 
fs.readFile('../../Data/product.json', 'utf8', function(err, data){ 
      
    // Display the file content 
    console.log(data); 
}); 

// const seedproducts = async () => {
//     await ConnectDB();
//     try {
//         await User.deleteMany();
//         await Product.deleteMany();
//         // await Category.deleteMany();
//         // await SubCategory.deleteMany();
//         console.log("all Data deleted...")
//         await User.insertMany(user)
//         await Product.insertMany(product)
//         // await Category.insertMany(category)
//         // await SubCategory.insertMany(subCategory)
//         console.log("🟢 Data Inserted 🟢");
//         process.exit()
        
//     } catch (error) {
//         console.log(error.message)
//         process.exit();
        
//     }
  
// }

// seedproducts()