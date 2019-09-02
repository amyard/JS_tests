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
        }
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
        expensesContainer: '.expenses__list'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };  
        },

        addListItem: function(obj, type){
            var html, newHtml, element;
            // create html string with blaceholder text
            if (type==='inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type==='exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
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
    };

    var ctrAddItem = function() {
        var input, newItem;

        // 1. get input data field
        input = UICtrl.getInput();

        // 2. add item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value)

        // 3. add new item to the UI
        UICtrl.addListItem(newItem, input.type);

        // 4.crear the fields
        UICtrl.clearFields();
        // 4. calculate the budget
        // 5. display the budget on the UI
    };


    // call main funtion
    return {
        init: function(){
            console.log('START');
            setupEventListeners();
        }
    };

})(budgetController, UIController); // budgetCtrl is same as budgetController - only another nam


// call our application
controller.init();