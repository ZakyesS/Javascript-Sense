//variables for the game
var scores, roundScore, activePlayer, gamePlaying;
var diceDOM = document.querySelector('.dice'); //I create a variable because i don't want to use the querySelector when i want the dice one and one again.
var diceDOM2 = document.querySelector('.dice2'); //second dice in the game

function init(){    
    scores = [0,0]; //Is an array because i use 2 variables, for 2 playes.
    roundScore = 0; //This one is for the score is actually playing.
    activePlayer = 0; //This is the actual player who is gaming, now is 0 cause 0 is based position of the scores and first player is player1, then the second will be activePlayer = 1, so on.
    gamePlaying = true;

    diceDOM.style.display = 'none';
    diceDOM2.style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //this is a ternary operator, is a short if/else statement.
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //these two lines bellow use the toggle method for a class, and if a class is active then remove, and if its not, then active.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceDOM.style.display = 'none';
    diceDOM2.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
        //with the dice i will use a random number and i'll use a math method
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        diceDOM.style.display = 'block'; //to watch the dice.
        diceDOM2.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png'; //to watch the face of the dice.
        diceDOM2.src = 'dice-' + dice2 + '.png';

        if(dice !==1 && dice2 !==1){
            console.log('dado 1 vale [ ' + dice + ' ] y el dado 2 vale [ ' + dice2 + ' ].');
            roundScore += (dice + dice2);
            console.log('puntuacion actual = ' + roundScore);
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        else{
            console.log('-------------------------------------------------------------');
            console.log('dado 1 vale [ ' + dice + ' ] y el dado 2 vale [ ' + dice2 + ' ].');
            console.log('puntuacion actual = ' + roundScore);
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        scores[activePlayer] += roundScore; //add current score to Global score with the position of the activePlayer(0 or 1).
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if(scores[activePlayer] >= 25){
            document.getElementById('name-' + activePlayer).textContent = 'Winner!!';

            diceDOM.style.display = 'none';
            diceDOM2.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else{
            nextPlayer();
        }
    }
});
init();