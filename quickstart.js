// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const {
    google
} = require('googleapis');
const sampleClient = require('./sampleclient');
const jsonParser = bodyParser.json();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

router.post('/', jsonParser, function(req, res) {
    let thumbnails = []
    // initialize the Youtube API library
    const query = req.body
    // const scopes = ['https://www.googleapis.com/auth/youtube'];

    sampleClient.authenticate()
        .then(authe => {
            const youtube = google.youtube({
                version: 'v3',
                auth: sampleClient.oAuth2Client,
            });
            youtube.search.list({
                part: 'id,snippet',
                q: query,
                maxResults: 50
            }).then(response => {
                response.data.items.forEach(item => {
                    // console.log(item.snippet.thumbnails.default.url)
                    thumbnails.push(item.snippet.thumbnails.default.url)
                })
            }).then(next => {
                res.data = thumbnails
                console.log("RESPONSE", res.data)
                res.send(thumbnails)
            }).catch(err => {
                console.log(err)
            })
        })
        .catch(err => console.log(err))


});
module.exports = router;
