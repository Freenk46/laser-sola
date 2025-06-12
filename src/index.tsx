import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import App from './app/App';
import 'app/styles/index.scss';
import './shared/config/i18n/i18n';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { ModalProvider } from 'shared/context/ModalContext';

export { ThemeProvider, useTheme } from './app/providers/ThemeProvider';

render(
    <StoreProvider>
        <BrowserRouter basename="/">
            <ErrorBoundary>
                <ThemeProvider>
                <ModalProvider>
                    <App />
                    </ModalProvider>
                </ThemeProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </StoreProvider>,
    document.getElementById('root'),
);
