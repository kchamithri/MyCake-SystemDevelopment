import Products from "../models/productSchema.js";

export const ViewProducts = async (req, res) => {
  if (req.body.id) {
    try {
      const products = await Products.findOne({
        _id: req.body.id,
        deleted: false,
      });
      res.status(200).json({
        products: products,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    try {
      const products = await Products.find({ deleted: false });
      res.status(200).json({
        products: products,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
};

export const AddProduct = async (req, res) => {
  try {
    const createProduct = new Products({
      name: req.body.name,
      category: req.body.category,
      type: req.body.type,
      flavor: req.body.flavor,
      weight: req.body.weight,
      price: req.body.price,
      description: req.body.description,
      mainImage: req.body.mainImage,
      optionalImage1: req.body.optionalImage1,
      optionalImage2: req.body.optionalImage2,
      deleted: false,
    });

    const created = await createProduct.save();
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const products = await Products.update({ _id: req.body._id }, req.body);
    res.status(200).json({
      products: products,
      message: "Success",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const products = await Products.update(
      { _id: req.body.id },
      { $set: { deleted: true } }
    );
    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const GetTypesAndFlavors = async (req, res) => {
  try {
    const cakeType = await Products.distinct("type", { category: "Cake" });
    const cakeFlavour = await Products.distinct("flavor", { category: "Cake" });
    const partyType = await Products.distinct("type", {
      category: "Party Packs",
    });
    const partyFlavour = await Products.distinct("flavor", {
      category: "Party Packs",
    });
    res.status(200).json({
      cakeType: cakeType,
      cakeFlavour: cakeFlavour,
      partyType: partyType,
      partyFlavour: partyFlavour,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
