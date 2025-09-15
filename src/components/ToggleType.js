import poketypes from "../assets/types.json";

function ToggleType({setType, type}) {
    const types = ["grass", "fire", "water"];

    const handleTypeChange = (e, newType) => {
        e.preventDefault();
        setType(newType);
    }

    return (
        <div>
            {types.map((t, index) => (
                <button className={`type-button ${type}`} key={index} onClick={(e) => handleTypeChange(e, t)}>
                    <img src={poketypes[t]} alt={t}/>
                </button>
            ))}
        </div>
    );
};

export default ToggleType;