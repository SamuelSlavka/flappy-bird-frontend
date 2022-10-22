import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import store from "src/app/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

//TODO: move pixie stuff into separate components and add tests
describe("<GamePage />", () => {
    test("it should mount", () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <div data-testid="GamePage" > 
                    </div>
                </Provider>
            </BrowserRouter>
        );
        const gamePage = screen.getByTestId("GamePage");
        expect(gamePage).toBeInTheDocument();
    });
});
