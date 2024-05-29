import Category from "../Model/CategoryModel.js";
import Product from "../Model/ProductModel.js";
import SubCategory from "../Model/SubCategoryModel.js";
import User from "../Model/userModel.js";
import bcrypt from "bcrypt";
import saveToCloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import Wishlist from "../Model/WishlistModel.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      res.status(401).json({ message: "enter credentials" });
    } else {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(401).json({ message: "Email already exist" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
        });
        await newUser.save();

        res.status(200).json({
          message: "User saved successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json("Invalid credentials");
    }
    const userFound = await User.findOne({ email });
    if (userFound) {
      const hashedPassword = userFound.password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);
      if (passwordMatch) {
        const token = jwt.sign(
          { userId: userFound._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          }
        );
        res.status(201).json({ message: "Logined successfully", token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "email not found . Please signup" });
    }
  } catch (error) {
    res.status(401).json({ message: "login failed" });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      res.status(401).json("enter category");
    }
    const existingCategory = await Category.findOne({ category });
    if (existingCategory) {
      res.status(401).json(" category already exist");
    } else {
      const newCategory = new Category({
        category,
      });
      await newCategory.save();
      res.status(200).json({ message: "Category added" });
    }
  } catch (error) {
    res.status(401).json({ message: "error" });
  }
};

export const showCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(401).json({ message: "Error fetching categories" });
  }
};

export const addSubCategory = async (req, res) => {
  try {
    const { selectedCategory, subCategory } = req.body;
    const existingSubCategory = await SubCategory.findOne({ subCategory });
    if (existingSubCategory) {
      res.status(401).json({message:"sub category already exist"});
    } else {
      const newSubCategory = new SubCategory({
        categoryId: selectedCategory,
        subCategory,
      });

      await newSubCategory.save();
      res.status(200).json({ message: " sub Category added" });
    }
  } catch (error) {
    res.status(401).json({ message: "Error creating sub categories" });
  }
};

export const showSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find({});
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(401).json({ message: "Error fetching categories" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { productName, variants, subCategory, description ,images} =  req.body;
    const existingProduct = await Product.findOne({ productName });
    if (existingProduct) {
      res.status(401).json({ message: "product already exist" });
    } else {
     
      const newProduct = new Product({
        productName,
        subCategory,
        description,
        variants,
        images,
      });
      await newProduct.save();
      res.status(200).json({ message: "Product added" });
    }
  } catch (error) {
    res.status(401).json({ message: "Error creating products categories" });
  }
};

export const displayProduct = async (req, res) => {
  try {
    const search = req.query.search;
    const page = req.query.page;

     let limit = 4;
    let skip = (page - 1) * limit; 
    const totalProduct = await Product.find({}).countDocuments();
    let totalPages = Math.floor(totalProduct / limit);

    const selectedCategory = req.query.categoryArray;
    const categoryArray = selectedCategory.split(',');
let all;
if(categoryArray[0] == ''){
  all = await Product.find({
    productName: { $regex: "^" + search, $options: "i" },
  }).skip(skip).limit(limit)
}else{
  all = await Product.find({ subCategory: { $in: categoryArray} , 
    productName: { $regex: "^" + search, $options: "i" },
  }).skip(skip).limit(limit)
}
    res.status(200).json({all,totalPages})
  } catch (error) {
    res.status(401).json({ message: "error" });
  }
};

export const singleProduct =async(req,res)=>{
  try {
    const id = req.query.id
    const product = await Product.findById(id)
    res.status(201).json({product})
  } catch (error) {
    res.status(401).json({ message: "error" });
    
  }
}


export const categoriesToFilter = async(req,res)=>{
  try {
    
    const data = await SubCategory.aggregate([
      {
        $lookup: {
          from: 'categories', 
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $group: {
            _id: '$category.category', 
            subCategories: {
              $push: {
                subCategory: '$subCategory',
                _id:'$_id'
              },
            },
        },
    }
      
    ])
    res.status(201).json({data})
  } catch (error) {
    console.log(error)
  }
}


export const addToWishlist = async (req, res) => {
  try {
    let userId ;
    const token = req.headers.token;
    if (token) {
    console.log(token)
    const decoded = jwt.verify(token, 'jwt123');
    console.log(decoded)
    userId = decoded.userId;
    }
    console.log('uhsd',userId)
    const productId = req.query.productId;
    const newWishlist = new Wishlist({
      userId,
      productId,
    });
    await newWishlist.save();
    res.status(201).json({ message: "Added to wishlist" });
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "somethimg  error" });
  }
};

export const showWishlist = async (req, res) => {
  try {
    let userId;
    const token = req.headers.token;
    if (token) {
      const decoded = jwt.verify(token,'jwt123');
      userId = decoded.userId;
    }

    const showItems = await Wishlist.find({ userId }).populate("productId");
    console.log(showItems);
    res.status(201).json({showItems}) ;
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "somethimg  error" });
  }
};

export const uploadImage = async (req,res)=>{
  try {
    const imageLink = await saveToCloudinary(req.file)
    res.status(200).json({imageLink})
  } catch (error) {
    console.log(error);
  }
}

export const removeFromWishlist = async(req,res)=>{
  try {
    let userId;
    const token = req.headers.token;
    if (token) {
      const decoded = jwt.verify(token,'jwt123');
      userId = decoded.userId;
    }
    const id = req.query.id
    const removeItem = await Wishlist.deleteOne({_id:id})
    console.log(removeItem)
    res.status(200).json({message:"removed from wishlisyt"})
  } catch (error) {
    console.log(error)
  }
}
export const logout = async (req, res) => {
  try {
    res.cookie("userJWT", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
