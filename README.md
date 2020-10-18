# tale-bot-examples
Примеры ботов для The Tale (https://the-tale.org) на основе api-клинта

## Подготовка

* Наличие nodejs (берем самую новую версию вот от сюда https://nodejs.org/)
* Устанавливаем зависимость (https://github.com/echurmanov/tale-api-client-ts) командой: `npm install`

## Использование

Правим шаблон кода в js-файле с помощью любого редактора (напрмер Notepad++) и запускам командой `node имя-файла.js`

## Примеры
* Авто-запрос боя на арене: [`src/arena/auto-call-to-arena.js`](src/arena/auto-call-to-arena.js)
  * задаем логин-пароль в переменные `userName` и `password`
* Авто-запрос принятие боя от целевого игрока: [`src/arena/auto-accept-target-hero.js`](src/arena/auto-accept-target-hero.js)
  * задаем логин-пароль в переменные `userName` и `password`
  * задаем id целевого игрока в переменую `targetAccountId`

Авторизация в этих примерах мдет через логин-пароль. Способ можно поменять. Примеры сопособов авторизацтт лежат в [`src/basic/`](src/basic/)
