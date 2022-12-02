import React from 'react'
import './dice.css'

export default function dice(props) {
  return (
    <div className='die' id={props.index}>
      <button className={`die-button ${props.selected ? `selected` : ``}`}
        onClick={() => props.clickDie(props.index)}
      >
        {props.value}
      </button>
    </div>
  )
}