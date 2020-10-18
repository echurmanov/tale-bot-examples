const Tale = require('@echurmanov/tale-api-client-ts');

const userName = '';
const password = '';

const taleClient = new Tale.Client(
    'ArenaBot-0.1.0', // название клиента, формат СТРОКА-ВЕРСИЯ обязательно!
    'the-tale.org',
    'https',
);

taleClient.login(userName, password)
    .then(() => {
        arenaAutoCallBot(taleClient);  // Запуск логики бота при успешной авторизации
    })
    .catch((err) => {
        console.error(err); // Ошибка авторизации
    });


function arenaAutoCallBot(client) {
    const timerId = setTimeout(arenaAutoCallBot, 30 * 1000, client); // Заводим таймер на 30 секунд доследующей првоерки состояния

    Promise.all([client.getInfo(), client.pvpArenaInfo()])
        .then(([heroInfo, arenaInfo]) => {
            const myId = heroInfo.data.account.id;

            // Если мы уже в бою - ни чего не делаем
            if (heroInfo.data.mode === 'pvp') return;

            // Если наш запрос уже есть на арене - ни чего не делаем
            if (arenaInfo.data.info.arena_battle_requests.some((req) => req.initiator_id === myId)) return;

            console.log("Call to Arena");
            return client.pvpCallToArena(); //Отправляем запрос на арену
        })
        .catch((error) => {
            clearTimeout(timerId); // Сбрасывае таймер на следующую првоерку, если была ошибка.
            console.error(error);
        });
}