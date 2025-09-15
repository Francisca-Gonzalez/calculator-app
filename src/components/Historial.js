function Historial({
    resultHistory,
    type
}) {
    return (
        <div>
            {resultHistory?.map((entry, index) => (
                <div key={index} className="history-entry">
                    <p className={`num ${type}`}>
                        {entry.num1} {entry.operation} {entry.num2}
                    </p>
                    <p className={`num ${type}`}>
                        = {entry.result}
                    </p>
                    <p className={`divider ${type}`}></p>
                </div>
            ))}
        </div>
    );
};

export default Historial;