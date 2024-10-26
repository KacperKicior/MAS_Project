const Employe = require('../models/Employe')
const EmployeJob = require('../models/EmployeJob')
const Invoice = require('../models/Invoice')
const Job = require('../models/Job')
const JobConstant = require('../models/JobConstant')
const JobTemporary = require('../models/JobTemporary')
const Manager = require('../models/Manager')
const Person = require('../models/Person')
const Report = require('../models/Report')
const Supervisor = require('../models/Supervisor')
const SupervisorManager = require('../models/SupervisorManager')
const e = require("express");

const supervisorController = (Supervisor,Person,Job,JobConstant,JobTemporary) => {
    return {
        selectSupervisors: async (req, res) => {
            try {
                const people = await Person.findAll({
                    include: [{
                        model: Supervisor
                    }]
                });
                res.render('index', { people });
            } catch (err) {
                console.error('Error fetching supervisors:', err);
                res.status(500).send('Internal Server Error');
            }
        },

        addSupervisorForm: (req, res) => {
            res.render('addsupervisor');
        },

        addSupervisor: async (req, res) => {
            try {
                const { name, surname, phonenmbr, adress, salary, login, password } = req.body;

                await Person.create({
                    name,
                    surname,
                    phonenmbr,
                    adress,
                    Supervisors: [{ salary, login, password }]
                }, {
                    include: [Supervisor]
                });

                res.redirect('/');
            } catch (err) {
                console.error('Error adding supervisor:', err);
                res.status(500).send('Internal Server Error');
            }
        },

        showDetails: async (req, res) => {
            try {
                const supervisorId = req.params.id;
                const person = await Person.findByPk(supervisorId, {
                    include: [{
                        model: Supervisor,
                        include: [
                            {
                                model: Job,
                            }
                        ]
                    }]
                });
                console.log(JSON.stringify(person, null, 2));
                if (person) {
                    res.render('supervisordetails', { supervisor: person });
                } else {
                    res.status(404).send('Supervisor not found');
                }
            } catch (err) {
                console.error('Error fetching supervisor details:', err);
                res.status(500).send('Internal Server Error');
            }
        },

        deleteSupervisor: async (req, res) => {
            try {
                const supervisorId = req.params.id;

                const supervisor = await Supervisor.findByPk(supervisorId, {
                    include: Person
                });

                if (!supervisor) {
                    return res.status(404).send('Supervisor not found');
                }

                const person = supervisor.Person;

                await person.destroy();
                await supervisor.destroy();

                res.redirect('/');
            } catch (err) {
                console.error('Error deleting supervisor:', err);
                res.status(500).send('Internal Server Error');
            }
        },

        showEditForm: async (req, res) => {
            try {
                const supervisorId = req.params.id;
                const person = await Person.findByPk(supervisorId, {
                    include: [Supervisor]
                });

                if (person) {
                    res.render('editsupervisor', { supervisor: person });
                } else {
                    res.status(404).send('Supervisor not found');
                }
            } catch (err) {
                console.error('Error showing edit form:', err);
                res.status(500).send('Internal Server Error');
            }
        },

        updateSupervisor: async (req, res) => {
            try {
                const supervisorId = req.params.id;
                const { name, surname, phonenmbr, adress, salary, login, password } = req.body;

                const person = await Person.findByPk(supervisorId, {
                    include: [Supervisor]
                });

                if (person) {
                    await person.update({ name, surname, phonenmbr, adress });

                    if (person.Supervisors.length > 0) {
                        const supervisor = person.Supervisors[0];
                        await supervisor.update({ salary, login, password });
                    }

                    res.redirect(`/supervisorDetails/${supervisorId}`);
                } else {
                    res.status(404).send('Supervisor not found');
                }
            } catch (err) {
                console.error('Error updating supervisor:', err);
                res.status(500).send('Internal Server Error');
            }
        },

        addJob: async (req, res) => {
            const { dateFrom, dateTo, cost, adress } = req.body;
            const supervisorId = req.params.id;

            try {
                await Job.create({
                    dateFrom,
                    dateTo,
                    cost,
                    adress,
                    SupervisorId: supervisorId
                });
                res.redirect(`/supervisorDetails/${supervisorId}`);
            } catch (error) {
                console.error('Error adding job:', error);
                res.status(500).send('Internal Server Error');
            }
        },

    };
};

module.exports = supervisorController;