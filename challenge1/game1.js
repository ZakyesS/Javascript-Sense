// Variable statement.

var player1Height = prompt('Which height is player 1?: ');
var player2Height = prompt('Which height is player 2?: ');
var player1Age = prompt('Which age is player 1?: ');
var player2Age = prompt('Which age is player 2?: ');
// *----------------------------------*

// Scores
var player1 = player1Height + (5*player1Age);
var player2 = player2Height + (5*player2Age);
// *----------------------------------*

// Decides

if(player1 > player2)
{
    console.log('Player 1 with the score [ ' + player1 + ' ] is the WINNER!');
}
else if(player1 === player2) //both are same
{
    console.log('Player 1 with the score [ ' + player1 + ' ] and player 2 with score [ ' + player2 + ' ] are the same!! Its a draw!!');
}
else(player1 < player2)
{
    console.log('Player 2 with the score [ ' + player2 + ' ] is the WINNER!');
}

