import { useSelector } from "react-redux"
import { GameControls } from "./components/GameControls"
import { selectStatus, selectGame, initGame } from "./gameSlice"
import './game.css'
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { mockGetNewBoard } from "./api/fetchGame"
import { GameBoard } from "./components/GameBoard"
import { useNavigate } from "react-router-dom"

export const Game = ({size, fetchHandler, errorCheckHandler}) => {
    const status = useSelector(selectStatus)
    const game = useSelector(selectGame);
    const [loaded, setLoaded] = useState('loading')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const updateCSSVariables = () => {
        document.documentElement.style.setProperty('--grid-size', size);
      };

    const loadNewGame = () => {
        fetchHandler(size).then( res => {
            dispatch(initGame(res))
            setLoaded('loaded')
        })
    }

    useEffect(() => {
        loadNewGame()
        updateCSSVariables()
    }, [])

    if (loaded == 'loading') {
        return <p>loading board...</p>
    }

    return (
        <div className="game">
            <GameControls size={size}/>
            <GameBoard errorCheck={errorCheckHandler}/>
            {status === 'solved' &&<div className="on-solved"><h1>Puzzle Solved!</h1><button onClick={() => {loadNewGame()}}>Play Again?</button></div>}
            {status === 'cpu-solved' && <div className="on-cpu-solved"><h1>Nice Go!</h1><button onClick={() => {loadNewGame()}}>Play Again?</button></div>}
        </div>
    )
}
