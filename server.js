var sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "db.users.sqlite";

// Initialisation de la BDD
let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.');

    db.run(`CREATE TABLE user (
      userId INTEGER PRIMARY KEY,
      userName text,
      userAge number,
      userJob text,
      userSkills text,
      userRating text,
      userImage text
            )`,
      (err) => {
        if (err) {
          // Table already created
          console.log('Table user already created.');
        } else {
          // Initialization of the table
          console.log('Table user created.');

          var insert = 'INSERT INTO user (userName, userAge, userJob, userSkills, userRating, userImage) VALUES (?,?,?,?,?,?)';
          db.run(insert, ["Robert", 48, "Architecte", "JEE,Java,SOA", "4.5", "assets/images/bob.jpg"]);
          db.run(insert, ["Melinda", 35, "Chef de projet", "SCRUM,Kanban", "4.7", "assets/images/melinda.jpg"]);
          db.run(insert, ["Sarah", 28, "Développeur", "Java,JavaScript,Angular", "3.5", "assets/images/sarah.jpg"]);
          db.run(insert, ["Eric", 23, "Développeur", "C++,.Net", "3.7", "assets/images/eric.jpg"]);
          db.run(insert, ["Vincent", 40, "Testeur", "Junit,Selenium,Squash,Robot Framework", "3.9", "assets/images/vincent.jpg"]);
        }
      });
  }
});

var params = [];

db.all("SELECT * FROM user", params, (err, rows) => {
  if (err) {
    console.error('SQL ERROR');
  } else {
    console.log('ROWS : ' + rows.length);
    rows.forEach(function (row) {
      console.log(row.userId + ": " + row.userName + " " + row.userAge + " " + row.userJob + " " + row.userSkills + " " + row.userRating + " " + row.userImage);
    });
  }
});

var express = require('express'),
  app = express(),
  cors = require("cors"),
  port = process.env.PORT || 4301,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());

var routes = require('./api/routes/userRoutes');
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);


