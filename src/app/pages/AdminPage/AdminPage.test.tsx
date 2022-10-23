import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AdminPage from "./AdminPage";

test("AdminPage works", () => {
    render(
        <BrowserRouter>
            <AdminPage />
        </BrowserRouter>
    );

    const linkElement = screen.getByTestId("AdminPage");
    expect(linkElement).toBeInTheDocument();
});
