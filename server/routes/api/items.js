const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
// Item model
const Item = require("../../models/Item");

/** 
 * @route  GET api/items
 * @desc   Get all items
 * @access Private
*/
router.get("/", auth, (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

/** 
 * @route  POST api/items
 * @desc   Create an item
 * @access Private
*/
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    completed: req.body.completed
  });

  newItem.save().then(item => res.json(item));
});

/** 
 * @route  DELETE api/items
 * @desc   Delete an item
 * @access Private
*/
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

/** 
 * @route  PATCH api/items
 * @desc   Update an item
 * @access Public
*/
router.patch("/:id", auth, (req, res) => {
  Item.findByIdAndUpdate(req.params.id, { completed: req.body.completed })
    .then(item => res.json(item))
    .catch(err => res.status(404).json({ error: "Something went wrong" }))
})

module.exports = router
