const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PATH_TO_VIEWS_FILE = path.join(__dirname, 'views.json');

const app = express();

function renderPage(options) {
    return `
        <h1>${options.title}</h1>
        <a href="${options.link.href}">${options.link.name}</a>
        ${options.views ? `<p>Просмотров — ${options.views}</p>` : ''}
    `
};

function writeFile(path, data) {
    fs.writeFile(path, JSON.stringify(data, '', 2), err => {
        if (err) {
            console.error('Ошибка записи файла!');
        }
    });
};

function handlerRequestGET(req, res, pageOptions, path = PATH_TO_VIEWS_FILE) {
    let views = 0;

    fs.readFile(path, 'utf-8', (error, data) => {
        if (error) console.error(error);

        const viewsData = JSON.parse(data);
        views = ++viewsData[req.url];
        writeFile(path, viewsData);

        res.send(renderPage({
            ...pageOptions,
            views: views,
        }));
    });
};


app.get('/', (req, res) => {
    handlerRequestGET(req, res, {
        title: 'Главная страница',
        link: { name: 'Страница about', href: '/about', },
    })
});

app.get('/about', (req, res) => {
    handlerRequestGET(req, res, {
        title: 'Страница about',
        link: { name: 'Главная страница', href: '/', },
    })
});

app.listen(PORT);