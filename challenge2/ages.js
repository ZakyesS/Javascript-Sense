//Los constructores son funciones
function crearobjetitos(){
    this.name = [];
    this.lastName = [];
    this.ageOfBirth = [];
    var temporalName =''; //variable para almacenar el nombre que va pidiendo el prompt
    for(var i=0; i<=4; i++){
        temporalName = prompt('Which is the name ' + i + '?: ');
        this.name.push(temporalName);
        this.lastName.push(prompt('Which is the last name of ' + temporalName + '?: '));
        this.ageOfBirth.push(prompt('Which is the age of Birth of ' + temporalName + '?: '));
    }
}
alert('Array of Persons 1!: ');
var persons1 = new crearobjetitos(); //llamo al constructor y se la asigno a una variable?
alert('Array of Persons 2!: ');
var persons2 = new crearobjetitos();
console.log(persons1);
console.log(persons2);

// testeo
//------------------------------------------
//var arrayAges = persons1.ageOfBirth; //aquí almaceno en un array los años de la propiedad ageOfBirth del objeto persons1
function printFullAge(takeAges){
    var temporalAges = []; //amacenar el array de años que le pasas como argumento a la funcion.
    var testboolean;
    var arrayOfBooleans = [];

    for(var z=0; z<takeAges.length; z++){
        temporalAges.push(takeAges[z]);
    }
    // console.log('temporal person --> ' + temporalPerson);
    for(var y=0; y<temporalAges.length; y++){
        testboolean = false;
        for(var l=0;l<persons1.ageOfBirth;l++)
        {
            if(temporalAges[y] === persons1.ageOfBirth[l])
            {
                console.log('estoy imprimiendo el año del persons 1 --> ' + persons1.ageOfBirth[l]);
                testboolean = true;
            }
        }
        //temporalAge es la edad actual.
        var temporalAge = 2018 - temporalAges[y];
        if(temporalAge>=18){ 
            if(testboolean === true){
                console.log('- [ ' + persons1.name[y] + ' ' + persons1.lastName[y] +' ]' + ' is ' + temporalAge + ' and also full age.');
                arrayOfBooleans.push(true);
            }
            else{
                console.log('[ ' + persons2.name[y] + ' ' + persons2.lastName[y] + ' ]' + ' is ' + temporalAge + ' and also full age.');            
                arrayOfBooleans.push(true);
            }
        }
        else{
            if(testboolean === true){
                console.log('- [ ' + persons1.name[y] + ' ' + persons1.lastName[y] + ' ] ' + ' is ' + temporalAge + ' and also too young.');
                arrayOfBooleans.push(false);
            }
            else{
                console.log('[ ' + persons2.name[y] + ' ' + persons2.lastName[y] + ' ]' + ' is ' + temporalAge + ' and also too young.');            
                arrayOfBooleans.push(false);
            }
        }
    }
    return arrayOfBooleans;  
}

var full_1 = printFullAge(persons1.ageOfBirth);
var full_2 = printFullAge(persons2.ageOfBirth);
console.log('Full 1 --> ' + full_1);
console.log('Full 2 --> ' + full_2);

//------------------------------------------
// Fin de testeo
