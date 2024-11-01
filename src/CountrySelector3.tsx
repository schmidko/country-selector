import { useState, useEffect, useRef } from 'react';
import { CgCloseO } from 'react-icons/cg';
import HighlightedText from './HighlightedText';
import countrys from './assets/countrys.json';

function App() {
    const [countryInput, setCountryInput] = useState<string>('');
    const [activeIndex, setActiveIndex] = useState<number>(-1); // Track active item in the dropdown
    const filteredCountries = countrys.filter(country =>
        country.name.toLowerCase().includes(countryInput.toLowerCase())
    );

    const itemRefs = useRef<(HTMLLIElement | null)[]>([]); // Ref for each item in the list

    useEffect(() => {
        const storedCountry = localStorage.getItem("selectedCountry");
        if (storedCountry || storedCountry === "") {
            setCountryInput(storedCountry);
        }
    }, []);

    const handleClick = (countryName: string) => {
        setCountryInput(countryName);
        setActiveIndex(-1); // Reset active index on selection
        localStorage.setItem("selectedCountry", countryName);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountryInput(e.target.value);
        setActiveIndex(-1); // Reset active index when typing
    };

    const handleDelete = (e: React.MouseEvent<SVGElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setCountryInput("");
        setActiveIndex(-1);
        localStorage.setItem("selectedCountry", "");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            setActiveIndex((prev) => (prev < filteredCountries.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
        } else if (e.key === "Enter" && activeIndex >= 0) {
            const selectedCountry = filteredCountries[activeIndex].name;
            handleClick(selectedCountry);
        }
    };

    useEffect(() => {
        if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
            itemRefs.current[activeIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }, [activeIndex]);

    function generateCountryList() {
        return filteredCountries.map((country, index) => {
            const countryName = countryInput ? (
                <HighlightedText text={country.name} highlight={countryInput} />
            ) : (
                <>{country.name}</>
            );

            return (
                <li
                    key={country.code}
                    ref={(el) => (itemRefs.current[index] = el)} // Assign ref to each item
                >
                    <button
                        className={`btn-ghost w-full text-left p-2 ${
                            index === activeIndex ? "bg-blue-500 text-white" : ""
                        }`}
                        onClick={() => handleClick(country.name)}
                    >
                        {countryName}
                    </button>
                </li>
            );
        });
    }

    return (
        <div className="flex w-full h-2/4 justify-center">
            <div className="dropdown">
                <label className="input input-lg w-96 input-bordered flex items-center justify-between">
                    <input
                        placeholder="Pick a country"
                        onChange={handleInput}
                        value={countryInput}
                        onKeyDown={handleKeyDown} // Add keyboard event handler
                        className="flex-grow outline-none"
                    />
                    <CgCloseO
                        className="h-6 w-6 cursor-pointer"
                        onClick={handleDelete}
                    />
                </label>
                {countryInput && (
                    <ul className="text-lg dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-lg w-96 max-h-80 flex-nowrap overflow-auto">
                        {generateCountryList()}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;