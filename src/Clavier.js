import React from 'react'
import PropTypes from 'prop-types'

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const Clavier = ({handleClickOnChar,usedLetters}) => (
    <div className="alphabetList">
    {ALPHABET.map((char,index) => (
             <button key={index} onClick={() => handleClickOnChar({char})} disabled={usedLetters.includes(char)}>{char}</button>
        ))}
    </div> 
)

Clavier.propTypes = {
   
    handleClickOnChar: PropTypes.func.isRequired
}

export default Clavier