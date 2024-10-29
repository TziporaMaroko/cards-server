const express = require("express");
const cors = require('cors');
const app = express();
const port = 3004;
app.use(cors());
app.use(express.json());

let cards =[
    { id: 1, color: "#4CAF50", text: "Text a" },
    { id: 2, color: "#87CEFA", text: "Text b" },
    { id: 3, color: "#9370DB", text: "Text c" },
    { id: 4, color: "#FFA500", text: "Text d" },
]
let cardCount = 100;


const updateUserArrayById = (id, user) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = user;
        return true;
    }
    return false;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/cards", (req, res) => {
    res.json(cards);
});

app.post("/cards", (req, res) => {
    const newCard = {
      id: cardCount++,
      text: req.body.text,
      color: req.body.color,
    };
    cards.push(newCard);
    res.json(newCard);
});

app.put("/cards/:id", (req, res) => {
    const id = parseInt(req.params.id, 10); 
    const card = cards.find(c => c.id === id);
    if (!card) {
      return res.status(404).send("Card not found");
    }
    card.text= req.body.text;
    card.color= req.body.color;

    if(updateCardsArrayById(id, card))
        res.json(card);
    else
        res.status(400).send("Invalid card data");
});

app.delete("/cards/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = cards.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).send("Card not found");
    }
    cards.splice(index, 1);
    res.sendStatus(204);
    console.log(cards);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
