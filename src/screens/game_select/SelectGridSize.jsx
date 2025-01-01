import { useNavigate } from "react-router-dom"

export const SelectGridSize = () => {
    const navigate = useNavigate()

    const handleSelect = (size) => {
        navigate(`/futoshiki`)
    }

    return (
        <div>
            <p>Select Grid Size</p>
            <div className='4x4-button-grid'>
                <button onClick={() => {handleSelect(6)}}>6x6</button>
                <button onClick={() => {handleSelect(7)}}>7x7</button>
                <button onClick={() => {handleSelect(8)}}>8x8</button>
                <button onClick={() => {handleSelect(9)}}>9x9</button>
            </div>
        </div>
    )
}