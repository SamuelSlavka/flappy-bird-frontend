import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "../pages/AdminPage/AdminPage";
import GameOverPage from "../pages/GameOverPage/GameOverPage";
import GamePage from "../pages/GamePage/GamePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MissingPage from "../pages/MissingPage/MissingPage";
import AuthGuard from "./AuthGuard";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GamePage />} />
                <Route path="game-over" element={<GameOverPage />} />
                <Route path='admin' element={<AuthGuard><AdminPage /></AuthGuard>} />
                <Route path="login" element={<LoginPage />} />
                <Route path="*" element={<MissingPage />} />
            </Routes>
        </BrowserRouter>
    )
};

export default Router;
