
import {CgDarkMode} from 'react-icons/cg';
import CountrySelector from './CountrySelector.tsx';

/**
 * Root component with header and footer
 */
function App() {

    const handleDarkMode = () => {
        let storedTheme = localStorage.getItem("theme");
        if (storedTheme === 'dark') {
            storedTheme = 'light';
        } else {
            storedTheme = 'dark';
        }

        document.documentElement.setAttribute("data-theme", storedTheme);
        localStorage.setItem("theme", storedTheme);
    }

    return (
        <div className="flex w-full flex-col h-screen justify-between">
            <div className="navbar bg-base-200">
                <div className="flex-1">
                    <div className="text-2xl ml-1 text-primary">Country Selector</div>
                </div>
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost" onClick={handleDarkMode}>
                        <CgDarkMode className="h-7 w-7" />
                    </button>
                </div>
            </div>

            <CountrySelector />

            <footer className="footer p-10 bg-base-300  mt-10">
                <aside>
                    <div className="flex flex-row">
                    </div>
                </aside>
                <nav>
                    <header className="footer-title"></header>
                </nav>
                <nav>
                    <header className="footer-title"></header>
                </nav>
            </footer>
        </div>
    )
}

export default App
