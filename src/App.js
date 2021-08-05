import React from 'react'
import { useState } from 'react'
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
  { id: 9, val: 'x'},
  { id: 10, val: '1'},
  { id: 11, val: '2'},
  { id: 12, val: '3'},
  { id: 13, val: '/'},  
]

export default function App() {
  const [display, setDisplay] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [operator, setOperator] = useState(0);
  const [expression, setExpression] = useState([]);
  
  // Not using best practice -> don't call hooks in loops, conditions, or nested functions
  const onClick = (e) => {
    const id = parseInt(e.target.id);
    const value = e.target.value;
    
    id !== 0 ? buildExpression(id, value) : evaluate();
  }

  const onClear = () => {
    setDisplay(0);
    setNumbers([]);
    setOperator(0);
    setExpression([]);
  }

  const buildExpression = (id, value) => {
    
    if (parseInt(value)) {
      const newExpression = [...expression, value];
      setExpression(newExpression);
      setDisplay(parseInt(newExpression.join('')));
    } else {
      setNumbers([...numbers, display]);
      setExpression([]);
      setDisplay(0);
      setOperator(id);
    }
  }

  const evaluate = () => {
    const [number1, number2] = [...numbers, display];
    setNumbers(numbers.push(number2));

    const value = number1 / number2;
    setDisplay(value);
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
              onClick={onClick}
            />  
          ))}
        </div>
      </div>
    </div>
  )
}

// // TODO: MAKE DISPLAY AND NUMBERS A LITERAL VALUE NOT LISTS AND THEN USE EXPRESSION STATE TO BUILD UP THE NUMBERS
// export class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       display: [],
//       number1: [],
//       operator: 0,
//       number2: [],
//     }
//   }

//   onClick = (e) => {
//     if (parseInt(e.target.id) !== 0) {
//       this.buildExpression(parseInt(e.target.id), e.target.value);
//     } else {
//       this.evaluate();
//     }
//   }

//   onClear = () => {
//     this.setState({ number1: [], operator: 0, number2: [], display:  [] });
//   }

//   // build up expression state. set display to the expression. when operator is given, set display to the corresponding number.
//   buildExpression(id, value) {
//     if (id !== 1 && id !== 5 && id !== 9 && id !== 13) {
//       this.setState({ display: [...this.state.display, value] });
//     } else {
//       !this.state.operator ? this.setState({ number1: this.state.display }) : this.setState({ number2: this.state.display });
//       this.setState({ operator: id, display: [] });
//     }
//   }

//   evaluate() {
//     const lhs = parseInt(this.state.number1.join(''));
//     const rhs = parseInt(this.state.number2.join(''));
    
//     let value;
//     switch(this.state.operator) {
//       case 1:
//         value = lhs + rhs;
//         break;
//       case 5:
//         value = lhs - rhs; // wrong when negative!
//         break;
//       case 9:
//         value = lhs * rhs;
//         break;
//       case 13:
//         value = lhs / rhs; // wrong!
//         break;
//       default:
//         value = lhs; // wrong!
//     }

//     this.setState({ display: this.splitValue(value) });
//   }

//   // I dont think that this is needed.
//   splitValue(value) {
//     let valList = [];

//     valList.push((value % 10).toString());
//     value = Math.floor(value / 10);
    
//     while (value > 0) {
//       valList = [(value % 10).toString(), ...valList];
//       value = Math.floor(value / 10);
//     }

//     return valList;
//   }

//   render() {
//     return (
//       <div className='calculator'>
//         <div className='display'>
//           <p>{this.state.display}</p>
//         </div>
//         <div className='buttons'>
//           <input type='button' id='clear' value='clear' className='op' onClick={this.onClear}></input>
//           {BUTTONS.map((button =>
//             <input key={button.id} type='button' id={button.id} value={button.val} className={parseInt(button.val) ? 'num' : 'op' } onClick={this.onClick}></input>
//           ))}
//         </div>
//       </div>
//     )
//   }
// }

// export default App