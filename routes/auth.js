var express = require('express');
var router = express.Router();

module.exports = (app, passport) => {
  app.get('/signin', (req, res, next) => {
    res.render('signin');
  });

  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signin', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope : 'email' })
  );

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect : '/signin',
      failureFlash : true // allow flash messages
    }), (req, res, next) => {
      req.flash('success', 'Welcome!');
      res.redirect('/');
    }
  );

  app.get('/auth/kakao',
    passport.authenticate('kakao-login')
  );

  app.get('/oauth/kakao/callback', passport.authenticate('kakao-login',{
      failureRedirect : '/signin',
      failureFlash : true
  }),(req, res, next) => {
    req.flash('success', 'Welcome!');
    res.redirect('/');
  }
);
  

  app.get('/signout', (req, res) => {
    req.logout();
    req.flash('success', 'Successfully signed out');
    res.redirect('/');
  });
};

