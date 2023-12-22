import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../src/store/store";
import {BrowserRouter} from "react-router-dom";
import Layout from "../src/components/Layout/Layout";
import {authenticateUserAction} from "../src/actions/actions";

describe("Layout Component", () => {
    it("should be rendered successfully", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    })
    it ("should have the navbar", () => {
        store.dispatch(authenticateUserAction({id: "sarahedo", password: "123456"}))
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </Provider>
        );

        const navbarElement = component.getByTestId("navbar");

        expect(component).toBeDefined();
        expect(navbarElement).toBeInTheDocument();
    })
    it("should display the username", () => {
        store.dispatch(authenticateUserAction({id: "sarahedo", password: "123456"}))
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </Provider>
        );

        const usernameElement = component.getByTestId("username");

        expect(component).toBeDefined();
        expect(usernameElement).toBeInTheDocument();
    })
})