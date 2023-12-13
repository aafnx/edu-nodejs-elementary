import http from 'http';

const PORT = 3000;

function initMarkUp(options) {
    let pageViews = 0;
    return function () {
        return `
            <h1 style="background: ${options.bgc};">${options.title}</h1>
            <a href="${options.link.href}">${options.link.name}</a>
            <p>Просмотров — ${++pageViews}</p>
        `;
    };
}

const responseHeadHTML = {
    "Content-Type": "text/html; charset=UTF-8;"
}

const indexPageMarkup = initMarkUp({
    title: "Главная",
    bgc: "purple",
    link: {
        name: "Обо мне",
        href: "/about",
    },
});

const aboutPageMarkup = initMarkUp({
    title: "Обо мне",
    bgc: "green",
    link: {
        name: "Главная",
        href: "/",
    },
});

const notFoundPageMarkup = initMarkUp({
    title: "404 — страница не найдена",
    bgc: "red",
    link: {
        name: "Главная",
        href: "/",
    },
})

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, responseHeadHTML);
        res.end(indexPageMarkup());
    } else if (req.url === "/about") {
        res.writeHead(200, responseHeadHTML);
        res.end(aboutPageMarkup());
    } else {
        res.writeHead(404, responseHeadHTML);
        res.end(notFoundPageMarkup());
    }
});

server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
