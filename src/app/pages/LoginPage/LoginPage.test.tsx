import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";

test("LoginPage works", () => {
    render(
        <BrowserRouter>
            <LoginPage />
        </BrowserRouter>
    );

    const linkElement = screen.getByTestId("LoginPage");
    expect(linkElement).toBeInTheDocument();
});
