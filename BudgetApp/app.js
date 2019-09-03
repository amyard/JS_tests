// Budget controller
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    // var allExpenses = [];
    // var allIncome = [];
    // var totalExpenses = 0;
    // collect all data here
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        // create new item with data
        addItem: function(type, des, val) {
            var newItem, ID;
            
            // get last id and create new id bigger on 1 than last id
            if (data.allItems[type].lenght > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1
            } else {
                ID = 0;
            }
            
            // create new item based on type 
            if (type==='exp') {
                newItem = new Expense(ID, des, val);
            } else if (type==='inc') {
                newItem = new Income(ID, des, val);
            }

            // push into new structure
            data.allItems[type].push(newItem);
            return newItem;
        },

        calculateBudget: function() {
            // calculate total incime and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate the budget : income -expenses
            data.budget = data.totals.inc - data.totals.exp;

            // проверка дабы не делить на ноль
            if(data.totals.inc > 0) {
                // calculate the percentage of income that we spent
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

            
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function() {
            console.log(data)
        }
    };

})();



// UI controller
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel:'.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };  
        },

        addListItem: function(obj, type){
            var html, newHtml, element;
            // create html string with blaceholder text
            if (type==='inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type==='exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // insert html into the dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        // clean input fields
        clearFields: function() {
            var fields, fieldsArr;
            
            // return list
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            // conver list to array
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value ="";
            });

            // focus on the first element of array
            fieldsArr[0].focus();
        },

        // change budget data
        displayBudget: function(obj){
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;
            
        
            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage+'%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        getDOMstrings: function(){
            return DOMstrings;
        }
    }
})();



// global app controller
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){

        // get variables from DOMstrings
        var DOM = UICtrl.getDOMstrings();

        // click on btn confirm
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrAddItem);

        // the user click on ENTER btn after fill some data
        document.addEventListener('keypress', function(event) {
            if(event.keyCode===13 || event.which===13) {
                ctrAddItem();
            }
        });

        // delete btn
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem); 
    };

    var updateBudget = function() {
        // 1. calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();

        // 3. display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var ctrAddItem = function() {
        var input, newItem;

        // 1. get input data field
        input = UICtrl.getInput();

        // check if we have some data
        if(input.description!=="" && !isNaN(input.value) && input.value > 0) {
            
            // 2. add item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value)

            // 3. add new item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4.crear the fields
            UICtrl.clearFields();

            // 5. calculate and update budget
            updateBudget();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;

        // event.target - при клике показывает, на какой елемент был клик
        // get the parent 'id' which will delete
        itemID = event.target.parentNode.parentNode.parentNode.id;    
        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = splitID[1];

            // 1. delete the item from data structure

            // 2. delete item from the UI

            // 3. Update and show the new budget
        }
    };


    // call main funtion
    return {
        init: function(){
            // display correct data than we reload a page
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });

            console.log('START');
            setupEventListeners();
        }
    };

})(budgetController, UIController); // budgetCtrl is same as budgetController - only another nam


// call our application
controller.init();