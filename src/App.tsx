import { useState, useEffect } from 'react'
import { CgDarkMode } from 'react-icons/cg';
import countrys from './assets/countrys.json'

function App() {
    const [selectedCountry, setSelectedCountry] = useState<string>("Pick a country")

    useEffect(() => {
        const storedCountry = localStorage.getItem("selectedCountry");
        if (storedCountry) {
            setSelectedCountry(storedCountry);
        }
    }, []); 

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

    const handleClick = (countryName: string) => {
        setSelectedCountry(countryName);
        localStorage.setItem("selectedCountry", countryName);
    };

    function generateCountryList() {
        let countryList = [];
        for (const [index, country] of countrys.entries()) {
            countryList.push(<li key={country.code + index}>
            <button
                className="text-base-content"
                onClick={() => handleClick(country.name)}
            >
                {country.name}
            </button></li>);
        }

        return countryList;
    }

    console.log('moo', selectedCountry);



    return (
        <div className="flex w-full flex-col h-screen justify-between">
            <div className="navbar bg-base-200">
                <div className="flex-1">
                    <div className="text-2xl ml-1 text-primary">Country Selector</div>
                </div>
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost" onClick={handleDarkMode}>
                        <CgDarkMode className="h-6 w-6" />
                    </button>
                </div>
            </div>

            <div className="flex w-full h-2/4 justify-center">
                <div className="dropdown">
                    <input
                        className="input input-lg input-bordered w-96 text-lg"
                        placeholder={selectedCountry}
                    />
                    <ul className="text-lg dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-lg w-96 max-h-80 flex-nowrap overflow-auto">
                        {generateCountryList()}
                    </ul>
                </div>
            </div>

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
