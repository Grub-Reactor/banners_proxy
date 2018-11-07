const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const request = require('request');
const http = require('http');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use('/:id', express.static(path.join(__dirname, 'public')));

app.get(`/grub-reactor/:menuId/menu`, (req, res) => {
  var menuInfo = {
    host: 'localhost',
    port: 3001,
    path: `/grub-reactor/${req.params.menuId}/menu`,
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  };
  var menuInfo = http.request(menuInfo, (result) => {
    result.on('data', (data) => {
      res.status(200).send(data);
    }).on('error', (err) => {
      res.status(500).send("menu not found");
    });
  });
  menuInfo.end();
});


app.get(`/restaurants/banners/:rest_id`, (req, res) => {
  var bannerInfo = {
    host: 'localhost',
    port: 3005,
    path: `/restaurants/banners/${req.params.rest_id}`,
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  };
  var bannerInfo = http.request(bannerInfo, (result) => {
    result.on('data', (data) => {
      res.status(200).send(data);
    }).on('error', (err) => {
      res.status(500).send("banner not found");
    });
  });
  bannerInfo.end();
});


app.get(`/restaurant/:id`, (req, res) => {
  var nearbyInfo = {
    host: 'localhost',
    port: 3004,
    path: `/restaurant/${req.params.id}`,
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  };
  var nearbyInfo = http.request(nearbyInfo, (result) => {
    result.on('data', (data) => {
      res.status(200).send(data);
    }).on('error', (err) => {
      res.status(500).send("nearby not found");
    });
  });
  nearbyInfo.end();
});

app.get(`/:restaurantID/allreviews/reviews/`, (req, res) => {
  var reviewInfo = {
    host: 'localhost',
    port: 3002,
    path: `/${req.params.restaurantID}/allreviews/reviews/`,
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  };
  var reviewInfo = http.request(reviewInfo, (result) => {
    result.on('data', (data) => {
      res.status(200).send(data);
    }).on('error', (err) => {
      res.status(500).send("review not found");
    });
  });
  reviewInfo.end();
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
