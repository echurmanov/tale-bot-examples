const Tale = require('@echurmanov/tale-api-client-ts');

const sessionId = ''; // сессия из кук
const csrfToken = ''; // токен из кук

const taleClient = new Tale.Client(
    'ArenaBot-0.1.0', // название клиента, формат СТРОКА-ВЕРСИЯ обязательно!
    'the-tale.org',
    'https',
    {
        sessionId,
        csrfToken
    }
);

botLogicCycling(taleClient);

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