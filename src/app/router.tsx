import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePage from "./pages/GamePage/GamePage";

import HomePage from "./pages/HomePage/HomePage";
import MissingPage from "./pages/MissingPage/MissingPage";

const Router = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="game" element={<GamePage />} />
            <Route path="*" element={<MissingPage />} />
        </Routes>
    </BrowserRouter>
)};

export default Router;
