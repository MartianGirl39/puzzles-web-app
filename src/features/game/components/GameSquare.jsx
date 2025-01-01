import React from 'react';
import { useSelector } from 'react-redux';
import { selectMode, selectStatus } from '../gameSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';


export const GameSquare = ({ square, index, active, activeGroup, onClick, errored }) => {
  const { value, answer, hint, hintIndex, presolved, pencils } = square; // hint is either greater than or less than
  const hintAlignment = hintIndex == "9" ? "bottom-hint" : hintIndex == "-9" ? "top-hint" : hintIndex == "1" ? "right-hint" : "left-hint";
  const mode = useSelector(selectMode);
  const status = useSelector(selectStatus)
  const hintIcon = hint === "GREATER_THAN" ? "fa-less-than" : "fa-greater-than";
  
  return (
    <div 
      className={`${presolved ? 'prefilled-square': ''} game-square game-square-${index} ${mode == 'errors' && answer != value && value !== 0 ? "red-text" : ""} ${active ? 'active' : ''} ${status == 'solved'? status: ''} ${status == 'cpu-solved'? 'cpu-solved': ''} ${activeGroup ? 'active-group' : ''} ${errored ? 'game-error': ''}`} 
      id={`game-square-${index}`} 
      onClick={() => onClick(index)}
    >
      <h4>{value > 0 ? value: ' '}</h4>
      <p className="pencils">{pencils.map((item) => item + " ")}</p>
      {hint ? 
        <i 
          className={`square-hint fa-solid ${hintIcon} fa-2xs ${hintAlignment} ${hint.toLowerCase()}-${hintAlignment}`} 
          style={{ fontSize: '2em', color: hint === "greater than" ? '#ff7f50' : '#1890ff' }}
        />: <p></p>
      }
    </div>
  );
};
