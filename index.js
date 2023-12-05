const express = require("express");
const app = express();
const port = 4000;
const expressHBs=require("express-handlebars");

app.use(express.static(__dirname + "/html"));

app.engine('hbs',expressHBs.engine({
    layoutDirs: __dirname+"/views/layouts",
    partialDirs: __dirname+"/views/partials",
    extname:"hbs",
    defaultLayout: "layout",
}));

app.get("/",(req,res)=>{
    res.render("manageList");
})

app.use('/manageList.htm',require('./routes/manageListRouter'));
app.use('/notifications.htm',require('./routes/notificationsRouter'));
app.use('/reports.htm',require('./routes/reportsRouter'));
app.use('/requests.htm',require('./routes/requestsRouter'));

app.set("view engine","hbs");

app.listen(port,()=>console.log(`Example app listening on port ${port}!`));