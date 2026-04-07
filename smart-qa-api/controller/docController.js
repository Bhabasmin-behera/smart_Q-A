const Doc = require("../models/docModele");

exports.getDocs = async (req, res) => {
  const docs = await Doc.find();
  res.json(docs);
};