
// Pede ao usuario o numero de cartas

var num_cartas = 0;

while( num_cartas < 4 || num_cartas > 14 || num_cartas%2 != 0 ) {
    num_cartas = prompt("Digite um número de cartas par entre 4 e 14");
    num_cartas = parseFloat(num_cartas);
}

// Cria as cartas HTML

var aux = "";
for (let i = 0; i < num_cartas ; i++) {
    aux += ('<div id="carta'+i+'" class="carta" onclick="handle_click(this)"></div>');
}

var elemento = document.querySelector(".cartas");
elemento.innerHTML = aux;

// Coloca a imagem do verso das cartas

var cartas = elemento.children;

for (let carta of cartas) {
    carta.innerHTML = "<img src='files/front.png'>"
}

// Centraliza as cartas na janela

function centralizarCartas() {
    var tamCarta = 34+117+2;
    var cartasPorTela = Math.trunc( window.innerWidth/tamCarta );
    var larguraFila = cartasPorTela*tamCarta;
    var margem = Math.trunc( ( window.innerWidth - larguraFila )/2 );

    var elemento = document.querySelector(".cartas");
    elemento.style.margin = "auto " + margem + "px";
}

centralizarCartas();

// Centraliza as cartas se ha alteracoes na janela do navegador

window.addEventListener("resize", function () {
    centralizarCartas();
});


////////////////////
// Logica do jogo //
////////////////////

// Cria os indices para as cartas e as baralha

var indexCards = [];
var compare = [null,null];
var impedeSelecao = false;

var cont = 0;
for (let i = 0 ; i < num_cartas ; i += 2) {
    indexCards.push(cont);
    indexCards.push(cont);
    cont ++;
}

indexCards.sort( function () {
    return .5 - Math.random();
} );

// cria array com booleanos que verificam se a carta ainda pode ser virada

var verificadores = [];
for (let i = 0 ; i < num_cartas ; i ++) {
    verificadores.push(true);
}

// gestiona o click nas cartas

function handle_click(elemento) {

    var num = parseFloat( elemento.id.replace('carta','') );

    if ( verificadores[num] && !impedeSelecao ) {
        verificadores[num] = false;

        // vira a carta
        var index = indexCards[num];
        animarVirarCarta(elemento,index);

        // armazena a carta no comparador
        if (compare[0] == null) {
            compare[0] = num;
        } else if (compare[1] == null) {
            compare[1] = num;
        } 

        // compara as cartas se o comparador estiver cheio
        if ( compare[0] != null && compare[1] != null ) {
            impedeSelecao = true;
            setTimeout(compararCartas,1000);
        }

    }

}

function compararCartas(){

    if ( indexCards[compare[0]] == indexCards[compare[1]] ) {
        // cartas iguais 

        document.querySelector("#carta"+compare[0]).style.borderColor = "#32B72F";
        document.querySelector("#carta"+compare[1]).style.borderColor = "#32B72F";

    } else {
        // cartas diferentes

        verificadores[compare[0]] = true;
        var elemento = document.querySelector("#carta"+compare[0]);
        animarDesvirarCarta(elemento);

        verificadores[compare[1]] = true;
        var elemento = document.querySelector("#carta"+compare[1]);
        animarDesvirarCarta(elemento);

    }

    compare[0] = null;
    compare[1] = null;
    impedeSelecao = false;

}

// animacao para virar a carta

function animarVirarCarta(elemento,index) {
    elemento.style.transform = "rotateY(-90deg)";
    setTimeout(animarVirarCartaP2(elemento,index),250);
}

function animarVirarCartaP2(elemento,index) {
    elemento.querySelector("img").style.content = "url('files/logo"+index+".svg')";
    elemento.querySelector("img").style.transform = "rotateY(-180deg)";
    elemento.style.transform = "rotateY(-180deg)";
}

// animacao para des-virar a carta

function animarDesvirarCarta(elemento) {
    elemento.style.transform = "rotateY(-90deg)";
    setTimeout(animarDesvirarCartaP2(elemento),250);
}

function animarDesvirarCartaP2(elemento) {
    elemento.querySelector("img").style.content = "url('files/front.png')";
    elemento.querySelector("img").style.transform = "rotateY(0deg)";
    elemento.style.transform = "rotateY(0deg)";
}