const express = require ("express");
const app = express();

var PORT = process.env.PORT || 8080;


app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api", require("./routes/apiRoutes"));

app.use("/", require("./routes/htmlRoutes"));
app.listen(PORT, function () {
    console.log("App listening to PORT: " + PORT);
});