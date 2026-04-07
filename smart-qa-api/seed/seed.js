require("dotenv").config();
const connectDB = require("../config.db/db");
const Doc = require("../models/docModele");

const seed = async () => {
  await connectDB();

  await Doc.deleteMany();

  await Doc.insertMany([
    {
      title: "Refund Policy",
      content: "Refunds are processed within 5-7 business days.",
      tags: ["refund"]
    },
    {
      title: "Shipping Policy",
      content: "Orders are shipped within 2 days.",
      tags: ["shipping"]
    },
    {
      title: "Cancellation",
      content: "Orders can be cancelled within 24 hours.",
      tags: ["cancel"]
    },
    {
      title: "Support",
      content: "Support is available 24/7 via email.",
      tags: ["support"]
    },
    {
      title: "Payment",
      content: "We accept credit cards and UPI.",
      tags: ["payment"]
    }
  ]);

  console.log("Seeded!");
  process.exit();
};

seed();