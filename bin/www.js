const app = require("../server");

app.listen(process.env.PORT || 80, (req, res)=>{
    console.log("running on port 8080");
})