// Tosti Router
const express = require("express");
const router = express.Router();

const Tosti = require("../models/tostisModel");

// Create route / get
router.get("/", async (req, res) => {
    console.log("GET");

    if(req.header('Accept') != "application/json"){
        res.status(415).send();
    }

    try {
        let tostis = await Tosti.find();

        let tostiCollection = {
            items: tostis,
            _links: {
                self: {
                    href: `${process.env.BASE_URI}tostis/`
                },
                collection: {
                    href: `${process.env.BASE_URI}tostis/`
                }
            },
            pagination: "MOET NOG INVULLEN"
        }

        res.json(tostiCollection);
    } catch {
        res.status(500).send()
    }
})

// create route detail get
router.get("/:_id", async (req, res) => {
    try {
        let tosti = await Tosti.findById(req.params._id)
        if (tosti == null) {
            res.status(404).send();
        } else {
            res.json(tosti)
        }
    }catch{
        res.status(415).send();
    }

})

//middleware for headers in post
router.post("/", async (req, res, next) => {
    console.log("Middleware to check content type for post")
    if(req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded"){
        res.status(400).send();
    } else{
        next();
    }
})

//middleware against empty values post
router.post("/", async (req, res, next) => {
    console.log("Middleware to check for empty values for post")
    if(req.body.title && req.body.ingredients && req.body.sauce){
        next();
    } else{
        res.status(400).send();
    }
})

// create route / post
router.post("/", async (req, res) => {
    console.log("POST");

    // Deze info moet uit request komen
    let tosti = Tosti({
        title: req.body.title,
        ingredients: req.body.ingredients,
        sauce: req.body.sauce
    })

    try {
        await tosti.save();

        res.status(201).send();
    } catch {
        res.status(500).send();
    }
})

//middleware for headers in put
router.put("/:_id", async (req, res, next) => {
    console.log("Middleware to check content type for post")
    if(req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded"){
        res.status(400).send();
    } else{
        next();
    }
})

//middleware against empty values put
router.put("/:_id", async (req, res, next) => {
    console.log("PUT Middleware to check for empty values for post")
    if(req.body.title && req.body.ingredients && req.body.sauce){
        next();
    } else{
        res.status(400).send();
    }
})

router.put("/:_id", async (req, res) => {

    let tosti = await Tosti.findOneAndUpdate(req.params,
        {
            title: req.body.title,
            ingredients: req.body.ingredients,
            sauce: req.body.sauce
        })

    try {
        tosti.save();

        res.status(203).send();
    } catch {
        res.status(500).send();
    }
})

// Create route / delete
router.delete("/:_id", async (req, res) => {
    try {
        await Tosti.findByIdAndDelete(req.params._id);

        res.status(204).send();

    } catch {
        res.status(404).send();
    }
})

// Create route / options
router.options("/", (req, res) => {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.send("");
})

// options for detail: OPTIONS /id
router.options("/:id", async (req, res) => {
    res.set({
        'Allow': 'GET, PUT, DELETE, OPTIONS'
    }).send()
})

module.exports = router;