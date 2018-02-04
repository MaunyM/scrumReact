import mongoose from 'mongoose';

const endPoint = 'planning';

const PlanningSchema = {
    name: String,
    connectNumber: Number,
    participants: [{
        name: String,
        id: String,
        vote: {
            value: String
        }
    }]
};

const Model = mongoose.model(endPoint, PlanningSchema);
Model.endpoint = endPoint;
export {Model};