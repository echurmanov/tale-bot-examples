const Tale = require('@echurmanov/tale-api-client-ts');

const userName = '';
const password = '';

const targetAccountId = 53474;

const taleClient = new Tale.Client(
    'ArenaBot-0.1.0', // название клиента, формат СТРОКА-ВЕРСИЯ обязательно!
    'the-tale.org',
    'https',
);

taleClient.login(userName, password)
    .then(() => {
        arenaAutoAcceptBot(taleClient);  // Запуск логики бота при успешной авторизации
    })
    .catch((err) => {
        console.error(err); // Ошибка авторизации
    });


function arenaAutoAcceptBot(client) {
    const timerId = setTimeout(arenaAutoAcceptBot, 30 * 1000, client); // Заводим таймер на 30 секунд доследующей првоерки состояния

    Promise.all([client.getInfo(), client.pvpArenaInfo()])
        .then(([heroInfo, arenaInfo]) => {
            console.log("Check");

            // Если мы уже в бою - ни чего не делаем
            if (heroInfo.data.mode === 'pvp') return;

            console.log(arenaInfo.data.info.arena_battle_requests);

            // Ищем запрос от целевого героя
            const request = arenaInfo.data.info.arena_battle_requests.find(
                (req) => req.initiator_id === targetAccountId
            );

            if (!request) return; //  Если запроса нет - ни чего не делаем

            console.log("Accept call");
            return client.pvpAcceptArenaBattle(request.id); //Принимаем вызов
        })
        .catch((error) => {
            clearTimeout(timerId); // Сбрасывае таймер на следующую првоерку, если была ошибка.
            console.error(error);
        });
}