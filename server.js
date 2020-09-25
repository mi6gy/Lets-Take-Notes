const express = require ("express");
const app = express();

var PORT = process.env.PORT || 8080;


app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
//telling where to go
app.listen(PORT, function () {
    console.log("App listening to PORT: " + PORT);
});