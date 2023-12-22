import Login from "../src/components/Login/Login";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../src/store/store";
import {fireEvent, render} from "@testing-library/react";
import {getAppData} from "../src/actions/actions";

describe("Login", () => {
    it("should be rendered successfully", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    })

    it ('should login successfully after clicking submit button', async () => {
        await store.dispatch(getAppData());

        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );

        expect(component).toBeDefined();

        const loginHeadingElement = component.getByTestId("login-heading");
        const usernameInputElement = component.getByTestId("username");
        const passwordInputElement = component.getByTestId("password");
        const submitButtonElement = component.getByTestId("submit");

        expect(loginHeadingElement).toBeInTheDocument();
        expect(usernameInputElement).toBeInTheDocument();
        expect(passwordInputElement).toBeInTheDocument();
        expect(submitButtonElement).toBeInTheDocument();

        fireEvent.change(usernameInputElement, {target: {value: 'sarahedo'}});
        fireEvent.change(passwordInputElement, {target: {value: '123456'}});
        expect(usernameInputElement.value).toBe("sarahedo");
        expect(passwordInputElement.value).toBe("123456");
        fireEvent.click(submitButtonElement);

    })

    it('should clear input elements after clicking submit button', async () => {
        await store.dispatch(getAppData());

        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );

        expect(component).toBeDefined();

        const loginHeadingElement = component.getByTestId("login-heading");
        const usernameInputElement = component.getByTestId("username");
        const passwordInputElement = component.getByTestId("password");
        const submitButtonElement = component.getByTestId("submit");

        expect(loginHeadingElement).toBeInTheDocument();
        expect(usernameInputElement).toBeInTheDocument();
        expect(passwordInputElement).toBeInTheDocument();
        expect(submitButtonElement).toBeInTheDocument();

        fireEvent.change(usernameInputElement, {target: {value: 'sarahedo'}});
        fireEvent.change(passwordInputElement, {target: {value: 'wrongpassword'}});
        expect(usernameInputElement.value).toBe("sarahedo");
        expect(passwordInputElement.value).toBe("wrongpassword");
        fireEvent.click(submitButtonElement); // User stays on page
        expect(loginHeadingElement).toBeInTheDocument();
    });
})