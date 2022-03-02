// const { response } = require("express");

var app = new Vue({
    el: "#app",
    data: {
        assignments: [],
        assignmentsByDueDate: [],
        newAssignmentName: "",
        newAssignmentDueDate: "",
        newAssignmentPriority: "",
        newAssignmentClass: "",
        newAssignmentNotes: "",
        showNewAssignment: false,

        editAssignmentName: "",
        editAssignmentDueDate: "",
        editAssignmentPriority: "",
        editAssignmentClass: "",
        editAssignmentNotes: "",
        editTargetAssignmentID: "",
        showEditAssignment: false,

        showByDateInput: true,
        showByDueDate: false,
        showByClass: false,
        showByPriority: false,

        showDetails: false,
    },
    methods: {
        addAssignmentToDB: function () {
            var assignmentClass = this.newAssignmentClass;
            var assignmentName = this.newAssignmentName;
            var assignmentDueDate = this.newAssignmentDueDate;
            var assignmentPriority = this.newAssignmentPriority;
            var assignmentNotes = this.newAssignmentNotes;

            var newAssignment =
                "class=" +
                encodeURIComponent(assignmentClass) +
                "&name=" +
                encodeURIComponent(assignmentName) +
                "&duedate=" +
                encodeURIComponent(assignmentDueDate) +
                "&priority=" +
                encodeURIComponent(assignmentPriority) +
                "&notes=" +
                encodeURIComponent(assignmentNotes);

            fetch("http://localhost:3000/assignments", {
                method: "POST",
                body: newAssignment,

                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }).then((response) => {
                if (response.status == 201) {
                    this.newAssignmentClass = "";
                    this.newAssignmentName = "";
                    this.newAssignmentDueDate = "";
                    this.newAssignmentPriority = "";
                    this.newAssignmentNotes = "";
                }
            });
            this.fetchAllAssignments();
            this.disableAddAssignmentView();
        },

        fetchAllAssignments: function () {
            var sortParam = "";

            if (this.showByDateInput) {
            } else if (this.showByDueDate) {
                sortParam = "duedate";
            } else if (this.showByClass) {
                sortParam = "class";
            } else if (this.showByPriority) {
                sortParam = "priority";
            }

            console.log("Sort param" + sortParam);

            fetch(
                "http://localhost:3000/assignments?sortBy=" +
                    encodeURIComponent(sortParam)
            ).then((response) => {
                response.json().then((data) => {
                    console.log("data from the server:", data);
                    this.assignments = data;
                });
            });
        },

        addAssignment: function () {
            this.showNewAssignment = true;
            console.log("New Assignment Button Clicked");
        },

        disableAddAssignmentView: function () {
            this.showNewAssignment = false;
            this.fetchAllAssignments();
        },

        editAssignment: function () {
            console.log("Edit ", this.editTargetAssignmentID);

            var editAssignmentData =
                "class=" +
                encodeURIComponent(this.editAssignmentClass) +
                "&name=" +
                encodeURIComponent(this.editAssignmentName) +
                "&duedate=" +
                encodeURIComponent(this.editAssignmentDueDate) +
                "&priority=" +
                encodeURIComponent(this.editAssignmentPriority) +
                "&notes=" +
                encodeURIComponent(this.editAssignmentNotes);

            console.log("EditAssignmentData = ", editAssignmentData);

            fetch(
                "http://localhost:3000/assignments/" +
                    this.editTargetAssignmentID,
                {
                    method: "PUT",
                    body: editAssignmentData,

                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            ).then((response) => {
                if (response.status == 200) {
                    this.editAssignmentClass = "";
                    this.editAssignmentName = "";
                    this.editAssignmentDueDate = "";
                    this.editAssignmentPriority = "";
                    this.editAssignmentNotes = "";
                    this.fetchAllAssignments();
                } else {
                    console.error(
                        "Bad delete request: ",
                        this.editTargetAssignmentID
                    );
                }
            });
            this.fetchAllAssignments();
            this.showEditAssignment = false;
        },

        viewEditAssignment: function (targetAssignment) {
            if (this.showEditAssignment) {
                this.showEditAssignment = false;
            } else {
                this.editTargetAssignmentID = targetAssignment._id;
                this.editAssignmentName = targetAssignment.name;
                this.editAssignmentClass = targetAssignment.class;
                this.editAssignmentDueDate = targetAssignment.duedate;
                this.editAssignmentPriority = targetAssignment.priority;
                this.editAssignmentNotes = targetAssignment.notes;
                this.showEditAssignment = true;
            }
        },

        completeAssignment: function (assignment) {
            console.log("Complete button pushed with this data; ", assignment);
            fetch("http://localhost:3000/assignments/" + assignment._id, {
                method: "DELETE",
            }).then((response) => {
                if (response.status == 204) {
                    this.fetchAllAssignments();
                } else {
                    console.error("Bad delete request: ", assignment);
                }
            });
        },

        viewByInputDateTrue: function () {
            console.log("sort by input date");
            this.showByDateInput = true;
            this.showByDueDate = false;
            this.showByClass = false;
            this.showByPriority = false;
            this.fetchAllAssignments();
        },

        viewByDueDateTrue: function () {
            console.log("sort by due date");
            this.showByDateInput = false;
            this.showByDueDate = true;
            this.showByClass = false;
            this.showByPriority = false;
            this.fetchAllAssignments();
        },

        viewByPriorityTrue: function () {
            console.log("sort by priority");
            this.showByDateInput = false;
            this.showByDueDate = false;
            this.showByClass = false;
            this.showByPriority = true;
            this.fetchAllAssignments();
        },

        viewByClassTrue: function () {
            console.log("sort by class");
            this.showByDateInput = false;
            this.showByDueDate = false;
            this.showByClass = true;
            this.showByPriority = false;
            this.fetchAllAssignments();
        },
    },

    created: function () {
        console.log("App running.");
        this.fetchAllAssignments();
    },
});
