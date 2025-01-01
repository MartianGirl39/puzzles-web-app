import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hints: 10,
  solves: 5,
  status: 'solving',
  game: [],
  mode: 'normal',
  activeSquare: -1
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    handleUsedHint: (state) => {
      state.hints -= 1;
    },
    handleUsedSolve: (state) => {
      state.solves -= 1;
    },
    initGame: (state, action) => {
        state.game = action.payload
        state.status = 'solving'
        state.hints = 5
        state.solves = 3
        state.activeSquare = -1
        state.mode = 'normal'
    },
    setStatusSolved: (state) => {
        state.status = 'solved'
        state.mode = 'solved'
        state.activeSquare = -1
    },
    setMode: (state, action) => {
        state.mode = action.payload
        if (action.payload == 'errors' && state.hints > 0){
          state.hints -= 1
        }
    },
    setActiveSquare: (state, action) => {
        state.activeSquare = action.payload
    },
    adjustSquare: (state, action) => {
        const { index, value } = action.payload;
        const newVal = state.game[index]
        if (!newVal.presolved) {
          newVal.value = value
          newVal.pencils.splice(0, newVal.pencils.length)
          state.game = [...state.game.slice(0, index), newVal ,...state.game.slice(index + 1)];
          state.mode = 'normal'
      }
    },
    solveSquare: (state, action) => {
      if (state.solves > 0 && action.payload > -1){
        const newVal = state.game[action.payload]
        newVal.value = state.game[action.payload].answer
        newVal.pencils.splice(0, newVal.pencils.length)
        state.hame = [...state.game.slice(0, action.payload), newVal, ...state.game.slice(action.payload+1)];
        state.solves -= 1
      }
    },
    solve: (state) => {
      state.mode = 'cpu-solved';
      state.status = 'cpu-solved';
      state.game = state.game.map(item => {
          return {
          ...item,
          value: item.answer
        };
      });
      state.activeSquare = -1;
    },
    adjustPencils: (state, action) => {
      const { index, value } = action.payload;
      const newVal = state.game[index]
      if (!newVal.pencils.includes(value) && newVal.value == 0) {
        newVal.pencils.push(value)
        state.game = [...state.game.slice(0, index), newVal ,...state.game.slice(index + 1)];
      }
      else {
        newVal.pencils.pop(value)
        state.game = [...state.game.slice(0, index), newVal ,...state.game.slice(index + 1)];
      }
      state.mode = 'normal'
    },
    resetSquare: (state, action) => {
      const index = action.payload;
      const newVal = state.game[index]
        if (!newVal.presolved) {
          newVal.value = 0
          newVal.pencils.splice(0, newVal.pencils.length)
          state.game = [...state.game.slice(0, index), newVal ,...state.game.slice(index + 1)];
          state.mode = 'normal'
      }
    }
  },
});

export const { handleUsedHint, handleUsedSolve, changeStatus, initGame, setStatusSolved, setMode, setActiveSquare, solveSquare, adjustSquare, solve, adjustPencils, resetSquare } = gameSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGame = (state) => state.game.game
export const selectHints = (state) => state.game.hints
export const selectSolves = (state) => state.game.solves
export const selectStatus = (state) => state.game.status
export const selectMode = (state) => state.game.mode
export const selectActiveSquare = (state) => state.game.activeSquare

export default gameSlice.reducer;
