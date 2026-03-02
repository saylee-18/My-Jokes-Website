import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const correctUsername = "admin";
const correctPassword = "1234";

app.get("/", (req, res) => {
  res.render("login.ejs", );
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username === correctUsername && password === correctPassword) {
        const response = await axios.get("https://sv443.net/jokeapi/v2/joke/Any");
        res.render("index.ejs", { data: response.data});
    }
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/jokes", async (req, res) => {
  try {
    console.log(req.body);
    const category = req.body.categories || "Any";
    const format = req.body.format || "json";
    const type = req.body.type || "single,twopart";

    const response = await axios.get(`https://sv443.net/jokeapi/v2/joke/${category}?type=${type}&format=${format}`);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", {
      data: response.data, format: format
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

