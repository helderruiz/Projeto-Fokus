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


// Chamando a função clique alterando as classes de fundo e das imagens
focoBt.addEventListener('click', ()=> {
    //html.setAttribute('data-contexto', 'foco')//Cor de Fundo
    //banner.setAttribute('src', '/imagens/foco.png')//Imagem

    alterarContexto('foco')//chamando a função

    focoBt.classList.add('active')//colonado a classe active em todos botões
})

curtoBt.addEventListener('click', ()=> {
    //html.setAttribute('data-contexto', 'descanso-curto')
    //banner.setAttribute('src', '/imagens/descanso-curto.png')

    alterarContexto('descanso-curto')

    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', ()=> {
    //html.setAttribute('data-contexto', 'descanso-longo')
    //banner.setAttribute('src', '/imagens/descanso-longo.png')

    alterarContexto('descanso-longo')

    longoBt.classList.add('active')
})

//Função para refaturar o código acima 'tirar repetições'
function alterarContexto(contexto) {
    //Removendo a classe active dos botões pra não ficar todos ativos
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

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
