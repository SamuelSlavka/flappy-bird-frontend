import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import GameOverPage from "./GameOverPage";

test("GameOverPage works", () => {
    render(
        <BrowserRouter>
            <GameOverPage />
        </BrowserRouter>
    );

    const linkElement = screen.getByTestId("GameOverPage");
    expect(linkElement).toBeInTheDocument();
});
