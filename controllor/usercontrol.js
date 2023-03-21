
const usermodel = require('../models/user')
const bcrypt = require("bcrypt")
const  addbook  = require("../models/addbook");
// const category  = require("../models/category");


module.exports = {
    gethome:async(req, res) => {
        try {
            const adminadd = await addbook.find()
            // const categories =  await category.find().populate('Addbook');
            // console.log(categories,"uyhygtyifytuh");
            res.render('user/main',{adminadd});
            
        } catch (error) {
            console.log(error);
        }
  
    },

    getlogin: (req, res) => {
        res.render('user/login');
    },
    getsignup: (req, res) => {
        res.render('user/signup');
    },
    postsignup: async (req, res) => {
        console.log(req.body);
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const model = new usermodel({
            name: name,
            email: email,
            password: password
        })
        await model.save().then(result => {
            res.redirect('login');
            console.log(result);
        })
    },
    postlogin: async (req, res) => {
        try{
        console.log(req.body);
        let Email = req.body.email
        let PASS = req.body.password
        const user = await usermodel.findOne({ email: Email})
        if (user){
            console.log(user);
            let data = await bcrypt.compare(PASS, user.password)
            console.log(data);
            if (data) {
                res.redirect('/')
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
                res.send('not allow')
            }
        }
    }
         catch {
            res.status(500).send()
        }
    },
    getsearch:async(req,res)=>{
        const query = req.query.name;
        console.log(query);

        let regExp = new RegExp(`${query}`,'i')
    let book = await addbook.findOne({ bookname: { $regex: regExp } })
    
    // const book = await product.find({name:{$regex:regExp}})
       
    if(!book){
        await addbook.find({ category: { $regex:regExp} })
        
       .then(data=>{
           console.log(data);
           res.render('user/search',{data:data}); 
       })
     

   }
        
      else if(book){
            await addbook.find({ bookname: { $regex: query, $options: 'i' } })
            .then(data=>{
                console.log(data);
        
            res.render('user/search',{data});})
        }
    
        else{
            res.send('books not found')
        }
      
          // Return the search results as a JSON response
           
        
},
}
