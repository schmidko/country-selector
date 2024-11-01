import { useState, useEffect } from 'react'
import {CgCloseO } from 'react-icons/cg';
import HighlightedText from './HighlightedText';
import countrys from './assets/countrys.json'

function App() {
    const [countryInput, setCountryInput] = useState<string>("");

    useEffect(() => {
        const storedCountry = localStorage.getItem("selectedCountry");
        if (storedCountry || storedCountry == "") {
            setCountryInput(storedCountry);
        }
    }, []);

    const handleClick = (countryName: string) => {
        setCountryInput(countryName);
        localStorage.setItem("selectedCountry", countryName);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountryInput(e.target.value);
    };

    const handleDelete = (e: React.MouseEvent<SVGElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setCountryInput("");
        localStorage.setItem("selectedCountry", "");
    };

    function generateCountryList() {
        let countryList = [];
        for (const [index, country] of countrys.entries()) {
            let countryName = <>{country.name}</>;
            if (countryInput) {

                countryName = <HighlightedText text={country.name} highlight={countryInput} />

                if (!country.name.toLowerCase().includes(countryInput.toLocaleLowerCase())) {
                    continue;
                }
            }

            countryList.push(
                <li key={country.code + index}>
                    <button
                        className="btn-ghost"
                        onClick={() => handleClick(country.name)}
                    >
                        {countryName}
                    </button>
                </li>
            );
        }

        return countryList;
    }

    return (
        <div className="flex w-full h-2/4 justify-center">
            <div className="dropdown">
                <label className="input input-lg w-96 input-bordered flex items-center justify-between">
                    <input
                        placeholder="Pick a country"
                        onChange={handleInput}
                        value={countryInput}
                    />
                    <CgCloseO
                        className="h-6 w-6"
                        onClick={handleDelete}
                    />
                </label>
                <ul className="text-lg dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-lg w-96 max-h-80 flex-nowrap overflow-auto">
                    {generateCountryList()}
                </ul>
            </div>
        </div>
    )
}

export default App