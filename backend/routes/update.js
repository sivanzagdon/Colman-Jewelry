const express = require("express");
const router = express.Router();
const Item = require("../modelItem"); // יש לשנות את הנתיב לנתיב הנכון של המודל Item

router.post("/update-route", async (req, res) => {
  const { productName, productPrice, productImage } = req.body;

  try {
    const existingItem = await Item.findOne({ name: productName });

    if (!existingItem) {
      return res.status(404).json({ message: "Product not found." });
    }

    existingItem.price = productPrice;
    existingItem.image = productImage;
    await existingItem.save();

    return res.status(200).json({ message: "Product updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error updating product." });
  }
});

module.exports = router;
