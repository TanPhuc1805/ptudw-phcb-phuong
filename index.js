const express = require("express");
const app = express();
const expressHbs=require("express-handlebars");
const Handlebars = require('handlebars');
require('dotenv').config();

const cors = require('cors');

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4000']
}));

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

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => res.redirect('/manageList'));

app.get('/createTables', (req, res) => {
    let models = require('./models');
    models.sequelize.sync().then(() => res.send('OK'))
})

app.use('/manageList',require('./routes/manageListRouter'));
app.use('/reports',require('./routes/reportsRouter'));
app.use('/requests',require('./routes/requestsRouter'));
app.use('/profile',require('./routes/profileRouter'));
app.use('/changePassword',require('./routes/changePasswordRouter'));

app.set("view engine","hbs");


app.listen(process.env.PORT,()=>console.log(`Example app listening on port ${process.env.PORT}!`));