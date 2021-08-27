import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    document.title = 'Jogo da Velha - React'
  })
  
  const tabuleiroVazio = Array(9).fill('')
  const [tabuleiro, setTabuleiro] = useState(tabuleiroVazio)
  const [jogadorAtual, setJogadorAtual] = useState(gerarJogadorAleatorio)
  const [ganhador, setGanhador] = useState('')

  // dois jogadores
  // const objetoJogadores = [
  //   {
  //     jogador: '',
  //     pontos: 0,
  //     simbolo: ''
  //   },
  //   {
  //     jogador: '',
  //     pontos: 0,
  //     simbolo: ''
  //   }
  // ]
  // const [jogadores, setJogadores] = useState(objetoJogadores)
  // const [doisJogadores, setDoisJogadores] = useState(true)
  // const [temJogadores, setTemJogadores] = useState(false)
  
  // sempre que o array tabuleiro atualizar, chame a funcao
  useEffect(verificarGanhador, [tabuleiro])
  
  function gerarJogadorAleatorio(){
    const jogadroAleatorio = Math.floor(Math.random() * 2)
    if(jogadroAleatorio === 0) return 'O'
    if(jogadroAleatorio === 1) return 'X'
  }

  function cliqueCelula(index){
    if(tabuleiro[index] !== '') return null
    if(ganhador) return null

    setTabuleiro(tabuleiro.map((item, itemIndex) => (
      itemIndex === index ? jogadorAtual : item
    )))

    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X')
  }
  function verificarGanhador(){
    // 8 possibilidades de ganhar
    const formasDeGanhar = [
      // linhas
      [tabuleiro[0], tabuleiro[1], tabuleiro[2]],
      [tabuleiro[3], tabuleiro[4], tabuleiro[5]],
      [tabuleiro[6], tabuleiro[7], tabuleiro[8]],

      // colunas
      [tabuleiro[0], tabuleiro[3], tabuleiro[6]],
      [tabuleiro[1], tabuleiro[4], tabuleiro[7]],
      [tabuleiro[2], tabuleiro[5], tabuleiro[8]],

      // diagonais
      [tabuleiro[0], tabuleiro[4], tabuleiro[8]],
      [tabuleiro[2], tabuleiro[4], tabuleiro[6]]
    ]

    formasDeGanhar.forEach(celulas => {
      // se todos os elementos do array for igual a
      if(celulas.every(n => n === 'X')){
        console.log('X ganhou')
        setGanhador('X')
      }
      if(celulas.every(n => n === 'O')){
        console.log('O ganhou')
        setGanhador('O')
      }
      
      verificarEmpate()
    })
  }
  function verificarEmpate(){
    if(tabuleiro.every(n => n !== '')) setGanhador('E')
  }
  function reiniciarJogo(){
    if(ganhador === 'E'){
      setJogadorAtual(gerarJogadorAleatorio)
    }else{
      setJogadorAtual(ganhador)
    }

    setGanhador('')
    setTabuleiro(tabuleiroVazio)
  }

  // function adicionarJogadores(){
  //   setDoisJogadores(false)
  //   let jogadorUm = ''
  //   let jogadorDois = ''
  //   while(jogadorUm === ''){
  //     jogadorUm = window.prompt('Jogador 1:')
  //   }
  //   while(jogadorDois === ''){
  //     jogadorDois = window.prompt('Jogador 2:')
  //   }

  //   if(jogadorUm === null && jogadorDois === null){
  //     setDoisJogadores({jogador: 'Jogador 1', pontos: 0, simbolo: ''}, {jogador: 'Jogador 2', pontos: 0, simbolo: ''})
  //   }else if(jogadorUm === null && jogadorDois !== null){
  //     setDoisJogadores({jogador: 'Jogador 1', pontos: 0, simbolo: ''}, {jogador: jogadorDois, pontos: 0, simbolo: ''})
  //   }else{
  //     setDoisJogadores({jogador: jogadorUm, pontos: 0, simbolo: ''}, {jogador: 'Jogador 2', pontos: 0, simbolo: ''})
  //   }
  // }

  return (
    <main>
      {/* {doisJogadores &&
        <div>
        <h3>Gostaria de adicionar jogadores?</h3>
        <button onClick={adicionarJogadores}>Sim</button>
        <button onClick={() => setDoisJogadores(false)}>Não</button>
      </div>} */}

      <h1 className='titulo'>{`Jogo da Velha - vez de ${jogadorAtual}`}</h1>

      <div className={`tabuleiro ${ganhador ? 'fim-de-jogo' : ''} `}>
        {tabuleiro.map((item, index) => (
          <div
            className={`celula ${item}`}
            key={index}
            onClick={() => cliqueCelula(index)}>
              {item}
          </div>
        ))}
      </div>

      {ganhador && (
        <footer className='rodape'>
          <h2
          className='titulo-rodape'>
            <span
              className={`ganhador ${ganhador}`}>{ganhador !== 'E' ? ganhador : ''} </span>
              {ganhador !== 'E' ? `venceu!` : 'Empatou!'}
          </h2>

          <button className='botao-reiniciar' onClick={reiniciarJogo}>Recomeçar o jogo!</button>
        </footer>
      )}
    </main>
  );
}

export default App;
