const app = require("../server");

app.listen(process.env.PORT || 8080, (req, res)=>{
    console.log("running on port 8000");
})