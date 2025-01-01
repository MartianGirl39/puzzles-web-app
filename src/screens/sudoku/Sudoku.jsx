import { Game } from "../../features/game/Game"
import { findErrorsForSudoku } from "../../features/game/api/checkGame"
import { /*getNewMockSudokuBoard,*/ getNewSudokuBoard } from "../../features/game/api/fetchGame"

export const Sudoku = () => {
    return (
        <Game size={9} fetchHandler={getNewSudokuBoard} errorCheckHandler={findErrorsForSudoku}/>
    )
}