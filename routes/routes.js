const {
  getData,
  postData,
  deleteData,
  putData,
} = require("../controller/dbFunctions");
const express = require("express");
const jwt = require("jsonwebtoken");
const jwtSecret = "myjwt345678";
const router = express.Router();
const { body, validationResult } = require("express-validator");

////////////////////////////////

function autenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) {
    res.json({ err: 1, msg: "Token not match" });
  } else {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Token incorrect" });
      } else {
        console.log("Match");
        next();
      }
    });
  }
}
//////////////////////////////

router.get("/token", async (req, res) => {
  let payload = {
    uid: "emailgdq7wfdyqwfdiyfqydwfywqfdiyqfydqywfdiqy",
  };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: 3000 });
  res.json(token);
});

///////////////////////////////

router.get("/get", autenticateToken, async (req, res) => {
  res.send(await getData());
});

router.post(
  "/post",
  autenticateToken,
  body("email").isEmail(),
  body("name").isLength({ min: 3 }).isAlpha(),
  body("phone").isNumeric().isLength({ min: 10, max: 10 }),
  async (req, res) => {
    let data = req.body;
    let err = validationResult(req);
    console.log(err);
    if (err.isEmpty()) {
      await postData(data);
    }
    res.send("post complete");
  }
);

router.put(
  "/put/:email",
  autenticateToken,
  body("email").isEmail(),
  body("name").isLength({ min: 3 }).isAlpha(),
  body("phone").isNumeric().isLength({ min: 10, max: 10 }),
  async (req, res) => {
    let data = req.body;
    let email = req.params.email;
    let err = validationResult(req);
    console.log(err);
    if (err.isEmpty()) {
      await putData(email, data);
      res.send("put complete");
    } else console.timeLog(err);
  }
);

router.delete("/delete/:email", autenticateToken, async (req, res) => {
  let email = req.params.email;
  await deleteData(email);
  res.send("delete complete");
});

module.exports = router;
