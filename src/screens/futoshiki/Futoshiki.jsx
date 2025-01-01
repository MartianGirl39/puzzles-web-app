import { findErrorsForFutoshiki } from "../../features/game/api/checkGame";
import { mockGetNewFutoshikiBoard } from "../../features/game/api/fetchGame"
import { Game } from "../../features/game/Game"
// import { useParams } from "react-router-dom";

export const Futoshiki = () => {
    // const { size } = useParams();
    return (
        <Game size={9} fetchHandler={mockGetNewFutoshikiBoard} errorCheckHandler={findErrorsForFutoshiki}/>
    )
}