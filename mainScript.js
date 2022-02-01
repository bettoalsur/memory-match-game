
// Pede ao usuario o numero de cartas

var num_cartas = 0;

while( num_cartas < 2 || num_cartas > 14 || num_cartas%2 != 0 ) {
    num_cartas = prompt("Digite um número de cartas par entre 2 e 14");
    num_cartas = parseFloat(num_cartas);
}

// Cria as cartas HTML

var aux = "";
for (let i = 0; i < num_cartas ; i++) {
    aux += ('<div class="carta"></div>');
}

var elemento = document.querySelector(".cartas");
elemento.innerHTML = aux;

centralizarCartas();

// Centraliza as cartas na janela

function centralizarCartas() {

    var tamCarta = 34+117+2;
    var cartasPorTela = Math.trunc( window.innerWidth/tamCarta );
    var larguraFila = cartasPorTela*tamCarta;
    var margem = Math.trunc( ( window.innerWidth - larguraFila )/2 );

    var elemento = document.querySelector(".cartas");
    elemento.style.margin = "auto " + margem + "px";
}

