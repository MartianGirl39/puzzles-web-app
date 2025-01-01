import { useNavigate } from "react-router-dom"

export const GameSelect = () => {
    const navigate = useNavigate();

    return (
        <form>
            <p>Which Game Would You Like To Play?</p>
            <div className="inline-select-buttons">
                <button onClick={() => {navigate("/sudoku")}}>Sudoku</button>
                <button onClick={() => {navigate("/futoshiki")}}>Futoshiki</button>
            </div>
        </form>
    )
}