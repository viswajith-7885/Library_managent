const express =require ('express')
const bodyParser = require('body-parser');
const router =express.Router();
const{
    // gethome,
    getsignup,
    postsignup,
    getlogin,
    postlogin,
    getadminhome,
    // getcategory,
    // postcategory,
    postaddbook,
    getaddbook,
    getuser,
}=require("../controllor/admincontrol")

// router.get('/',gethome);


router.get('/',getadminhome)
router.get('/signup',getsignup);
router.post('/signup',postsignup);
router.get('/login',getlogin);
router.post('/login',postlogin);
// router.get('/add',getcategory);
// router.post('/add',postcategory);
router.post('/addbook',postaddbook);
router.get('/addbook',getaddbook);
router.get('/view',getuser);


router.use(bodyParser.urlencoded({ extended: false }));


module.exports = router; 