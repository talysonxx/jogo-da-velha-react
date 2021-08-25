import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    document.title = 'Jogo da Velha - React'
  })
  
  const tabuleiroVazio = Array(9).fill('')
  const [tabuleiro, setTabuleiro] = useState(tabuleiroVazio)
  const [jogadorAtual, setJogadorAtaul] = useState('X')
  const [ganhador, setGanhador] = useState('')
  
  // sempre que o array tabuleiro atualizar, chame a funcao
  useEffect(verificarGanhador, [tabuleiro])
  
  function cliqueCelula(index){
    if(tabuleiro[index] !== '') return null

    if(ganhador){
      alert('Recomece o jogo!')
      return null
    }

    setTabuleiro(tabuleiro.map((item, itemIndex) => (
      itemIndex === index ? jogadorAtual : item
    )))
    setJogadorAtaul(jogadorAtual === 'X' ? 'O' : 'X')
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
    if(tabuleiro.every(n => n !== '')) setGanhador('Empatou!')
  }
  function reiniciarJogo(){
    setJogadorAtaul(ganhador)
    setGanhador('')
    setTabuleiro(tabuleiroVazio)
  }

  return (
    <main>
      <h1 className='titulo'>Jogo da Velha</h1>

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
              className={`ganhador ${ganhador}`}>{ganhador}
            </span>
              {`${ganhador !== 'Empatou!' ? ' venceu!' : ''}`}
          </h2>

          <button className='botao-reiniciar' onClick={reiniciarJogo}>Recomeçar o jogo!</button>
        </footer>
      )}
    </main>
  );
}

export default App;
