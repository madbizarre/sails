"use strict";
var express = require('express');
var router = express.Router();
var config = require('../config');
var transporter = require('../lib/nodemailer');

/* GET home page. */
router.get('/', function (req, res, next){
    res.render('index', {title: 'Express'});
});

router.post('/mail', function (req, res, next){
    let mail = config.get('mail'),
        text = `Имя: ${req.body.name}
Телефон: ${req.body.tel}`;
    transporter.sendMail({
        from: `${mail.from} <${mail.user}>`,
        to: mail.to,
        subject: mail.from,
        text: text
    }, function (err){
        if (err) return next(err);
        res.status(200).end();
    });
});


module.exports = router;
