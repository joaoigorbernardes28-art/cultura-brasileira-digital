
/* 1. MODO CLARO E ESCURO */
alert("JavaScript funcionando!");
const botaoTema = document.getElementById("botao-tema");

botaoTema.addEventListener("click", function () {
    document.body.classList.toggle("modo-escuro");

    const escuro = document.body.classList.contains("modo-escuro");

    botaoTema.textContent = escuro
        ? "Ativar modo claro"
        : "Ativar modo escuro";
});


/* 2. PESQUISA CULTURAL */

const campoPesquisa = document.getElementById("campo-pesquisa");
const mensagemPesquisa = document.getElementById("mensagem-pesquisa");
const artigosCulturais = document.querySelectorAll("#cultura article, #patrimonio article");

campoPesquisa.addEventListener("input", function () {
    const pesquisa = campoPesquisa.value.toLowerCase().trim();
    let encontrados = 0;

    artigosCulturais.forEach(function (artigo) {
        const texto = artigo.textContent.toLowerCase();
        const corresponde = texto.includes(pesquisa);

        artigo.style.display = corresponde ? "" : "none";

        if (corresponde) {
            encontrados++;
        }
    });

    mensagemPesquisa.textContent = encontrados === 0
        ? "Nenhuma manifestação cultural encontrada."
        : "";
});


/* 3. QUIZ CULTURAL */

const perguntas = [
    {
        pergunta: "Em que ano a Roda de Capoeira foi reconhecida pela UNESCO?",
        alternativas: ["2004", "2008", "2014", "2020"],
        correta: 2
    },
    {
        pergunta: "Qual manifestação cultural é tradicional do Recôncavo Baiano?",
        alternativas: ["Frevo", "Samba de Roda", "Maracatu", "Carnaval"],
        correta: 1
    },
    {
        pergunta: "Qual estado é especialmente conhecido pelo Bumba Meu Boi?",
        alternativas: ["São Paulo", "Paraná", "Maranhão", "Goiás"],
        correta: 2
    },
    {
        pergunta: "Qual manifestação cultural mistura luta, dança e música?",
        alternativas: ["Capoeira", "Forró", "Bossa Nova", "Frevo"],
        correta: 0
    },
    {
        pergunta: "Qual festa brasileira é conhecida pelos desfiles das escolas de samba?",
        alternativas: ["Natal", "Carnaval", "Páscoa", "Festa Junina"],
        correta: 1
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;

const elementoPergunta = document.getElementById("pergunta");
const elementoAlternativas = document.getElementById("alternativas");
const elementoResultado = document.getElementById("resultado");
const botaoProxima = document.getElementById("proxima");

function mostrarPergunta() {
    respondeu = false;

    const atual = perguntas[perguntaAtual];

    elementoPergunta.textContent = atual.pergunta;
    elementoAlternativas.innerHTML = "";
    elementoResultado.textContent = "";
    botaoProxima.style.display = "none";

    atual.alternativas.forEach(function (alternativa, indice) {
        const botao = document.createElement("button");

        botao.textContent = alternativa;
        botao.className = "alternativa";
        botao.type = "button";

        botao.addEventListener("click", function () {
            verificarResposta(indice);
        });

        elementoAlternativas.appendChild(botao);
    });
}

function verificarResposta(indice) {
    if (respondeu) return;

    respondeu = true;

    const correta = perguntas[perguntaAtual].correta;

    if (indice === correta) {
        pontuacao++;
        elementoResultado.textContent = "Resposta correta! Parabéns!";
        elementoResultado.style.color = "#087f5b";
    } else {
        const resposta = perguntas[perguntaAtual].alternativas[correta];

        elementoResultado.textContent =
            "Resposta incorreta! A resposta correta é: " + resposta;

        elementoResultado.style.color = "#c92a2a";
    }

    document.querySelectorAll(".alternativa").forEach(function (botao) {
        botao.disabled = true;
    });

    botaoProxima.textContent = perguntaAtual === perguntas.length - 1
        ? "Ver resultado"
        : "Próxima pergunta";

    botaoProxima.style.display = "inline-block";
}

botaoProxima.addEventListener("click", function () {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        elementoPergunta.textContent = "Quiz finalizado!";
        elementoAlternativas.innerHTML = "";

        elementoResultado.style.color = "";
        elementoResultado.textContent =
            "Você acertou " + pontuacao +
            " de " + perguntas.length + " perguntas!";

        botaoProxima.textContent = "Jogar novamente";
        botaoProxima.style.display = "inline-block";

        botaoProxima.onclick = function () {
            perguntaAtual = 0;
            pontuacao = 0;
            botaoProxima.onclick = null;
            mostrarPergunta();
        };
    }
});

mostrarPergunta();
