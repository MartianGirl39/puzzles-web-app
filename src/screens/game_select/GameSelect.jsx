import { useNavigate } from "react-router-dom"

export const GameSelect = () => {
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <form>
                <h3 className="text-center mb-4">Which Game Would You Like To Play?</h3>
                <div className="d-flex justify-content-center gap-3">
                    <button 
                        className="btn btn-primary btn-lg" 
                        onClick={() => {navigate("/sudoku/")}}
                    >
                        Sudoku
                    </button>
                    <button 
                        className="btn btn-success btn-lg" 
                        onClick={() => {navigate("/futoshiki/")}}
                    >
                        Futoshiki
                    </button>
                </div>
            </form>
        </div>
    );
}