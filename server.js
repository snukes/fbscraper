var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

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

app.listen(3000, () => {
  console.log('server started');
});

exports = module.exports = app;
