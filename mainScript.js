
// Pede ao usuario o numero de cartas

var num_cartas = 0;

while( num_cartas < 4 || num_cartas > 14 || num_cartas%2 != 0 ) {
    num_cartas = prompt("Digite um número de cartas par entre 4 e 14");
    num_cartas = parseFloat(num_cartas);
}

// Cria variaveis do jogo

var indexConteudo = [];
var verificador = [];

var compare = [null,null];
var impedeSelecao = false;
var contadorJogadas = 0;

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

// Cria as cartas HTML

var aux = "";
for (let i = 0; i < num_cartas ; i++) {

    var logo = indexConteudo[i];

    aux += `
    <div id="carta${i}" class="carta" onclick="handle_click(this)" >
        <div class="verso face">
            <img src="files/front.png" alt="">
        </div>
        <div class="frente face virada">
            <img src="files/logo${logo}.svg" alt="">
        </div>
    </div>
    `;
}

var elemento = document.querySelector(".cartas");
elemento.innerHTML = aux;


// Centraliza as cartas na janela

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

centralizarCartas();

// Centraliza as cartas se ha alteracoes na janela do navegador

window.addEventListener("resize", function () {
    centralizarCartas();
});


////////////////////
// Logica do jogo //
////////////////////

// gestiona o click nas cartas

function handle_click(elemento) {

    var num = parseFloat( elemento.id.replace('carta','') );

    if ( verificador[num] && !impedeSelecao ) {

        // impede temporalmente a selecao da carta
        verificador[num] = false;

        // vira a carta
        virarCarta(elemento);
        
        // armazena a carta no comparador
        if (compare[0] == null) {
            compare[0] = num;
        } else if (compare[1] == null) {
            compare[1] = num;
        } 

        // aumenta o numero de jogadas em 1
        contadorJogadas++;

        // atualiza puntuacao
        atualizarPuntuacao();

        // compara as cartas se o comparador estiver cheio
        if ( compare[0] != null && compare[1] != null ) {
            impedeSelecao = true; 
            setTimeout(compararCartas, 1.00 * 1000);
        }

    }

}

function virarCarta(elemento) {
    elemento.querySelector(".verso").classList.toggle("virada");
    elemento.querySelector(".frente").classList.toggle("virada");
}

function compararCartas(){

    if ( indexConteudo[compare[0]] == indexConteudo[compare[1]] ) {
        // cartas iguais 

        for (let i = 0 ; i < compare.length ; i++) {
            elemento = document.querySelector("#carta"+compare[i]);
            elemento.querySelector(".frente").classList.add("encontrada");
        }
        
        verificarFimJogo();

    } else {
        // cartas diferentes

        for (let i = 0 ; i < compare.length ; i++) {
            verificador[compare[i]] = true;
            var elemento = document.querySelector("#carta"+compare[i]);
            virarCarta(elemento);
        }

    }

    compare[0] = null;
    compare[1] = null;
    impedeSelecao = false;

}

// verificar fim do jogo

function verificarFimJogo() {

    var cont = 0;
    for (let i = 0 ; i < verificador.length ; i++ ){
        if (!verificador[i]) {
            cont++;
        }
    }

    if (cont == verificador.length) {
        var mensagem = "Você ganhou em "+contadorJogadas+" jogadas!";
        alert(mensagem);
    }
}

function atualizarPuntuacao() {
    var elemento = document.querySelector(".puntuacao p");
    elemento.innerHTML = contadorJogadas;
}