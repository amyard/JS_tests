'use strict';

// +promt - конвертирует из string to numb
var money = +prompt('Ваш бюджет на месяц?', ''),
    time = prompt('Введите дату в формате YYYY-MM-DD', '');


var appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: {},
    savings: false
}

for (let i = 0; i < 2; i++) {
    let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
        b = +prompt("Во сколько обойдется?", '');
    
    if( (typeof(a)) ==='string' && (typeof(a) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50 ) ) {
        appData.expenses[a] = b;
    } else {
        --i;
    }
};

appData.moneyPerDay = appData.budget / 30;

console.log(appData);

if (appData.moneyPerDay < 100) {
    console.log('Минимальный уровень достатка')
} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
    console.log('Средний уровень достатка')
} else if (appData.moneyPerDay > 2000) {
    console.log('Высщкий уровень достатка')
} else {
    console.log('Houston, we have a problem')
}