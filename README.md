# Урок 3. Урок 3. Встроенные модули и фреймворк Express (WIP)

Напишите HTTP сервер на express и реализуйте два обработчика `/` и `/about`, где:

- На каждой странице реализован счетчик просмотров;
- Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница;
- Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы;
- Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер;
