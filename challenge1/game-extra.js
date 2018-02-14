var player1Height = prompt('Which height is player 1?: ');
var player2Height = prompt('Which height is player 2?: ');
var player1Age = prompt('Which age is player 1?: ');
var player2Age = prompt('Which age is player 2?: ');
var player3Height = prompt('Which height is player 3?: ');
var player3Age = prompt('Which age is player 3?: ');
//*______________________________________________*
var player1 = player1Height + (5*player1Age);
var player2 = player2Height + (5*player2Age);
var player3 = player3Height + (5*player3Age);
//*______________________________________________*
if(player1 > player2 && player1 > player3)
{   
    console.log('Player 3 with the score [ ' + player3 + ' ] is the WINNER!');
}
else if(player2 > player1 && player2 > player3)
{
    console.log('Player 2 with the score [ ' + player2 + ' ] is the WINNER!');
}
else if(player3 > player1 && player3 > player2)
{
    console.log('Player 3 with the score [ ' + player3 + ' ] is the WINNER!');
}
else if(player1 === player2 === player3)
{
    console.log('DRAW!! Three gamers are the same scores!!');
}
else if(player1 === player2 && player2 > player3)
{
    console.log('DRAW!! Player 1 and player 2!!');
}
else if(player1 === player3 && player3 > player2)
{
    console.log('DRAW!! Player 1 and player 3!!');
}
else
{
    console.log('DRAW!! Player 2 and player 3!!');
}


