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
    `;
}

function writeFile(pathFile, data) {
  fs.writeFile(pathFile, JSON.stringify(data, '', 2), (err) => {
    if (err) {
      console.error('Ошибка записи файла!');
    }
  });
}

function handlerRequestGET(pageOptions, pathFile = PATH_TO_VIEWS_FILE) {
  return (req, res) => {
    let views = 0;

    fs.readFile(pathFile, 'utf-8', (error, data) => {
      if (error) console.error(error);

      const viewsData = JSON.parse(data);
      viewsData[req.url] += 1;
      views = viewsData[req.url];
      writeFile(pathFile, viewsData);

      res.send(renderPage({
        ...pageOptions,
        views,
      }));
    });
  };
}

app.get(
  '/',
  handlerRequestGET({
    title: 'Главная страница',
    link: { name: 'Страница about', href: '/about' },
  }),
);

app.get(
  '/about',
  handlerRequestGET({
    title: 'Страница about',
    link: { name: 'Главная страница', href: '/' },
  }),
);

app.listen(PORT);
