const Doc = require("../models/docModele");

exports.getRelevantDocs = async (question) => {
  return await Doc.find(
    { $text: { $search: question } },
    { score: { $meta: "textScore" } } // 🔥 important
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(3);
};