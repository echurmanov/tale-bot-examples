const Tale = require('@echurmanov/tale-api-client-ts');

const userName = ''; //Логин
const password = ''; //Пароль

const taleClient = new Tale.Client(
    'CardBot-0.1.0', // название клиента, формат СТРОКА-ВЕРСИЯ обязательно!
    'the-tale.org',
    'https',
);

taleClient.login(userName, password)
    .then(() => {
        botLogic(taleClient);  // Запуск логики бота при успешной авторизации
    })
    .catch((err) => {
        console.error(err); // Ошибка авторизации
    });


function botLogic(client) {
    const timerId = setTimeout(botLogic, 30 * 1000, client); // Заводим таймер на 30 секунд доследующей првоерки состояния

    // Запрашиваем состояние героя и список карт
    Promise.all([client.getInfo(), client.getCardsList()])
        .then(([gameInfoResponse, cardListResponse]) => {
            const heroInfo = gameInfoResponse.data.account.hero;
            const cardList = cardListResponse.data.cards;

            // Пример логики для автоматического использования карты Регенирация, в случае смерти персонажа

            if (!heroInfo.base.alive) {
                let cardForUse;

                // Выбираем из пула карту Регинирации. Сначала пробуем не продоваймую, если такой нет, то ищем продоваймую
                cardForUse = cardList.find((card) => card.type === 160 && !card.auction && card.in_storage);

                if (!cardForUse) {
                    cardForUse = cardList.find((card) => card.type === 160);
                }

                // Если хотим ограничить выбор карт, только теми, что в руке, то можно дополнить условия:
                // cardForUse = cardList.find((card) => card.type === 160 && !card.auction && !card.in_storage);

                // Если карта Регинирации есть, то используем ее.
                if (cardForUse) {
                    console.log("Use card \"" + cardForUse.name + "\" (id:"+cardForUse.uid+")");

                    return client.useCard(cardForUse.uid);
                } else {
                    console.log("Hero is dead, but no card =(");
                }
            }
        })
        .catch((error) => {
            clearTimeout(timerId); // Сбрасывае таймер на следующую првоерку, если была ошибка.
            console.error(error);
        });
}
