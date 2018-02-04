import {Model} from '../model/planning';

const participants = {};

function getRandomConnectNumber() {
    return 100000 + Math.floor(Math.random() * Math.floor(899999));
}

const create = (name, socket, callback) => {
    const planning = {
        name,
        connectNumber: getRandomConnectNumber(),
        participants: []
    };
    const new_resource = new Model(planning);
    new_resource.save(function (err, resource) {
        if (err) {
            console.log(err);
        } else {
            participants[resource.connectNumber] = {
                planning_id: resource.id,
                facilitator: [socket],
                team: []
            };
            callback(resource)
        }
    });

};

const join = (connectNumber, id, socket, callback) => {
    const myParticipants = participants[connectNumber];
    if (myParticipants) {
        Model.findById(myParticipants.planning_id, function (err, oldResource) {
            if (err) {
                console.log(err);
            } else {
                oldResource.participants.push({});
                Model.findOneAndUpdate({_id: myParticipants.planning_id}, oldResource, {}, function (err, resource) {
                    if (err) {
                        console.log(err);
                    } else {
                        myParticipants.team.push(socket);
                        callback(oldResource, myParticipants);
                    }
                });


            }
        });
    }
};

const changeParticipant = (connectNumber, me, socket, callback) => {
    const myParticipants = participants[connectNumber];
    if (myParticipants) {
        Model.findById(myParticipants.planning_id, function (err, oldResource) {
            if (err) {
                console.log(err);
            } else {
                // Everybody except me
                oldResource.participants = oldResource.participants.filter(participant => participant._id.toString() !== me._id);
                oldResource.participants.push(me);
                Model.findOneAndUpdate({_id: myParticipants.planning_id}, oldResource, {}, function (err, resource) {
                    if (err) {
                        console.log(err);
                    } else {
                        callback(oldResource, myParticipants);
                    }
                });
            }
        });
    }
};



export {create, join, changeParticipant}