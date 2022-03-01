# Canvas Assignment Tracker

## Resource

**Assignment Tracker for Canvas Assignments**

This application is meant as an assistant to help keep track of assignments, due dates, priority, and any notes a student may have for an assignment. In the future, the app will automatically integrate with Canva's API and perhaps scrub cit.dixie.edu to grab data from those sites. This will remove the need for consistent manual input of assignments.

Attributes:

-   Name (string)
-   Class (string)
-   Due Date (date/string)
-   Priority (string)
-   Notes (string)

## REST Endpoints

| Name                 | Method | Path            |
| -------------------- | ------ | --------------- |
| Get all Assigments   | GET    | /assignments    |
| Add an Assignment    | POST   | /assignments    |
| Edit an Assignment   | PUT    | /assignments/id |
| Delete an Assignment | DELETE | /assignments/id |
