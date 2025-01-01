import { GameSquare } from "./GameSquare"
import { initGame, selectActiveSquare, selectGame, selectHints, selectSolves, selectStatus, setActiveSquare, setStatusSolved } from "../gameSlice"
import { useEffect, useState } from "react"
import { mockGetNewBoard, getNewBoard } from "../api/fetchGame"
import { useDispatch, useSelector } from "react-redux"
import { checkComplete } from "../api/checkGame"

export const GameBoard = ({errorCheck}) => {
    const game = useSelector(selectGame)
    const status = useSelector(selectStatus)
    const activeSquare = useSelector(selectActiveSquare)
    const [errorIndices, setErrorIndices] = useState([])
    const dispatch = useDispatch()
    
    const onSquareClick = (index) => {
        if (!game[index].presolved && status != 'solved' || status != 'cpu-solved') dispatch(setActiveSquare(index))
    }

    useEffect(() => {
        checkComplete(game).then(res => res && status != 'cpu-solved' ? dispatch(setStatusSolved()): false)
        errorCheck(game).then(res => setErrorIndices(res)).catch(err => console.log(err))
    }, [game])

    return (
        <div className={`game-board ${status ? `board-${status}` : ''}`}>
            {game.map((item, index) => <GameSquare square={item} index={index} active={activeSquare > -1 && index == activeSquare} onClick={onSquareClick} key={index} activeGroup={activeSquare > -1 && game[activeSquare].value == game[index].value && game[index].value != 0} errored={errorIndices.includes(index)}/>)}
        </div>
    )
}