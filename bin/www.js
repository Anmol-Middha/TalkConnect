const app = require("../server");

app.listen(process.env.PORT || 8000, (req, res)=>{
    console.log("running on port 8000");
})