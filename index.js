const express = require('express');
const fs = require('fs');
const path = require('path');

const validate = require('./validate/validate');
const schema = require('./validate/schema');

const app = express();
const port = 3000;
const pathToUsersFile = path.join(__dirname, 'users.json');

function writeFile(pathFile, data, res) {
  fs.writeFile(pathFile, JSON.stringify(data, null, 2), (error) => {
    if (error) {
      res.status(500);
      res.send(error.message);
    }
  });
}

function readFile(pathFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, 'utf-8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

app.use(express.json());

// Получить всех пользователей
app.get('/users', (req, res) => {
  readFile(pathToUsersFile)
    .then((users) => res.send(users))
    .catch((error) => res.status(500).send(error.message));
});

// получить конкретного пользователя
app.get('/users/:id', validate.reqParams(schema.reqParams), (req, res) => {
  readFile(pathToUsersFile)
    .then((users) => {
      const user = users.find(({ id }) => id === Number(req.params.id));
      if (user) {
        res.send(user);
      } else {
        res.status(404);
        res.send({ user: null });
      }
    })
    .catch((error) => res.status(500).send(error.message));
});

// Создать нового пользователя
app.post('/users', validate.reqBody(schema.reqBody), (req, res) => {
  readFile(pathToUsersFile)
    .then((users) => {
      const newUserID = users.at(-1) ? Number(users.at(-1).id) + 1 : 1;
      const user = {
        id: newUserID,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        age: req.body.age,
        city: req.body.city,
      };
      users.push(user);
      writeFile(pathToUsersFile, users, res);
      res.send(user);
    })
    .catch((error) => res.status(500).send(error.message));
});

// Изменить пользователя
app.put('/users/:id', validate.reqParams(schema.reqParams), validate.reqBody(schema.reqBody), (req, res) => {
  readFile(pathToUsersFile)
    .then((users) => {
      const user = users.find(({ id }) => id === Number(req.params.id));
      if (user) {
        user.firstName = req.body.firstName;
        user.secondName = req.body.secondName;
        user.age = req.body.age;
        user.city = req.body.city ? req.body.city : user.city;
        writeFile(pathToUsersFile, users, res);
        res.send({ user });
      }
    })
    .catch((error) => res.status(500).send(error.message));
});

// Удалить пользователя
app.delete('/users/:id', validate.reqParams(schema.reqParams), (req, res) => {
  readFile(pathToUsersFile)
    .then((users) => {
      const user = users.find(({ id }) => Number(id) === Number(req.params.id));
      if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        writeFile(pathToUsersFile, users, res);
        res.send(user);
      } else {
        res.status(404);
        res.send({ user: null });
      }
    })
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
