import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameOverPage from "./pages/GameOverPage/GameOverPage";
import GamePage from "./pages/GamePage/GamePage";

import HomePage from "./pages/HomePage/HomePage";
import MissingPage from "./pages/MissingPage/MissingPage";

const Router = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="game" element={<GamePage />} />
            <Route path="game-over" element={<GameOverPage />} />
            <Route path="*" element={<MissingPage />} />
        </Routes>
    </BrowserRouter>
)};

export default Router;
