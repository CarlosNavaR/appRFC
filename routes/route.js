/* jshint esversion: 6*/

//import modules
const express = require("express");
const path = require("path");
const operaciones = require('./operaciones')
//router express object
const router = express.Router();

//routes modules export
module.exports = router;

// Crear midleware
const middleware = function (req, res, next) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < 2; i++) {
        if (i == 0) {
            result += Math.round(Math.random() * 10);
        }
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    req.middleware = result;
    next();
}

router.get("/", (req, res) => {
    res.render("pages/home", {
        title: "Inicio"
    });
});

router.post("/rfc", middleware, (req, res) => {
    console.log(req.middleware);
    const RFC = operaciones.getRFC(req.body) + req.middleware;
    res.render("pages/resultado", {
        title: "Resultado",
        RFC: RFC
    });
});

router.get("/about", (req, res) => {
    res.render("pages/about", {
        title: "Inicio"
    });
});

router.get("/contact", (req, res) => {
    res.render("pages/contact", {
        title: "Inicio"
    });
});