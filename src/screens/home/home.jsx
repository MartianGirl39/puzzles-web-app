import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const images = [
    { src: "/sudoku-screen-shot.png", alt: "sudoku board" },
    { src: "/futoshiki.png", alt: "futoshiki board" },
    { src: "/complete.png", alt: "complete sudoku board" },
  ];

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // Switch images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [images.length]); // Add images.length as a dependency

  return (
    <div className="home-main">
      <h1 className="home-title">Sudoku And Futoshiki</h1>

      <div className="image-container">
        <img
          alt={images[index].alt}
          src={images[index].src}
          className="slideshow-image"
        />
      </div>

      <p className="intro-text">
        Get lost in the world of puzzles. Relax and enjoy the process of solving
        randomized Sudoku and Futoshiki puzzles created just for you.
      </p>

      <button
        className="play-button"
        onClick={() => navigate("/select")}
      >
        Play Now
      </button>
    </div>
  );
};
