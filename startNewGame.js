
// Variaveis do jogo //

var num_cartas;
var indexConteudo;
var verificador;

var compare;
var impedeSelecao;


// Variaveis informacao //

var contadorJogadas;
var T0;
var T;
var jogoAcabou;

function comecarNovoJogo() {

    // Pede ao usuario o numero de cartas

    num_cartas = 0;

    while( num_cartas < 4 || num_cartas > 14 || num_cartas%2 != 0 ) {
        num_cartas = prompt("Digite um número de cartas par entre 4 e 14");
        num_cartas = parseFloat(num_cartas);
    }

    // Inicializa variaveis do jogo

    indexConteudo = [];
    verificador = [];

    compare = [null,null];
    impedeSelecao = false;
    contadorJogadas = 0;

    var cont = 0;
    for (let i = 0 ; i < num_cartas ; i += 2) {
        indexConteudo.push(cont);
        indexConteudo.push(cont);
        verificador.push(true);
        verificador.push(true);
        cont ++;
    }

    indexConteudo.sort( function () {
        return 0.5 - Math.random();
    } );


    // Inicializa variaveis das informacoes 

    contadorJogadas = 0;
    T = 0;
    jogoAcabou = false;


    // Cria as cartas HTML

    var aux = "";
    for (let i = 0; i < num_cartas ; i++) {

        var logo = indexConteudo[i];

        aux += `
        <div id="carta${i}" class="carta" onclick="handle_click(this)" data-identifier="card" >
            <div class="verso face" data-identifier="back-face">
                <img src="files/front.png" alt="">
            </div>
            <div class="frente face virada" data-identifier="front-face">
                <img src="files/logo${logo}.svg" alt="">
            </div>
        </div>
        `;
    }

    var elemento = document.querySelector(".cartas");
    elemento.innerHTML = aux;


    // atualiza as informacoes
    var elemento = document.querySelector(".info-jogo");
    elemento.classList.remove("oculto");

    atualizarPuntuacao();
    atualizarRelogio();


    // Centraliza as cartas na janela
    centralizarCartas();

}

function centralizarCartas() {
    var tamCarta = 34+117+2;
    var cartasPorTela = Math.trunc( window.innerWidth/tamCarta );
    var larguraFila = cartasPorTela*tamCarta;
    var margem = Math.trunc( ( window.innerWidth - larguraFila )/2 );

    var elemento = document.querySelector(".cartas");
    elemento.style.margin = "auto " + margem + "px";

    var elemento = document.querySelector(".info-jogo");
    elemento.style.width = Math.min(num_cartas,cartasPorTela)*tamCarta - 34 + "px";
}