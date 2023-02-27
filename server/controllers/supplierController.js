import Supplier from "../models/supplierSchema.js";

export const AddSupplier = async (req, res) => {
  try {
    const createSupplier = new Supplier({
      name: req.body.name,
      company: req.body.company,
      contact: req.body.contact,
      deleted: false,
    });

    const created = await createSupplier.save();
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const GetSupplier = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json({
      message: "success",
      suppliers,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const DeleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.update(
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

export const UpdateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.updateOne({ _id: req.body.id }, req.body);
    res.status(200).json({
      supplier: supplier,
      message: "Success",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
