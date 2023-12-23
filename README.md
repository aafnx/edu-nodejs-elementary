# Урок 4. Создание REST API с Express

Для того, чтобы пользователи хранились постоянно, а не только, когда запущен сервер, необходимо реализовать хранение массива в файле.

Подсказки:

- В обработчиках получения данных по пользователю нужно читать файл;
- В обработчиках создания, обновления и удаления нужно файл читать, чтобы убедиться, что пользователь существует, а затем сохранить в файл, когда внесены изменения;
- Не забывайте про `JSON.parse()` и `JSON.stringify()` — эти функции помогут вам переводить объект в строку и наоборот.

**Формат сдачи работы**:

Ссылка на гитхаб/гитлаб

Файл с кодом.
