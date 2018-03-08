var Question  = function(ques, correctans){
    this.question = ques;
    this.answerschoose =[];
    this.correctAnswer = correctans;

   /* this.answers = function(ans1, ans2, ans3){
        this.answerschoose.push(ans1,ans2,ans3);
    };
    this.checkAnswer = function(answer, tempoquest){ //le paso una pregunta(numero).
        for(var i=0; i<tempoquest.answerschoose.length; i++){
            if(answer === tempoquest.correctAnswer){
                alert('Correcta, Pasa a la siguiente pregunta -> ' + addEventListener('click',function(){
                    makeRandomQuestion();
                }));
            }
            else{
                alert('Lo siento, vuelvelo a intentar :( ' + addEventListener('click',function(){
                    //temporalQuestion.checkAnswer(getAnswer);
                    this.checkAnswer(answer, tempoquest);
                }));
            }
        }
    }*/
};
Question.prototype.answers = function(ans1, ans2, ans3){
    this.answerschoose.push(ans1,ans2,ans3);
};
Question.prototype.checkAnswer = function(answer, tempoquest){ //le paso una pregunta(numero).
    console.log(typeof(answer), typeof(tempoquest.correctAnswer));
        if(parseInt(answer) === tempoquest.correctAnswer){
        alert('Correcta');
    }
    else{
        alert('Incorrecta');
    }
};
var question1 = new Question('¿De qué color es el caballo blanco de Santiago?: ',2);
question1.answers('[1]. Negro.','[2]. Blanco.','[3]. No sé.');
var question2 = new Question('Si un gallo pone un huevo en lo alto de una torre, ¿hacia dónde cae el huevo?: ',3);
question2.answers('[1]. Hacia la derecha.','[2]. Hacia la izquierda.','[3]. Hacia ningún lado.'); //correcta los gallos no ponen huevos.
var question3 = new Question('Estás encerrado en una habitación y hay tres puertas por las que puedes salir, en la primera ves a un asesino en serie, en la segunda ves a Freddy Krugger y en la tercera ves a un león hambriento ¿Por cuál te vas?: ',2);
question3.answers('[1]. Por la primera puerta.','[2]. Por la segunda puerta.','[3]. Por la tercera puerta.'); //Correcto por la segunda puerta ya que Freddy no existe.
var question4 = new Question('El padre de Juan tenía 4 hijos: Sisi, Sesi, y Sosi ¿Quién falta?: ',1);
question4.answers('[1]. Juan.','[2]. Paco.','[3]. Ana.');
var question5 = new Question('En una pecera hay 12 peces. Se ahogan dos... ¿Cuántos quedan?: ',3);
question5.answers('[1]. 6 peces.','[2]. 0 peces.','[3]. 12 peces.');
/*
console.log(question1.question, question1.answerschoose);
var correctans = prompt(question1.question + '\n' + '\n' + question1.answerschoose);
console.log(correctans);
console.log(question2.question, question2.answerschoose);
var correctans2 = prompt(question2.question + '\n' + '\n' + question2.answerschoose);
console.log(correctans2);
*/
//almacenar en un array los objetos creados y sacar una pregunta aleatoria.
//var arrQuestions = [question1.question, question2.question, question3.question, question4.question, question5.question];
//var arrQuestions = [question1, question2, question3, question4, question5];
//console.log(arrQuestions);
function makeRandomQuestion(){ //genero una pregunta aleatoria
    var arrQuestions = [question1, question2, question3, question4, question5];

    var randomQuestion = Math.floor(Math.random(arrQuestions)*5) + 1;
    console.log('pregunta aleatoria --> ' + randomQuestion);
    
    var temporalQuestion = arrQuestions[randomQuestion-1]; // en temporalQuestion se tiene el objeto pregunta del array randomQuestion.
    console.log(temporalQuestion);
    //console.log('Me meto en la funcion respuesta');
    console.log('--------------------------------------------------------     ');
    console.log('Pregunta: ' + temporalQuestion.question + '\n\n');
 
    console.log('Respuestas: ');
    for(var i=0; i<temporalQuestion.answerschoose.length; i++){
        //console.log('Me meto en el for');
        console.log(temporalQuestion.answerschoose[i]);
    }
    console.log('--------------------------------------------------------     ');
    respuesta(temporalQuestion);
}
function respuesta(tempQ){ //
    var getAnswer = prompt(tempQ.question + '\n' + '\n' + tempQ.answerschoose);
    console.log('Repuesta escogida: ' + getAnswer);
    tempQ.checkAnswer(getAnswer,tempQ);
}
makeRandomQuestion();