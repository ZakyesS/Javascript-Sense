// BUDGET CONTROLLER
var budgetController = (function(){
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){ //current element.
            sum += cur.value;
        });
        data.totals[type] = sum; //store in data property totals in exp or inc the value of sum.
    };
    var data = {  // data structure.
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1 //cause -1 is non exist
    };
    return{
        addItem: function(type, des, val){ // type will be exp(-) or inc(+).
            var newItem, ID;
            
            //create new ID.
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length -1].id +1;
            }
            else{
                ID = 0;
            }
            
            // Create new Item based on 'inc' or 'exp' type.
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            // Push it into our data structure.
            data.allItems[type].push(newItem);
            
            // Return the new element. 
            return newItem;
        },
        deleteItem: function(type, id){
            var ids, index;
            ids = data.allItems[type].map(function(current){ //map for loop the array allItems.
                return current.id;    
            });
            index = ids.indexOf(id); //stores the id wich we pass in deleteItem on the array ids. 
            if(index !== -1){
                data.allItems[type].splice(index, 1); //splice is to remove elements on an array.
            }
        },
        calculateBudget: function(){
            
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget: income - expenses.
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the percentage of income that we spent.
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
            else{
                data.percentage = -1;
            }
        },
        getBudget: function(){
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
    };

})();

//UI CONTROLLER
var UIController = (function(){
    var DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
        
    };
    return{ 
        getInput: function(){ //public method to acces to private data.
            return{
                type: document.querySelector(DOMstring.inputType).value, // will be either inc or exp.
                description: document.querySelector(DOMstring.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstring.inputValue).value)
            };
        },
        addLisItem: function(obj, type){
            var html, newHtml, element;

            // Create HTML srting with placeholder text.
            if(type === 'inc'){
                element = DOMstring.incomeContainer; //add in element the property incomeContainer of DOMstring which contains the class income__list.
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else if(type === 'exp'){
                element = DOMstring.expensesContainer; // add in element the property expensesContainer of DOMstring which contains the class expenses__list.
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // Replace the placeholder text with some actual data.
            // replace -->  method for the strings (that are an objects)
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the  HTML into the DOM.
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);

        },
        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstring.inputDescription + ', '+ DOMstring.inputValue);
            /* With de querySelectorAll the values which stored in inputDescription and in inputValue 
            are selected and stored in fields, which is a list(is not the same to an array, but similar).*/
            fieldsArr = Array.prototype.slice.call(fields);
            /* Because fields isn't an array, and the method slice is for them, with:
                1. Array(function Constructor for the arrays).
                2. prototype(every object inherit the protype property of his function Constructor which
                means every methods that the function has).
                3. slice(this method return an array). 
                With this trick we can have an array from a list, then fieldsArr is now an array. */
            fieldsArr.forEach(function(current, index, array){ // This forEach will loop the array fieldsArr and set te value of each elements to an empty string. This means to clear the text fields of the webpage.
                current.value = '';
            });
            fieldsArr[0].focus(); //Set the focus on the first array element.
        },
        displayBudget: function(obj){
            document.querySelector(DOMstring.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstring.incomeLabel).textContent = obj.totalIncome;           
            document.querySelector(DOMstring.expensesLabel).textContent = obj.totalExp;           
            if(obj.percentage > 0){
                document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage;           
            }
            else{
                document.querySelector(DOMstring.percentageLabel).textContent = '---';            
            }
        },

        getDOMstrings: function(){
            return DOMstring;
        }
    };
})();

//GLOBAL CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
    var setupEventListener = function(){
        var DOM = UICtrl.getDOMstrings(); //this DOM is an object that stores the public method of UIController.
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem); //here ctrlAddItem is a callback function.
        document.addEventListener('keypress', function(key){
            if(key.keyCode === 13 || key.which === 13){ //which is for older browsers.
                ctrlAddItem();
            }
        });  
        document.querySelector(DOM.container).addEventListener('click', ctrDeleteItem); //for event delegation  
    };
    var updateBudget = function(){ //this is called each time when we enter a new item in the UI.
        //1. Calculate the budget.
        budgetCtrl.calculateBudget();
        //2. Return the Budget.
        var budget = budgetCtrl.getBudget();
        //3. Display the budget on the UI.
        UICtrl.displayBudget(budget);
    };
    var ctrlAddItem = function(){
        var input, newItem; // local and privates variables, and nothing to see with the newItem to budget Controller.

        //1. Get the field input data.
        input = UICtrl.getInput();
        if(input.description !== '' && !isNaN(input.value) && input.value >0){ //only happens when we can take values that we can use.
            //2. Add the item to the budget controller.
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add the item to the UI.
            UICtrl.addLisItem(newItem, input.type);

            // 4. Clear the fields.
            UICtrl.clearFields();

            //5. Calculate and update budget.
            updateBudget();

        }

    };

    var ctrDeleteItem = function(event){
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; //this allows us to get the id of the parent element.
        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0]; //0 is posicion of type(inc or exp).
            ID = parseInt(splitID[1]); //converts a string to integers.

            // 1. Delete item from the data structure.
            budgetCtrl.deleteItem(type, ID);
            //2. Delete the item from the UI.
            UICtrl.deleteListItem(itemID);
            //3. Update and show the new budget.
            updateBudget();
        }
    };
    return{ //public methods for the Global Controller.
        init: function(){
            console.log('Aplicacion inicializada');
            UICtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListener();
        }
    };
})(budgetController, UIController);
controller.init();