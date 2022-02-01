
// Pede ao usuario o numero de cartas

var num_cartas = 0;

while( num_cartas < 2 || num_cartas > 14 || num_cartas%2 != 0 ) {
    num_cartas = prompt("Digite um número de cartas par entre 2 e 14");
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
var puntero = 0;

var cont = 0;
for (let i = 0 ; i < num_cartas ; i += 2) {
    indexCards.push(cont);
    indexCards.push(cont);
    cont ++;
}

indexCards.sort( function () {
    return .5 - Math.random();
} );

// gestiona o click nas cartas

function handle_click(elemento) {

    var num = parseFloat( elemento.id.replace('carta','') );
    var index = indexCards[num];

    elemento.querySelector("img").style.content = "url('files/logo"+index+".svg')";
}
