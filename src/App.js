import React from 'react'
import { useState } from 'react'
import { evaluate } from 'mathjs'
import './index.css'

const BUTTONS = [
  { id: 0, val: '='},
  { id: 1, val: '+'},
  { id: 2, val: '7'},
  { id: 3, val: '8'},
  { id: 4, val: '9'},
  { id: 5, val: '-'},
  { id: 6, val: '4'},
  { id: 7, val: '5'},
  { id: 8, val: '6'},
  { id: 9, val: '*'},
  { id: 10, val: '1'},
  { id: 11, val: '2'},
  { id: 12, val: '3'},
  { id: 13, val: '/'},  
]

export default function App() {
  const [display, setDisplay] = useState(0);
  const [operand, setOperand] = useState(null);
  const [operator, setOperator] = useState('');
  const [expression, setExpression] = useState([]);
  
  const onNumberClick = (e) => {
    const value = e.target.value;
    
    const number = parseInt(value) ? [...expression, value] : [];
    setExpression(number);
    setDisplay(number.length ? parseInt(number.join('')) : 0);
  }

  const onOperatorClick = (e) => {
    const val = e.target.value;

    setOperand(display);
    setOperator(val);
    
    setDisplay(0);
    setExpression([]);
  }

  const onEvaluate = () => {
    const rhs_operand = display;
    const string_to_eval = `${operand} ${operator} ${rhs_operand}`;
    
    const value = evaluate(string_to_eval);
    setDisplay(value);
  }

  const onClear = () => {
    setDisplay(0);
    setOperand(null);
    setOperator('');
    setExpression([]);
  }

  return (
    <div>
      <div className='calculator'>
        <div className='display'>
          <p>{display}</p>
        </div>
        <div className='buttons'>
          <input type='button' id='clear' value='clear' className='op' onClick={onClear} />
          {BUTTONS.map((button =>
            <input 
              key={button.id} 
              type='button' 
              id={button.id} 
              value={button.val} 
              className={parseInt(button.val) ? 'num' : 'op' }
              onClick={parseInt(button.val) ? onNumberClick : button.val !== '=' ? onOperatorClick : onEvaluate}
            />  
          ))}
        </div>
      </div>
    </div>
  )
}