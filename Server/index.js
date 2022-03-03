const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const model = require("./model");

const assignmentDB = model.assignmentDB;

app.use(express.static("Client"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({}));
app.use(cors());

app.get("/assignments", (req, res) => {
    console.log("Req.query.sortBy: " + req.query.sortBy);

    assignmentDB
        .find()
        .sort(req.query.sortBy)
        .then((assignments) => {
            res.json(assignments);
        });
});

app.get("/hello", (req, res) => {
    res.send("Hello World!");
});

app.post("/assignments", (req, res) => {
    console.log("raw request body: ", req.body);
    if (req.body.name && req.body.class) {
        var assignment = new assignmentDB({
            name: req.body.name,
            class: req.body.class,
            duedate: req.body.duedate,
            priority: req.body.priority,
            notes: req.body.notes,
        });
        assignment
            .save()
            .then((response) => {
                console.log("Noice ", response);
                res.status(201).send("Created");
            })
            .catch((error) => {
                if (error.errors) {
                    for (let e in error.errors) {
                        let errorMessage = error.errors[e].message;
                    }
                    res.status(422).send("Server Error");
                } else {
                    console.error(
                        "Error occured while creating an assignment: ",
                        error
                    );
                    res.status(500).send("Server Error");
                }
            });
    } else {
        res.status(422).send["Missing Required Data"];
    }
});

app.put("/assignments/:id", (req, res) => {
    console.log("Request Params ID", req.param.id);

    console.log("Edit/PUT Request Body ", req.body);
    var assignmentFromDB = assignmentDB.findById(req.params.id);

    assignmentFromDB
        .updateOne({
            $set: req.body,
        })
        .then((response) => {
            console.log("Put Post Log ", response);
            res.status(200).send("Gucci PUT");
        });
    // assignmentDB.edit?
});

app.delete("/assignments/:id", (req, res) => {
    console.log("Delete Request body: ", req.params.id);
    assignmentDB.deleteOne({ _id: req.params.id }).then((response) => {
        console.log("Delete Post Log ", response);
        res.status(204).send("Gucci DELETE");
    });
});

app.listen(port, () => {
    console.log(`Assignment Express app is running. Listening on `, port);
});
