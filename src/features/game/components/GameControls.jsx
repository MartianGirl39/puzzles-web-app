import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveSquare,
  selectHints,
  selectSolves,
  setMode,
  adjustSquare,
  solveSquare,
  solve,
  selectStatus,
  adjustPencils,
  resetSquare
} from "../gameSlice";
import { useState } from "react";

export const GameControls = () => {
  const activeSquare = useSelector(selectActiveSquare);
  const hints = useSelector(selectHints);
  const solves = useSelector(selectSolves);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();
  const array = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const [action, setAction] = useState("set");

  const handleButtonClick = (item) => {
    if (action === "set") {
      dispatch(adjustSquare({ index: activeSquare, value: item }));
    } else {
      dispatch(adjustPencils({ index: activeSquare, value: item }));
    }
  };

  <div className="spacer"></div>

  if (status !== "solved" && status !== "cpu-solved") {
    return (
      <section id="button-controls" className="container mt-4">
        <div className="row">
          <div className="col-12 mb-3">
            <h4>Game Controls</h4>
          </div>

          <div className="col-12 mb-3 d-flex justify-content-between button-container">
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(solveSquare(activeSquare));
              }}
            >
              Solve Square {solves}x
            </button>

            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(setMode("errors"));
              }}
            >
              Check Errors {hints}x
            </button>

            {/* Solve Button */}
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(solve());
              }}
            >
              Solve Puzzle
            </button>
          </div>
          {activeSquare !== -1 && (
            <div className="col-12 number-buttons">
              <div className="d-flex align-items-center mb-3">
                <label className="me-3">Set Value:</label>
                <input
                  type="radio"
                  name="action"
                  onClick={() => setAction("set")}
                  defaultChecked
                />
                <label className="ms-3 me-3">Pencil Ins:</label>
                <input
                  type="radio"
                  name="action"
                  onClick={() => setAction("pencil")}
                />
              </div>

              <div className="d-flex flex-wrap justify-content-start">
                {array.map((item, index) => (
                  <button
                    key={index}
                    className="btn btn-outline-secondary m-1"
                    onClick={() => {
                      handleButtonClick(item);
                    }}
                  >
                    {item}
                  </button>
                ))}
                <button className="btn btn-outline-secondary m-1" onClick={() => {dispatch(resetSquare(activeSquare))}}>reset</button>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  return null;
};
