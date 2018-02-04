const bind = (resource) => ({
    resource,
    get_all: (req, res) => {
        resource.find({}, function (err, resource) {
            if (err)
                res.send(err);
            res.json(resource);
        });
    },

    create: (req, res) => {
        const new_resource = new resource(req.body);
        new_resource.save(function (err, resource) {
            if (err)
                res.send(err);
            res.json(resource);
        });
    },

    get: (req, res) => {
        resource.findById(req.params.id, function (err, resource) {
            if (err)
                res.send(err);
            res.json(resource);
        });
    },

    update: (req, res) => {
        resource.findOneAndUpdate({_id: req.params.id}, req.body, {}, function (err, resource) {
            if (err)
                res.send(err);
            res.json(resource);
        });
    },

    delete: (req, res) => {
        resource.remove({
            _id: req.params.id
        }, function (err, resource) {
            if (err)
                res.send(err);
            res.json({message: ' Resource successfully deleted'});
        });
    }
});

export {bind};