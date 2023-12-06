// Classes das cores de fundo
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
// Classes das imagens
const banner = document.querySelector('.app__image')
//Classe do Titulo
const titulo = document.querySelector('.app__title')
// Pegando todos os botões ALL
const botoes = document.querySelectorAll('.app__card-button')
//Pegando o Botão 'Começar' do Temporizador
const startPauseBt = document.querySelector('#start-pause')
//Pegando o Texto do Botão 'Começar'
const iniciarOuPausarBt = document.querySelector('#start-pause span')
//Pegando o Icone do botão 'Começar'
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon')
//Pegando o ID da div pra colocar o Tempo na Tela
const tempoNaTela = document.querySelector('#timer')



//Pegando o ID do input da musica checkbox
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('sons/luna-rise-part-one.mp3')
//Pegando as musicas do botão 'Começar' do temporizador
const musicaPlay = new Audio('sons/play.wav')
const musicaPause = new Audio('sons/pause.mp3')
const musicaAcabouTempo = new Audio('sons/beep.mp3')

// Variavel para o temporizador
let tempoDecorridoEmSegundos = 1500
let intervaloId = null

//Para dar Play ou Pause no chackbox 
musica.loop = true //Esse comando serve pra musica tocar o tempo inteiro
//Adicionando evento no checkbox da musica (change é o vento que usa quando é checkbox retorna true ou false )
musicaFocoInput.addEventListener('change', ()=> {
    if(musica.paused) {
        musica.play()
    }else {
        musica.pause()
    }
})



// Chamando a função clique alterando as classes de fundo e das imagens
focoBt.addEventListener('click', ()=> {
    //html.setAttribute('data-contexto', 'foco')//Cor de Fundo
    //banner.setAttribute('src', '/imagens/foco.png')//Imagem
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')//chamando a função

    focoBt.classList.add('active')//colonado a classe active em todos botões
})

curtoBt.addEventListener('click', ()=> {
    //html.setAttribute('data-contexto', 'descanso-curto')
    //banner.setAttribute('src', '/imagens/descanso-curto.png')
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')

    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', ()=> {
    //html.setAttribute('data-contexto', 'descanso-longo')
    //banner.setAttribute('src', '/imagens/descanso-longo.png')
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')

    longoBt.classList.add('active')
})

//Função para refaturar o código acima 'tirar repetições'
function alterarContexto(contexto) {
    mostrarTempo()//chamando a função aqui para mostrar o tempo correto em cada um dos descanso
    //Removendo a classe active dos botões pra não ficar todos ativos
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)

    //Metodo switch é como se fosso if e else, utilizando ele para alterar os texto
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pauda curta!</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar á superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}


//Função para o Temporizador (colocando em variavel)
const contagemRegressiva = ()=> {
    if(tempoDecorridoEmSegundos <= 0) {
        musicaAcabouTempo.play()
        alert('Tempo Finalizado')

        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('focoFianalizado')
            document.dispatchEvent(evento)
        }
        
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    //console.log('Temporizador ' + tempoDecorridoEmSegundos)
    mostrarTempo()
}
//Adicionando evento de click no botão 'começar'
startPauseBt.addEventListener('click', iniciarOuPausar)


function iniciarOuPausar () {
    if(intervaloId) {
        musicaPause.play()
        zerar()
        return
    }
    musicaPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    iniciarOuPausarBtIcone.setAttribute('src', `imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Começar'
    iniciarOuPausarBtIcone.setAttribute('src', `imagens/play_arrow.png`)
    intervaloId = null
}


//Função Mostrar tempo na tela
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`//esse sinal de dollar e chaves é chamado de template string
}
mostrarTempo() //chamando a função no escopo global para que o tempo sempre fique na tela