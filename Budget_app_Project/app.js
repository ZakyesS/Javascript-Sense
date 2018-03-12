// BUDGET CONTROLLER
var budgetController = (function(){
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome)*100);

        }
        else{
            this.percentage = -1;
        }
    };
    Expense.prototype.getPercentage = function(){
        return this.percentage;
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
        calculatePercentages: function(){
            data.allItems.exp.forEach(function(current){
                current.calcPercentage(data.totals.inc);
            });
        },
        getPercentages: function(){
            var allPerc = data.allItems.exp.map(function(current){
                return current.getPercentage();
            });
            return allPerc;
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
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
        
    };
    var formatNumber = function(num, type){
        var numSplit, int, dec, type;
        /*
        + or - before number exactly.
        2 decimal points.
        comma separating the thousands.
        */
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int = numSplit[0];
        if(int.length > 3){
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510.
        }
        dec = numSplit[1];
        return (type === 'exp' ? '-' : '+') + int + '.' + dec;
    };
    var nodeListForEach = function(list, callback){
        for(var i=0; i<list.length; i++){
            callback(list[i], i);
        }
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
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else if(type === 'exp'){
                element = DOMstring.expensesContainer; // add in element the property expensesContainer of DOMstring which contains the class expenses__list.
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // Replace the placeholder text with some actual data.
            // replace -->  method for the strings (that are an objects)
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

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
            var type;
            obj.budget >0 ? type = 'inc' : type='exp';
            document.querySelector(DOMstring.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstring.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc');           
            document.querySelector(DOMstring.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');           
            if(obj.percentage > 0){
                document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage;           
            }
            else{
                document.querySelector(DOMstring.percentageLabel).textContent = '---';            
            }
        },
        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMstring.expensesPercLabel);
            nodeListForEach(fields, function(current, index){
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                }
                else{
                    current.textContent = '---';
                }
            });
        },
        displayMonth: function(){
            var now, year, month, months;
            now = new Date();
            months = ['Jan','Feb','Mar','Ap','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstring.dateLabel).textContent = months[month] + ' of ' + year;
        },
        changedType: function(){
            var fields = document.querySelectorAll(
                DOMstring.inputType + ',' + DOMstring.inputDescription + ',' + DOMstring.inputValue);
            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DOMstring.inputBtn).classList.toggle('red');
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
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };
    var updateBudget = function(){ //this is called each time when we enter a new item in the UI.
        //1. Calculate the budget.
        budgetCtrl.calculateBudget();
        //2. Return the Budget.
        var budget = budgetCtrl.getBudget();
        //3. Display the budget on the UI.
        UICtrl.displayBudget(budget);
    };
    var updatePercentages = function(){
        //1. Calculate percentages.
        budgetCtrl.calculatePercentages();
        //2. Read percentages from the budget controller.
        var percentages = budgetCtrl.getPercentages();
        //3. Update the UI with the new percentages.
        UICtrl.displayPercentages(percentages);
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
            //6. Calculate and update percentages.
            updatePercentages();

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
            //4. Calculate and update percentages.
            updatePercentages();
   
        }
    };
    return{ //public methods for the Global Controller.
        init: function(){
            console.log('Aplicacion inicializada');
            UICtrl.displayMonth();
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