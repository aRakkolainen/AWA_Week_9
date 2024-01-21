require('dotenv').config();
var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js");
const {body, validationResult } = require("express-validator");
const multer = require("multer");
const storage = multer.memoryStorage(); 
const upload = multer(storage);

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(validateToken());
  res.render('index', {title: "index"})
})
router.get('/register.html', function(req, res) {
  res.render('register', {title: 'Register page'});
})

router.get('/login.html', function(req, res) {
  res.render('login', {title: "Login page"})
})


//Registering is done here because users.js isn't working for some reason!
router.post("/api/user/register", 
  async (req, res) => {
    body("email").isEmail(),
    body("password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1, 
    minNumbers: 1,
    minSymbols: 1 
})
   
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }
      let statusNum; 
      let message; 
      //Checking whether user already exists
      let user = await User.findOne({email: req.body.email}).exec(); 
      // User with this particular email doesn't exists, adding new one to the database
      if (!user && req.body.password !== undefined) {
        //Hashing the password: 
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        let newUser = new User({email: req.body.email, password: hashedPassword});
        await newUser.save(); 
        //statusNum = 200; 
        //res.redirect("/login.html");
        return res.redirect("/login.html");
      } else {
        statusNum = 403; 
        message = {email: "Email already in use"};
        res.status(statusNum).send(message);
        //return res.redirect("/register.html");
      }
      //res.status(statusNum).send(message).redirect("/login.html");

    })
// Login with json webtoken is implemented based on course material!
router.post("/api/user/login",
  upload.none(), async function(req, res) {
  // First checking if user with given email exists, in case that req.body is not empty!)
  if (req.body.email && req.body.password) {
    //Checking whether user already exists
    let user = await User.findOne({email: req.body.email}).exec(); 
    if (!user) {
      res.status(403).json({message: "Login failed!"});
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err; 
        if (isMatch) {
          const jwtPayload = {
            email: user.email
          }
          var token = 
          jwt.sign(
            jwtPayload, 
            process.env.SECRET
          )
            res.json({success: true, token});
            

        } else {
            res.status(403).json({message: "Failed!"});
        }
      })
    }
  }
    

})

router.get("/api/private", validateToken, (req, res) => {
  res.send({email: req.email})
})

router.post("/api/todos", validateToken,  async (req, res) => {
  console.log(req.body);
  let loggedEmail = req.email;
  // Finding the userID from database
  let user = await User.findOne({email: loggedEmail}).exec();
  // Checking if the user already has some todos
  const query = {user: user._id};
  let currentTodos = await Todo.findOne(query).exec(); 
  if (!currentTodos) {
    // Creating new todos list
    let newTodos = new Todo({user: user._id, items: req.body.items});
    await newTodos.save();
    res.send("ok")
  } else {
    if (!currentTodos.items.includes({items: req.body.items})) {
      currentTodos.items.addToSet(req.body.items);
      await currentTodos.save();
    }
    res.send("ok")
  } 
})

router.get("/api/todos", validateToken,  async (req, res) => {
  let loggedEmail = req.email;
  // Finding the userID from database
  let user = await User.findOne({email: loggedEmail}).exec();
  const query = {user: user._id};
  let todos = await Todo.findOne(query).exec(); 
  if (todos) {
    console.log(todos)
    res.send(todos.items);
  }
})
module.exports = router;
