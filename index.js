const express = require("express");
const app = express();
const port = 4000;
const expressHbs=require("express-handlebars");
const Handlebars = require('handlebars');

Handlebars.registerHelper('if_eq', function (a, b, options) {
    if (a == b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

app.use(express.static(__dirname + "/html"));

app.engine('hbs', expressHbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'layout',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    }, 
    helpers: {
        showDate: (date) => {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        showIndex: (index) => index + 1,
    }
}));

app.get("/",(req,res)=>{
    res.render("manageList");
})

app.get('/', (req, res) => res.redirect('/manageList'));

app.use('/manageList.htm',require('./routes/manageListRouter'));
app.use('/notifications.htm',require('./routes/notificationsRouter'));
app.use('/reports.htm',require('./routes/reportsRouter'));
app.use('/requests.htm',require('./routes/requestsRouter'));

app.set("view engine","hbs");

app.listen(port,()=>console.log(`Example app listening on port ${port}!`));