import { useState } from "react";
import poketypes from "../assets/types.json";

function ToggleType({setType, type}) {
    const [index, setIndex] = useState(9);
    const types = [
        "normal", 
        "fighting", 
        "flying", 
        "poison", 
        "ground", 
        "rock", 
        "bug", 
        "ghost", 
        "steel", 
        "fire", 
        "water", 
        "grass", 
        "electric", 
        "psychic", 
        "ice", 
        "dragon", 
        "dark", 
        "fairy"
    ];

    const handleTypeChange = (e) => {
        e.preventDefault();
        // setType(newType);
    }

    const handlePreviousType = (e) => {
        e.preventDefault();
        let num = index - 1;
        if (num < 0) {
            num = types.length - 1;
        }
        setIndex(num);
        setType(types[num]);
    }

    const handleNextType = (e) => {
        e.preventDefault();
        let num = index + 1;
        if (num >= types.length) {
            num = 0;
        }
        setIndex(num);
        setType(types[num]);
    }

    return (
        <div className="type-toggle">
            <button className={`arrow-button ${type}`} onClick={(e) => handlePreviousType(e)}>
                <img src={`${process.env.PUBLIC_URL}/left.png`} alt="left"/>
            </button>
            <button className={`type-button ${type}`} key={index} onClick={(e) => handleTypeChange(e)}>
                <img src={`${process.env.PUBLIC_URL}/${poketypes[types[index]]}`} alt={poketypes[index]}/>
            </button>
            <button className={`arrow-button ${type}`} onClick={(e) => handleNextType(e)}>
                <img src={`${process.env.PUBLIC_URL}/right.png`} alt="right"/>
            </button>
        </div>
    );
};

export default ToggleType;