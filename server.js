const http = require("http");
const db = require("./db");

const server = http.createServer((req, res) => {

    // GET ALL USERS
    if (req.method === "GET" && req.url === "/api/users") {

        db.query("SELECT * FROM users", (err, results) => {

            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");

                res.end(JSON.stringify({
                    message: "Database error"
                }));

                return;
            }

            res.setHeader("Content-Type", "application/json");

            res.end(JSON.stringify(results));
        });

        return;
    }


    // ROUTE NOT FOUND
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify({
        message: "Route not found"
    }));
});


server.listen(4001, () => {
    console.log("Server running on port 4001");
});