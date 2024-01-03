const router = require("express").Router();
const gameModel = require("../models/games");

let arr = [
    { id: 1, name: "taki", price: 120 },
    { id: 2, name: "remi", price: 150 },
    { id: 3, name: "salat yevani", price: 120 }
];
router.get("/", (req, res) => {
    gameModel.find({}.then(allTheGame => {
        res.json(allTheGame)
    })).catch(err => {
        res.status(400).send("לא ניתן לקבל את כל המשחקים ")
    })
})

router.get("/:gameId", (req, res) => {
    let game = arr.find(item => item.id == req.params.gameId)
    if (!game)
        return res.status(404).send("אין משחק עם קוד כזה");
    res.json(game);

})

router.delete("/:gameId", (req, res) => {
    let index = arr.findIndex(item => item.id == req.params.gameId)
    if (index != -1)
        return res.status(404).send(" אין משחק עם קוד כזה למחיקה");
    let game = arr.splice(index, 1)[0];
    res.json(game)

})

router.post("/", (req, res) => {
    res.body.id = arr[arr.length - 1].id + 1;
    arr.push(req.body)
    res.json(req.body)
})

router.put("/:id", (req, res) => {
    let game = arr.find(item => item.id == req.params.id)
    if (!game)
        return res.status(404).send("אין משחק עם קוד כזה");
    game.name = req.body.name || game.name;
    game.price = req.body.price || game.price;
    res.json(game);
})

module.exports = router;