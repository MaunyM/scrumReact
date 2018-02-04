require("babel-register");
// Express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
app.use(bodyParser.json());

// Socker.io
const io = require('socket.io')(http);

// Moongoose
const mongoose = require('mongoose');
let mongooseUri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://127.0.0.1/test";
mongoose.connect(mongooseUri);
mongoose.Promise = global.Promise;

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('react-app/build'));
}

const Controller = require('./api/controller');

// Model
const Planning = require('./api/model/planning');
const PlanningController = Controller.bind(Planning.Model);

const planningService = require('./api/service/planning');

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('create_planning', () => {
            planningService.create("Toto", socket, (resource) => {
                socket.emit('planning_created', resource);
            });
        }
    );
    socket.on('join_planning', (data) => {
            planningService.join(data.connectNumber, data.uuid, socket, (resource, participants) => {
                if (participants.facilitator) {
                    participants.facilitator.forEach(facilitator => facilitator.emit('planning_changed', resource));
                    socket.emit('planning_joined', resource);
                }
            });

        }
    );

    socket.on('me_change', (data) => {
            planningService.changeParticipant(data.connectNumber, data.me, socket, (resource, participants) => {
                if (participants.facilitator) {
                    participants.facilitator.forEach(facilitator => facilitator.emit('planning_changed', resource));
                    socket.emit('me_changed', resource);
                }
            });

        }
    );

    socket.on('voting', (data) => {
            planningService.voting(data.connectNumber, data.me, socket, (resource, participants) => {
                if (participants.facilitator) {
                    participants.facilitator.forEach(facilitator => facilitator.emit('voted', resource));
                    socket.emit('voted', resource);
                }
            });
        }
    );

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

const adddRoute = (app, controller) => {
    console.log(`get /api/${controller.resource.endpoint}`);
    console.log(`post /api/${controller.resource.endpoint}`);
    app.route(`/api/${controller.resource.endpoint}`)
        .get(controller.get_all)
        .post(controller.create);

    console.log(`get /api/${controller.resource.endpoint}/:id`);
    console.log(`get /api/${controller.resource.endpoint}/:id`);
    console.log(`delete /api/${controller.resource.endpoint}/:id`);
    app.route(`/api/${controller.resource.endpoint}/:id`)
        .get(controller.get)
        .put(controller.update)
        .delete(controller.delete);
};

adddRoute(app, PlanningController);

app.set('port', (process.env.PORT || 3001));
http.listen(app.get('port'), function () {
    console.log(`listening on *:${app.get('port')}`);
});