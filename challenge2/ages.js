//Constructors are functions
function Crearobjetitos(){
    this.firstName = [];
    this.lastName = [];
    this.ageOfBirth = [];
    var temporalName =''; // variable to store the name that the prompt is asking.
    for(var i=0; i<=4; i++){
        temporalName = prompt('Which is the name ' + i + '?: ');
        this.firstName.push(temporalName);
        this.lastName.push(prompt('Which is the last name of ' + temporalName + '?: '));
        this.ageOfBirth.push(prompt('Which is the age of Birth of ' + temporalName + '?: '));
    }
}
alert('Array of Persons 1!: ');
var persons1 = new Crearobjetitos(); // I call the constructor and assign it to a variable -> pointer.
alert('Array of Persons 2!: ');
var persons2 = new Crearobjetitos();

function printFullAge(takeAges){ // I pass as an argument the object.
    var temporalAges = []; // store the array of years that you pass as an argument to the function in a variable(temporalAges).
    var arrayOfBooleans = [];

    temporalAges = takeAges.ageOfBirth; // Pointer where the years of the array of the object being treated are stored.
    for(var y=0; y<temporalAges.length; y++){
        //temporalAge is the actual age.
        var temporalAge = 2018 - temporalAges[y];
        if(temporalAge>=18){ 
            console.log('- [ ' + takeAges.firstName[y] + ' ' + takeAges.lastName[y] +' ]' + ' is ' + temporalAge + ' and also full age.');
            arrayOfBooleans.push(true);            
        }
        else{
            console.log('- [ ' + takeAges.firstName[y] + ' ' + takeAges.lastName[y] + ' ] ' + ' is ' + temporalAge + ' and also too young.');
            arrayOfBooleans.push(false);
        }
    }
    return arrayOfBooleans;  
}

var full_1 = printFullAge(persons1);
var full_2 = printFullAge(persons2);
console.log('---------------------------');
console.log('Full 1 --> ' + full_1);
console.log('Full 2 --> ' + full_2);