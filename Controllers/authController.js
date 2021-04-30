const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserData = require('../Models/userModel')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);


exports.signUp = async (req, res, next) => {
   const errors = validationResult(req);
   const formate = (data) => data.msg
   if (!errors.isEmpty()) {
      const errorMsg = errors.formatWith(formate).mapped()
      res.send(errorMsg)
   }
   const {username, email, gender, password} = req.body;
   const hashedPassword = await bcrypt.hash(password, 10)

   try {
      const token = await jwt.sign(
         {
            username,
            email,
            gender,
            password: hashedPassword
         },
         process.env.JWT_SECRET,
         {expiresIn: '5m'}
      );
   
      const emailData = {
         from: process.env.EMAIL_FROM,
         to: email,
         subject: 'Account activation link',
         html: `
            <h1>Welcome to MY BLOG.</h1>
            <h2>Please use the following link to activate your account</h2>
            <a target="_blank" href="http://localhost:3000/account/activate/${token}">
               Click Here To Active Your Account.
            </a>
            <hr />
            <p>This email may containe sensetive information</p>
         `
      };
      await sgMail.send(emailData);
      res.send({success: `Email has been sent to ${email}. Please check your email to activate your account`})
   } catch (error) {
      console.error(error);
      res.send({error: `User Registration Fail.`});
   }
}

exports.accountActivation = (req, res) => {
   const {token} = req.body;
   console.log(token)
 
   if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
         if (error) {
            res.send({
            error: 'Link expired. Please signup again'
         });
         } else {
            const { username, gender, email, password } = jwt.decode(token);
   
            const user = new UserData({
               username,
               email,
               gender,
               password
            });
   
            await user.save();
            res.send({success: 'Account create successful'});
         }
      });
   } else {
      return res.status(401).send({
         error: 'Error happening please try again'
      });
   }
};

exports.signIn = async (req, res, next) => {
   const errors = validationResult(req);
   const formate = (data) => data.msg
   if (!errors.isEmpty()) {
      const errorMsg = errors.formatWith(formate).mapped()
      res.send(errorMsg)
   }

   const {email, password} = req.body;
   try {
      // check user
      const correctUser = await UserData.findOne({email})
      if (!correctUser) {
         res.status(400).send({error: 'Email or password is incorrect.'})
      }
      // check password
      const correctPassword = await bcrypt.compare(password, correctUser.password)
      if (!correctPassword) {
         res.status(400).send({error: 'Email or password is incorrect.'})
      }
      // Generate Auth Token form user-registration.js
      const token = await jwt.sign(
         {
            userId: correctUser._id,
            username: correctUser.username,
            email: correctUser.email,
         }, 
         process.env.JWT_SECRET, 
         { expiresIn: '7d' }
      );
      // if (token) {
      //    const decoded = jwt.decode(token);
      //    res.cookie('myBlogAuth', token, {
      //       httpOnly: true,
      //       sameSite: false,
      //       signed: true,
      //       expires: new Date(Date.now() + decoded.exp)
      //    });
      // }

      // Successful message
      res.send({token, success: 'Login Successful'})
   } catch (error) {
      res.status(404).send({error: 'Something was wrong.!'})
   }
}

exports.getUser = async (req, res, next) => {
   try {
      const userData = await UserData.findOne({_id: req.user._id})
      userData.password = undefined
      res.send(userData)
   } catch (error) {
      res.status(404).json({error: 'Something was wrong.!'})
   }
}

exports.signOut = async (req, res, next) => {
   try {
      
   } catch (error) {
      
   }
}