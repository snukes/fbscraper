var express = require('express');
var fs = require('fs');
var request = require('request');
var OAuth2 = require('oauth').Oauth2;
var FB = require('fb');
var app = express();

//var oauth2 = new OAuth2('942022655927691', '', '', 'https://www.facebook.com/dialog/oauth', 'https://graph.facebook.com/oauth/access_token', null);

app.get('/', function(req, res) {
  
  console.log('login');
});

app.get('/facebook/auth', (req, res) => {
  var redirect_uri = "http://dev.mitchellsheaffer.com:3000/facebook/callback";
  var params = {
    'redirect_uri' : redirect_uri,
    'scope' : 'user_about_me,user_posts'
  };
  res.redirect(oauth2.getAuthoriseUrl(params));
});

app.get('/facebook/callback', (req, res) => {
  if (req.error_reason) {
    console.log(req.error_reason);
    res.send(req.error_reason); 
  }
  if (req.query.code) {
    var loginCode = req.query.code;
    var redirect_uri = "/facebook/callback";
    oauth2.getOauthAccessToken(loginCode, {grant_type : 'authorization_code', redirect_uri : redirect_uri}, (err, accessToekn, refreshToken, params) => {
      if (err) {
        console.log(err);  
        res.send(err);
      }
      var access_token = accessToken;
      var expires = params.expires;
      req.session.access_token = access_token;
      req.session.expires = expires;
    });
  }
});


app.listen(3000, () => {
  console.log('server started');
});

exports = module.exports = app;
