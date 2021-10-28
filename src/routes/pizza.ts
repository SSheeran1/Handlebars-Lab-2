// require the express module
import express from "express";

// create a new Router object
const pizzaRouter = express.Router();

const toppings = [
  "Pepperoni",
  "Sausage",
  "Chicken",
  "Mushroom",
  "Olive",
  "Green Pepper",
  "Onion",
  "Banana Pepper",
  "Anchiovies",
  "Pineapple",
];

pizzaRouter.get("/", (req, res) => {
  res.render("homepage");
});

pizzaRouter.get("/specialty", (req, res) => {
  const { name, price } = req.query;

  res.render("specialty", { name, price });
});

pizzaRouter.get("/review-page", (req, res) => {
  res.render("review-page");
});

pizzaRouter.post("/your-review", (req, res) => {
  let { name, comment, rating } = req.body;

  res.render("your-review", { name, comment, rating });
});

pizzaRouter.get("/custom-pizza", (req, res) => {
  res.render("custom-pizza", { toppings });
});

pizzaRouter.post("/your-pizza", (req, res) => {
  let size: string = req.body.size;
  let toppingAmount: number = req.body.amount;
  let specialInstructions: string = req.body.instructions;
  let glutenFree: boolean = req.body.gluten ? true : false;
  let price: number = 0;
  let message: string = "";
  if (size === "Small") {
    price += 7;
    price += toppingAmount * 0.5;
    if (glutenFree) {
      price += 2;
    }
  }
  if (size === "Medium") {
    price += 10;
    price += toppingAmount * 1;
    if (glutenFree) {
      price += 2;
    }
  }
  if (size === "Large") {
    price += 12;
    price += toppingAmount * 1.25;
    if (glutenFree) {
      price += 2;
    }
  }
  if (price >= 15) {
    message =
      "Because your order meets the $15.00 minimum, you get FREE DELIVERY!";
  }
  price.toFixed(2);
  console.log(req.body);
  res.render("your-pizza", {
    size,
    toppingAmount,
    specialInstructions,
    glutenFree,
    price,
    message,
  });
});

export default pizzaRouter;
