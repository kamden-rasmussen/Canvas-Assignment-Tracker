const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://web4200:stim3lep9CRAG.firn@cluster0.fgaom.mongodb.net/cars?retryWrites=true&w=majority"
);

const assignment = mongoose.model("Assignment", {
    name: String,
    class: String,
    duedate: String,
    priority: String,
    notes: String,
});

module.exports = {
    assignmentDB: assignment,
};
