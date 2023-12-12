import App from '../src/App'
import { render, screen, userEvent } from './test-utils'

describe('Simple working test', () => {
    it('the title is visible', () => {
        render(<App />)
        expect(screen.getByText("Vite + React")).toBeInTheDocument()
    })
})