import Express from "express";

const app = new Express()
const port = 3000;
const users = [];

function addUser(user, users) {
    users.push(user);
    user.id = users.length;
}

function updateUser(update, id, users) {
    if(id > users.length) {
        throw new Error(`No user with id: ${id}`);
    } else {    
        for (const i of users) {
            if(i.id == id) {
                users[id - 1] = update;
                users[id - 1].id = id;
            }
        }
    }
}

function deleteUser(id, users) {
    if(id > users.length) {
        throw new Error(`No user with id: ${id}`);
    } else {    
        for (const i of users) {
            if(i.id == id) {
                users.splice(id - 1, 1);
            }
        }

        for (let i = id - 1; i < users.length; i++) {
            users[i].id--;
        }
    }
}

function getUsers(users) {
    const msg = `Users: ${users.length !== 0 ? users.map(i => "\n" + JSON.stringify(i)) : "No users yet"}`

    return msg;
}

app.post("/users", (req, res) => {
    const query = req.query;
    const user = {name: query.name, surname: query.surname}

    addUser(user, users);

    res.send("User added");
});

app.put("/users/:id", (req, res) => {
    const params = req.params;
    const query = req.query;
    const update = {name: query.name, surname: query.surname}

    updateUser(update ,params.id, users)
    res.send("User updated");
});

app.delete("/users/:id", (req, res) => {
    const params = req.params;

    deleteUser(params.id, users);
    res.send("User deleted");
});

app.get("/", (req, res) => {
    res.send(getUsers(users))
});

app.listen(port)