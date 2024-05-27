import Category from "../Model/CategoryModel.js";
import SubCategory from "../Model/SubCategoryModel.js";
import User from "../Model/userModel.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    if (!mobile && !password) {
      res.status(401).json({ message: "enter credentials" });
    } else {
      const existingUser = await User.findOne({ mobile });
      if (existingUser) {
        res.status(401).json({ message: "Phone number already exist" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          mobile,
          password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({
          message: "User saved successfully",
          token: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const SignIn = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    if (!mobile || !password) {
      res.status(401).json("Invalid credentials");
    }
    const userFound = await User.findOne({ mobile });
    if (userFound) {
      const hashedPassword = userFound.password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);
      if (passwordMatch) {
        res.status(201).json({ message: "Logined successfully", token: true });
      }
    } else {
      res.status(401).json({ message: "Mobile not found . Please signup" });
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
        console.log(categories);
        res.status(200).json(categories.map(cat => cat.category.trim()));
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Error fetching categories" });
    }
};

export const addSubCategory = async (req,res) =>{
    try {
        const {category,subCategory} = req.body
        const existingSubCategory = await SubCategory.findOne({subCategory})
        if(existingSubCategory){
      res.status(401).json(" sub category already exist");
        }else{
            const newSubCategory = new SubCategory({
                categoryId:category,
                subCategory
            })

            await newSubCategory.save()
            res.status(200).json({ message: " sub Category added" });
            
        }
    } catch (error) {
        res.status(401).json({ message: "Error creating sub categories" });
        
    }
}


export const showSubCategories = async (req, res) => {
    try {
        const subcategories = await SubCategory.find({});
        console.log(subcategories);
        res.status(200).json(subcategories.map(cat => cat.subCategory.trim()));
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Error fetching categories" });
    }
};