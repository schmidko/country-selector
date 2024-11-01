import { useState, useEffect, useRef } from 'react'
import { CgCloseO } from 'react-icons/cg';
import HighlightedText from './HighlightedText';
import countrys from './assets/countrys.json'

function App() {
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]); // ref for dropdown

    const [countryInput, setCountryInput] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    let filteredCountryList: string[] = [];

    useEffect(() => {
        const storedCountry = localStorage.getItem("selectedCountry");
        if (storedCountry || storedCountry == "") {
            setCountryInput(storedCountry);
        }
    }, []);

    useEffect(() => {
        if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
            itemRefs.current[activeIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }, [activeIndex]);

    const handleClickCountry = (countryName: string) => {
        setCountryInput(countryName);
        setActiveIndex(-1);
        setIsDropdownOpen(false);
        localStorage.setItem("selectedCountry", countryName);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountryInput(e.target.value);
        setActiveIndex(-1);
    };

    const handleDelete = (e: React.MouseEvent<SVGElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setCountryInput("");
        setActiveIndex(-1);
        setIsDropdownOpen(false);
        localStorage.setItem("selectedCountry", "");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            setActiveIndex((prev) => (prev < filteredCountryList.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
        } else if (e.key === "Enter" && activeIndex >= 0) {
            const selectedCountry = filteredCountryList[activeIndex];
            setCountryInput(selectedCountry);
            setIsDropdownOpen(false);
        }
    };

    function generateCountryList() {
        let countryList = [];
        let countryNameList = [];
        for (const [index, country] of countrys.entries()) {
            let countryName = <>{country.name}</>;
            if (countryInput) {
                countryName = <HighlightedText text={country.name} highlight={countryInput} />
                if (!country.name.toLowerCase().includes(countryInput.toLocaleLowerCase())) {
                    continue;
                }
            }

            let classes = "btn-ghost";
            if (countryList.length == activeIndex) {
                classes += " btn-active";
            }

            countryList.push(
                <li
                    key={country.code + index}
                    ref={(el) => (itemRefs.current[index] = el)} // Assign ref to each item
                >
                    <button
                        className={classes}
                        onClick={() => handleClickCountry(country.name)}
                    >
                        {countryName}
                    </button>
                </li>
            );

            countryNameList.push(country.name);
        }
        filteredCountryList = countryNameList;

        return countryList;
    }

    return (
        <div className="flex w-full h-2/4 justify-center">
            <div className="dropdown">
                <label className="input input-lg w-96 input-bordered flex items-center justify-between">
                    <input
                        placeholder="Pick a country"
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsDropdownOpen(true)}
                        value={countryInput}
                    />
                    <CgCloseO
                        className="h-6 w-6"
                        onClick={handleDelete}
                    />
                </label>
                {isDropdownOpen &&
                    <ul className="text-lg dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-lg w-96 max-h-80 flex-nowrap overflow-auto">
                        {generateCountryList()}
                    </ul>
                }
            </div>
        </div>
    )
}

export default App
