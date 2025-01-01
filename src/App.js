import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Futoshiki } from './screens/futoshiki/Futoshiki';
import { Home } from './screens/home/home';
import { Sudoku } from './screens/sudoku/Sudoku';
import { GameSelect } from './screens/game_select/GameSelect';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SelectGridSize } from './screens/game_select/SelectGridSize';

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>Futoshiki And Sudoku</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/select" element={<GameSelect/>} />
            <Route path="/select/grid" element={<SelectGridSize/>} />
            <Route path="/futoshiki/" element={<Futoshiki/>} />
            <Route path="/sudoku" element={<Sudoku/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
