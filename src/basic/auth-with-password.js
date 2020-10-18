const Tale = require('tale-api-client-ts');

const userName = ''; // логин
const password = ''; // пароль

const taleClient = new Tale.Client(
    'ArenaBot-0.1.0', // название клиента, формат СТРОКА-ВЕРСИЯ обязательно!
    'the-tale.org',
    'https',
);

taleClient.login(userName, password)
    .then(() => {
        botLogicCycling(taleClient);  // Запуск логики бота при успешной авторизации
    })
    .catch((err) => {
        console.error(err); // Ошибка авторизации
    });


function botLogicCycling(client) {
    const timerId = setTimeout(botLogicCycling, 30 * 1000, client); // Заводим таймер на 30 секунд доследующей првоерки состояния

    Promise.all([client.getInfo()]) // Список запросов к игре, прежде чем принимать решение
        .then(([heroInfo]) => {
            // TODO: логика бота
        })
        .catch((error) => {
            clearTimeout(timerId); // Сбрасывае таймер на следующую првоерку, если была ошибка.
            console.error(error);
        });
}