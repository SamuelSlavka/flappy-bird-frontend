import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

test("HomePage works", () => {
    render(
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
    );

    const linkElement = screen.getByTestId("HomePage");
    expect(linkElement).toBeInTheDocument();
});
