import axios from 'axios';

export const mockGetNewFutoshikiBoard = async (size) => {
  try {
    const res = '839526471451387629276914538512879364384651792697243815768492153125738946943165287'
    const solution = res.split("");
    return initFutoshiki(solution)
  } catch (error) {
    console.error("Error fetching the Sudoku data", error);
    return [];
  }
}

export const getNewFutoshikiBoard = async (size) => {
  try {
    // Fetch data from the serverless function hosted on Netlify
    const res = await axios.get('/.netlify/functions/fetchGame');
    const solution = res.data.solution.split(""); // Split the solution string into an array of digits
    return initFutoshiki(solution)
  } catch (error) {
    console.error("Error fetching the Sudoku data", error);
    return [];
  }
}

const initFutoshiki = (arrayData) => {
  const answeredChances = Math.random() * (0.40 - 0.20) + 0.20;
  const hintChances = Math.random() * (0.5 - (answeredChances + 0.05)) + (answeredChances + 0.05);
  const futoshiki = []
  
  arrayData.forEach((item, index) => {
    const isFilled = Math.random() < answeredChances;
    const hasHint = Math.random() < hintChances;
    const myObject = {
      value: isFilled ? item : 0, // If not filled, set value to 0
      answer: item,
      hint: '',
      hintIndex: '',
      presolved: isFilled, // If not filled, it's presolved
      pencils: []
    };

    if (hasHint) {
      const possibleDirections = ['1', '-1', '9', '-9']; // Check adjacent cells horizontally or vertically
      const randomDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
      
      // Calculate the index based on the direction
      let hintIndex = null;
      if (randomDirection === '1' && index % 9 !== 8) hintIndex = index + 1;
      if (randomDirection === '-1' && index % 9 !== 0 && futoshiki[index-1].hint == '') hintIndex = index - 1;
      if (randomDirection === '9' && index + 9 < arrayData.length) hintIndex = index + 9;
      if (randomDirection === '-9' && index - 9 >= 0 && futoshiki[index - 9].hint == '') hintIndex = index - 9;

      if (hintIndex !== null) {
        // Set the hint direction (LESS_THAN or GREATER_THAN)
        const hintSign = arrayData[hintIndex] > item ? 'GREATER_THAN' : 'LESS_THAN';
        myObject.hint = hintSign;
        myObject.hintIndex = randomDirection;
      }
    }
    futoshiki.push(myObject)
  });
  return futoshiki
}

const createFutoshiki = (size) => {
  let grid = ""
  
  // a loop for every row
  for(let i=0; i<size-1; i++) {
    // the options each row will get
    const options = Array.from({ length: size }, (_, index) => index + 1);
    // option for each olumn in the row
    for(let j=0; j<size;) {
      const randomIndex = Math.floor(Math.random() * (size-j))
      const item = "" + options[randomIndex]
      let success = true
      console.log("random option is " + item)
      console.log("grid is " + grid)
      for (let k=size*i+j-size; k>=0; k-=size) {
        console.log(`comparing ${item} with ${grid[k]}`)
        if (grid[k] == item) {
          success = false
          break
        }
      }
      if (success) {
        grid += "" + item
        options.splice(randomIndex, 1);
        j++;
      }
      else if(!success && j == size-1) {
        grid = grid.substring(0, size*i)
        console.log("grid after slit " + grid)
        i-=1
        break;
      }
    }
  }
  // try to fill last row with only available numbers
  for (let i=0; i<size; i++) {  // every row
    const options = Array.from({ length: size }, (_, index) => index + 1);
    for (let j=i; j<grid.length; j+=size) {  //every column
      console.log(`j is ${j}`)
        console.log(`removeing ${grid[j]} from options at index ${options.indexOf(grid)}`)
        options.splice(options.indexOf(grid[j]), 1);
        console.log(`options are now ${options}`)
    }
    grid += options[0]
  }
  console.log(grid.split(""))
  return grid;
}

export const getNewMockSudokuBoard = async () => {
  const res = '839526471451387629276914538512879364384651792697243815768492153125738946943165287'
  const solution = res.split("");
  return initSudoku(solution)
}

export const getNewSudokuBoard = async () => {
  const res = await axios.get('/.netlify/functions/fetchGame');
  const solution = res.data.solution.split("");
  return initSudoku(solution)
}

const initSudoku = (arrayData) => {
  const chances = Math.random() * (0.5 - 0.25) + 0.25;

  return arrayData.map((item) => {
    const isFilled = Math.random() > chances
    return {
      value: isFilled ? item : 0,
      answer: item,
      hint: '',
      hintIndex: '',
      presolved: isFilled,
      pencils: []
    }
  })
}