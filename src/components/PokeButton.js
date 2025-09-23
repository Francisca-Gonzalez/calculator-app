import pokemons from "../assets/numbers.json";
import operators from "../assets/specials.json";
import sp_numbers from "../assets/sp-numbers.json";

function PokeButton({
    type, 
    num, 
    inputRef, 
    number, 
    operator, 
    operation, 
    setOperation, 
    setNum1, 
    setNum2, 
    num1, 
    num2, 
    operateNumbers, 
    setResult,
    waitingNum2,
    setWaitingNum2,
    playSound
}) {    
    const actualInput = inputRef;

    const handleNumber = (e) => {
        e.preventDefault();

        if (number) playSound(type, num, "num_cries");
        else playSound(type, num, "sp_cries");

        if(waitingNum2){
            actualInput.current.value = "";
            setWaitingNum2(false);
        }

        let currentValue = actualInput.current.value ?? "";

        if(number){
            currentValue = currentValue === "0" ? (num + 1).toString() : currentValue + (num + 1).toString();
        } else {
            if(num === 0){
                if(!currentValue.includes(",")){
                    currentValue = currentValue === "" ? "0." : currentValue + ".";
                }
            } else if(num === 1){
                currentValue = currentValue + "0";
            } else {
                currentValue = currentValue + (num + 1).toString();
            }
        }

        actualInput.current.value = currentValue;
    }

    const handleOperator = (e, num) => {
        e.preventDefault();

        playSound(type, num, "spec_cries");

        const parsedValue = Number(actualInput.current.value);

        if(num === 0) { /* delete all */
            setOperation(null);
            setNum1(null);
            setNum2(null);
            actualInput.current.value = "";
            setResult(0);
        } else if(num === 1) { /* delete */
            if (actualInput.current.value.length > 1) {
                actualInput.current.value = actualInput.current.value.slice(0, -1);
            } else {
                actualInput.current.value = null;
            }
        } else if(num === 2) { /* multiply */
            setNum1(parsedValue);
            setOperation("*");
            setWaitingNum2(true);
        } else if(num === 3) { /* divide */
            setNum1(parsedValue);
            setOperation("/");
            setWaitingNum2(true);
        } else if(num === 4) { /* add */
            setNum1(parsedValue);
            setOperation("+");
            setWaitingNum2(true);
        } else if(num === 5) { /* subtract */
            setNum1(parsedValue);
            setOperation("-");
            setWaitingNum2(true);
        }

    };

    const route = number
    ? pokemons[type][num]
    : operator
    ? operators[num]
    : sp_numbers[num];

    return (
    <>
    {number ? (
        <button className={`poke-button ${type}`} onClick={handleNumber}>
            <p className={`num ${type}`}>{num + 1}</p>
            <img src={`${process.env.PUBLIC_URL}/${route}`} alt={type}/>
        </button>
    ) : (
        <>
        {num === 6 ? (
            <button className={`poke-button-large ${type}`} onClick={() => (operateNumbers())}>
                <p className={`num ${type}`}>
                    =
                </p>
                <img src={`${process.env.PUBLIC_URL}/${route}`} alt={type}/>
            </button>
        ) : (
            <button className={`poke-button ${type}`} onClick={operator ? ((e) => (handleOperator(e, num))) : (handleNumber)}>
                {!operator ? (
                    <>
                        <p className={`num ${type}`}>
                            {num === 0 ? "." : num === 1 ? "0" : null}
                        </p>
                        <img src={`${process.env.PUBLIC_URL}/${route}`} alt={type}/>
                    </>
                ):(
                    <>
                        {num === 0 || num === 1 ? (
                            null
                        ) : (
                            <p className={`num ${type}`}>
                                {num === 2 ? "x" : num === 3 ? "÷" : num === 4 ? "+" : num === 5 ? "-" : null}
                            </p>
                        )}
                        
                        <img src={`${process.env.PUBLIC_URL}/${route}`} alt={type}/>
                    </>
                )}
            </button>
        )}
        </>
    )}
    </>
    );
};

export default PokeButton;