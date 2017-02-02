var express = require('express');
var fs = require('fs');
var request = require('request');
var OAuth2 = require('oauth').Oauth2;
var app = express();

var oauth2 = new OAuth2('942022655927691',
                        '54b78203147966085cbc3814a7caeab3',
                        '',
                        'https://www.facebook.com/dialog/oauth',
                        'https://graph.facebook.com/oauth/access_token',
                        null);

app.get('/', function(req, res) {
  
  console.log('login');

  global.fbAsyncInit = function () {
    FB.init({
      appID   : '942022655927691',
      status  : true,
      xfbml   : true,
      version : 'v2.8'
    });

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
  };


  

 /*
  url = 'http://www.imdb.com/title/tt1229340/';  

  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : "" };

      $('.title_wrapper').filter(function () {
        var data = $(this);        
        title = data.children().first().text().trim();
        json.title = title;
      });
      
      $('#titleYear').filter(function () {
        var data = $(this);
        release = data.children().first().text();
        json.release = release;
      });
      
      $('.title_wrapper .subtext').filter(function () {
        var data = $(this);
        rating = data.children().first().attr('content');
        json.rating = rating;
      });

      console.log(json);
      
    }
  });
  */
});

app.get('/facebook/auth', (req, res) => {
  var redirect_uri = "http://dev.mitchellsheaffer.com:3000/facebook/callback;
  var params = {
    'redirect_uri' : redirect_uri,
    'scope' : 'user_about_me,user_posts'
  };
  res.redirect(oauth2.getAuthoriseUrl(params));
});


app.listen(3000, () => {
  console.log('server started');
});

exports = module.exports = app;
