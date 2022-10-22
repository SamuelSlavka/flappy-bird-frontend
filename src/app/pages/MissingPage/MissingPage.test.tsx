import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MissingPage from "./MissingPage";
import React from "react";

describe("<MissingPage />", () => {
    test("it should mount", () => {
        render(<MissingPage />);

        const missingPage = screen.getByTestId("MissingPage");
        expect(missingPage).toBeInTheDocument();
    });
});
