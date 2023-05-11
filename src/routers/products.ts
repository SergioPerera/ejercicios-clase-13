import express from "express";
import { Products } from "../models/products.js";

export const productRouter = express.Router();

productRouter.use(express.json());

productRouter.post('/products', async (req, res) => {
  const product = new Products(req.body);
  try {
    await product.save()
    return res.status(201).send(product);
  } catch (err) {
    return res.status(400).send(err);
  }
});

productRouter.get("/products", async (req, res) => {
  const { name } = req.query;
  try {
    let products;
    if (name) {
      // Find all products that match the name
      products = await Products.find({ name });
    } else {
      // Find all products
      products = await Products.find();
    }
    return res.status(200).send(products);
  } catch (err) {
    return res.status(500).send();
  }
});

productRouter.patch("/products", async (req, res) => {
  //actualizar un usaurio por su nombre
  const name = req.query.name;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "description",
    "price",
    "category",
    "users",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const product = await Products.findOneAndUpdate({ name }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).send();
    }
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send(err);
  }
});

productRouter.delete("/products", async (req, res) => {
  // // Borrar un usuario por su nombre
  // const name = req.query.name;
  // try {
  //   const product = await Products.findOneAndDelete({ name });
  //   if (!product) {
  //     return res.status(404).send();
  //   }
  //   await Products.updateMany({ users: product._id }, { $pull: { products: product._id } });
  //   return res.status(200).send(product);
  // } catch (err) {
  //   return res.status(400).send(err);
  // }
  
});
