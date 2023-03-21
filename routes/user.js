const express =require ('express')
const router =express.Router();
const{
    gethome,
    getsignup,
    postsignup,
    getlogin,
    postlogin,
    getsearch,
    // getsearchpage,
    
    

}=require("../controllor/usercontrol")

router.get('/',gethome);
router.get('/login',getlogin);
router.post('/login',postlogin);
router.post('/signup',postsignup);
router.get('/signup',getsignup);
router.get('/search',getsearch);
// router.get('/search',getsearchpage);

module.exports = router; 