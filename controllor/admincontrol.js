const  {Admin}  = require("../models/admin");
// const addbookSchema = require("../models/addbook");
const bcrypt = require("bcrypt");

const addbook = require("../models/addbook");

const{ categories }= require('../models/category');

const user = require('../models/user');

// const router =express.Router();




module.exports = {
  getadminhome: (req, res) => {
    try {
      if (req.session.admin) {
         res.redirect("/admin")
      } else {
        res.redirect("/admin/login");
      }
    } catch (error) {
      console.log(error, "=========================-------");
    }
  },
  getlogin: (req, res) => {
    res.render("admin/adminlogin");
  },
  getsignup: (req, res) => {
    res.render("admin/adminsignup");
  },
  postsignup: async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    console.log(email, password, "------------------");
    const admin = new Admin({
      email: email,
      password: password,
    });

    await admin.save().then((result) => {
      res.redirect("/admin/login");
      console.log(result);
    });
  },

 

  postlogin: async (req, res) => {
    try {
      console.log(req.body);
      let Email = req.body.email;
      let PASS = req.body.password;
      console.log(Email);
      const user = await Admin.findOne({ email: Email });
      if (user) {
        console.log(user, "-----------------------");
        let data = await bcrypt.compare(PASS, user.password);
        console.log(data);
        if (data) {
            res.render("admin/adminhome");
        }

        // const user = usermodel.find(user=>user.email ===  req.body.email)
        // // if(user==null){
        // //     return res.status(400).send('cannot find user')
        // // }
        // try {
        //     if (await bcrypt.compare(req.body.password, user.password)) {
        //         res.send('sucess');
        //     }
        else {
          res.send("not allow");
        }
      }
    } catch {
      res.status(500).send();
    }
  },
  // getcategory:(req,res)=>{
  //   res.render("admin/category")
  // },

  // postcategory:async(req,res)=>{
  //   console.log(req.body,'cattttt');

  //   const name = req.body.category;
  //   const description = req.body.description;

  //   const category =new categories({
  //     name:name,
  //     description:description,
  //   });

  //   await category.save().then(result=>{
  //     console.log(result,'hhhhhhhhiiii');
  //     res.redirect("/admin/addbook");
  //   })

  // },

  getaddbook:async(req,res)=>{
    // const categories = await category.find()
    res.render('admin/addbook')
  },

//add books to category

  postaddbook:async(req,res)=>{
    // try {
      console.log(req.body,'boddyyyyyyyyy');
    
  
    const bookname = req.body.bookname;
    const authername = req.body.authername;
    const price = req.body.price;
    const category = req.body.category;
    const addimage = req.file.filename
  
    console.log( req.file.filename,'fileeeeeee');

  //   categories.findOne({ name: req.body.category }) 
    
  // .then(category => {
  //   if (!category) {
  //     console.log('Category not found');
  //     return;
  //   }
  //   console.log(req.body.name);
  //   console.log(category._id ,"iddddddd");
    // const categoryId = category._id.toString();


    const addbooks =new addbook({
      bookname: bookname,
      authername: authername,
      category:category,
      // category: new ObjectId().toString(), // convert ObjectId to string    
      price:price,
      image:addimage,
    }).save().then(data=>console.log(data));
    res.send('book added');
    // const category = new category({
    //   categoryname: category,
    //   book: addbooks
    // });
console.log(addbooks,'hhhhhhhhhhhhhhhhhhhhhhhh');

    //add the product to category product array
    // categories.book.push(addbooks);

    // save the category to database
  //      category.save()
  //     .then(() => console.log('Product added to category'))
  //     .catch(err => console.log(err));
  // })
  // .catch(err => console.log(err));

  //   await addbooks.save().then((result) => {
  //     console.log(result);
  //     res.redirect("/admin");
  //     // res.redirect(`/categories/${category}`);
  //   });
  //   } catch (error) {
  //     console.log(error,'errrrrrrrrrrrrrrrrrrrrrrrrrrr');
  //   }
    
  },
  getuser:async(req,res)=>{
     const users = await user.find();

    res.render('admin/userdetail',{users})
  }
};
