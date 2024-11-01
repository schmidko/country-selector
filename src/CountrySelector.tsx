import { useState, useEffect, useRef } from 'react'
import { CgCloseO } from 'react-icons/cg';
import HighlightedText from './HighlightedText';
import countryListComplete from './assets/countrys.json'

/**
 * Component to select an country with mouse and keyboard
 */
function CountrySelector() {
    let filteredCountryList: string[] = [];
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]); // ref for dropdown

    const [countryInput, setCountryInput] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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


    /**
     * Handles the click in the dropdown menu
     */
    const handleClickCountry = (countryName: string) => {
        setCountryInput(countryName);
        setActiveIndex(-1);
        setIsDropdownOpen(false);
        localStorage.setItem("selectedCountry", countryName);
    };

    /**
     * Handles the typing in the input element
     */
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountryInput(e.target.value);
        setActiveIndex(-1);
    };

    /**
     * Handles the delete button
     */
    const handleDelete = (e: React.MouseEvent<SVGElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setCountryInput("");
        setActiveIndex(-1);
        setIsDropdownOpen(false);
        localStorage.setItem("selectedCountry", "");
    };

    /**
     * Handles all keyboard events
     */
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

    /**
     * Generates a the country list of the dropdown
     */
    const generateCountryList = () => {
        let countryList = [];
        let countryNameList = [];

        const countryListCompleteReformated = countryListComplete.map((el) => `${el.name} (${el.code})`);
        for (const [index, country] of countryListCompleteReformated.entries()) {
            
            let countryName = <>{country}</>;
            if (countryInput) {
                countryName = <HighlightedText text={country} highlight={countryInput} />
                if (!country.toLowerCase().includes(countryInput.toLocaleLowerCase())) {
                    continue;
                }
            }

            let classes = "btn-ghost";
            if (countryList.length == activeIndex) {
                classes += " btn-active";
            }

            countryList.push(
                <li
                    key={index}
                    ref={(el) => (itemRefs.current[index] = el)}
                >
                    <button
                        className={classes}
                        onClick={() => handleClickCountry(country)}
                    >
                        {countryName}
                    </button>
                </li>
            );

            countryNameList.push(country);
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

export default CountrySelector;
