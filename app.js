var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const {Sequelize}= require('sequelize');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Sequelize
const sequelize = new Sequelize({
    dialect:"sqlite",
    storage: 'cleanops.sqlite',
})

// Models
const Employe = require('./models/Employe')(sequelize);
const EmployeJob = require('./models/EmployeJob')(sequelize);
const Invoice = require('./models/Invoice')(sequelize);
const Job = require('./models/Job')(sequelize);
const JobConstant = require('./models/JobConstant')(sequelize);
const JobTemporary = require('./models/JobTemporary')(sequelize);
const Manager = require('./models/Manager')(sequelize);
const Person = require('./models/Person')(sequelize);
const Report = require('./models/Report')(sequelize);
const Supervisor = require('./models/Supervisor')(sequelize);
const SupervisorManager = require('./models/SupervisorManager')(sequelize);


// Associations
Person.hasMany(Employe);
Employe.belongsTo(Person);

Person.hasMany(Supervisor);
Supervisor.belongsTo(Person);

Person.hasMany(Manager);
Manager.belongsTo(Person);

Supervisor.hasMany(Job);
Job.belongsTo(Supervisor);

Job.hasMany(JobConstant);
JobConstant.belongsTo(Job);

Job.hasMany(JobTemporary);
JobTemporary.belongsTo(Job);

Job.hasMany(Invoice);
Invoice.belongsTo(Job);

Manager.hasMany(Report);
Report.belongsTo(Manager);

Employe.hasMany(EmployeJob);
EmployeJob.belongsTo(Employe);
EmployeJob.hasMany(Job);
Job.belongsTo(EmployeJob);

Manager.hasMany(SupervisorManager);
SupervisorManager.belongsTo(Manager);
SupervisorManager.hasMany(Supervisor);
Supervisor.belongsTo(SupervisorManager);

sequelize.sync().then(()=>{
    console.log('Zsynchronizowano');
}).catch((err)=>{
    console.error('Blad synchronizacji ',err);
})

//Controller & routes
const SupervisorController = require('./controller/supervisorController')(Supervisor, Person, Job, JobConstant, JobTemporary);

app.get('/', SupervisorController.selectSupervisors);
app.get('/addSupervisor', SupervisorController.addSupervisorForm);
app.post('/addSupervisor', SupervisorController.addSupervisor);
app.get('/supervisorDetails/:id', SupervisorController.showDetails)
app.post('/supervisorDetails/:id/delete', SupervisorController.deleteSupervisor);
app.get('/supervisorDetails/:id/edit',SupervisorController.showEditForm);
app.post('/supervisorDetails/:id/update', SupervisorController.updateSupervisor);
app.get('/supervisorDetails/:id/addJob', (req, res) => {
    const supervisorId = req.params.id;
    res.render('addJob', { supervisorId });
});
app.post('/supervisorDetails/:id/addJob', SupervisorController.addJob);



module.exports = app;
