import { Component } from "react";
import {ErrorBoundaryProps} from "../../models/components/props.ts";
import {ErrorBoundaryState} from "../../models/components/state.ts";

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false,
            errorMessage: ""
        }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        console.error(error)
        return { errorMessage: error.message, hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error(error, errorInfo)
        this.setState({ errorMessage: error.message, hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <h1>{this.state.errorMessage}</h1>;
        }

        return this.props.children;
    }

}