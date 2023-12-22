import App from '../src/components/App/App'
import { render } from './test-utils'
import {Provider} from "react-redux";
import {store} from "../src/store/store";
import {BrowserRouter} from "react-router-dom";
import ErrorBoundary from "../src/components/ErrorBoundary/ErrorBoundary";
import {authenticateUserAction} from "../src/actions/actions";

describe('App', () => {
    it('should initialize the app', () => {
        const renderedComponent = render(
            <ErrorBoundary>
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            </ErrorBoundary>
        )
        expect(renderedComponent).toBeDefined();
        expect(renderedComponent).toMatchSnapshot()
    })
})

describe("Login Component", () => {
    it('should show Login page when not logged in', () => {
        const renderedComponent = render(
            <ErrorBoundary>
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            </ErrorBoundary>
        )
        const loginHeadingElement = renderedComponent.getByTestId("login-heading");
        expect(renderedComponent).toBeDefined();
        expect(loginHeadingElement).toBeInTheDocument();
    })

})

describe("Layout Component", () => {
    it("should show navbar when logged in successfully", () => {
        store.dispatch(authenticateUserAction({
            id: "",
            password: ""
        }))

        const renderedComponent = render(
            <ErrorBoundary>
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            </ErrorBoundary>
        )

        const navbarElement = renderedComponent.getByTestId("navbar");

        expect(renderedComponent).toBeDefined();
        expect(navbarElement).toBeInTheDocument();
    })
})