//declarar o script no fim do body ou usar onload
const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

// ajax, com clique na paginação
function Clicado(link, outro, outro2, tipo) {
    $('#link' + link).addClass('active');
    $('#link' + outro).removeClass('active');
    $('#link' + outro2).removeClass('active');

    switch (link) {
        case 1:
            var url = "populares.html";
            break;
        case 2:
            var url = "vendidos.html";
            break;
        case 3:
            var url = "avaliados.html";
    }

    $.ajax({
        url: url,
        success: result => {
            $('#conteudo').html(result);
            animacao(tipo);
        }
    });

};

function ClicadoFilme(link, outro, outro2, tipo) {
    $('#filme' + link).addClass('active');
    $('#filme' + outro).removeClass('active');
    $('#filme' + outro2).removeClass('active');

    switch (link) {
        case 1:
            var url = "filmes_populares.html";
            break;
        case 2:
            var url = "bilheteria.html";
            break;
        case 3:
            var url = "avaliados_filme.html";
    }

    $.ajax({
        url: url,
        success: result => {
            setTimeout(function() {
                $('#conteudo_filme').html(result);
            },200);
            animacao(tipo);
        }
    });

}

// Animação quando muda o conteúdo
let tempo = function (tipo) {
    setTimeout(function () {
        if(tipo == 'filme') {
            document.querySelector('#conteudo_filme').classList.add(animationClass);
        }else if(tipo == 'jogo') {
            document.querySelector('#conteudo').classList.add(animationClass);
        }
    }, 300);
}

function animacao(tipo) {
    if(tipo == 'filme') {
        if ($("#conteudo_filme").hasClass(animationClass)) {
            document.querySelector('#conteudo_filme').classList.remove(animationClass);
            tempo(tipo);
        } else {
            tempo(tipo);
        }
    }else {
        if ($("#conteudo").hasClass(animationClass)) {
            document.querySelector('#conteudo').classList.remove(animationClass);
            tempo(tipo);
        } else {
            tempo(tipo);
        }
    }
}

// Animação com Scroll
function animeScroll() {
    //window.pageYOffset distância do scroll pro topo do site
    const windowTop = window.pageYOffset + (window.innerHeight * 0.85);

    target.forEach(function (element) {
        if (windowTop > element.offsetTop) {
            element.classList.add(animationClass);
        } else {
            element.classList.remove(animationClass);
        }

        // console.log(element.offsetTop);
    });
}

animeScroll();

if(target.length) {
    window.addEventListener('scroll', function () {
        animeScroll();
    });
}

// Animação com slide
// Pega todos os elementos da li e retorna um objeto NodeList (todas as li dentro do conteudo sliders)
let sliders = document.querySelectorAll('#sliders li');
let sliders_2 = document.querySelectorAll('#sliders_2 li');

// Indice que será responsável por informar o slider atual
let indice = 0;

// retorna o total de itens do slide, diminui -1 devido o primeiro item ser 0
let total = sliders.length - 1;
// função executada em um intervalo de tempo de 3 segundos
window.setInterval(function () {

    // index é responsável pela posição do elemento que iremos remover a classe
    let index = indice ? indice - 1 : total;

    // pega o elemento pra remover a classe
    sliders[index].className = '';
    sliders_2[index].className = '';
    
    // pega o elemento atual pra adicionar a classe
    sliders[indice].className = 'slider-active';
    sliders_2[indice].className = 'slider-active';

    // calcula a posição do próximo elemento que será exibido
    indice = indice >= total ? 0 : indice + 1;

}, 3000);