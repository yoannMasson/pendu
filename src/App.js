import React, { Component } from 'react';
import Clavier from './Clavier';
import RandomWords from 'random-words'
import './App.css';

const DEFAULT_STATE = {
  usedLetters: [],
  secret:RandomWords().toLocaleUpperCase(),
  nbTryLeft: 10,
  won : false
} 
class App extends Component{

  static defaultProps = { ...DEFAULT_STATE }

  constructor(props){
    super(props)
    this.state = {
      secret: props.secret,
      usedLetters : props.usedLetters,
      nbTryLeft: props.nbTryLeft,
      won: props.won
    }
  }

  render = () =>{
    return (
      <div className="jeu">
        { !this.state.won && (
          <div>
            <Clavier handleClickOnChar={this.handleClickOnChar} usedLetters={this.state.usedLetters} />
            <p> {this.computeDisplay(this.state.secret,this.state.usedLetters)}</p>
            <p> Il vous reste {this.state.nbTryLeft} essai{this.state.nbTryLeft > 1 && "s" }</p>
          </div>
          )
        }
        {this.state.won && "BRAVO: " + this.state.secret}
        {this.state.nbTryLeft === 0 && this.state.secret}
        <button onClick={() => this.resetGame()}>reset</button>
      </div> 
    );
  }

  resetGame(){
    this.setState(DEFAULT_STATE)
    this.setState ({
      secret: RandomWords().toLocaleUpperCase()
    })
  }

  handleClickOnChar = char => {

    if(this.state.nbTryLeft > 0){
      if(!this.state.secret.includes(char.char)){
        this.setState ({ 
          nbTryLeft: this.state.nbTryLeft-1 ,
          usedLetters: [...this.state.usedLetters,char.char]
        },() => this.checkWinning())
      }else{
        this.setState ({ 
          usedLetters: [...this.state.usedLetters,char.char]
        },() => this.checkWinning())
        
      }
    }
  }

  //Last character
  checkWinning = () =>{

    var charArray = this.state.secret.split("")
    var missingLetter = false;
    charArray.forEach(letter => {
      if(!this.state.usedLetters.includes(letter)){
        missingLetter = true;
      }
    });
    this.setState({
      won: !missingLetter
    })

  }


  // Produit une représentation textuelle de l’état de la partie,
  // chaque lettre non découverte étant représentée par un _underscore_.
  computeDisplay(phrase, usedLetters) {  
    return phrase.replace(/\w/g,    (letter) => (usedLetters.includes(letter) ? letter : '_ ')  )
  }   

}



export default App;
