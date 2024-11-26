import { useEffect, useState } from "react";

function useDebounce(value, delay) {
    const [valueDebounced, setValueDebounce] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setValueDebounce(value), delay);
        return () => clearTimeout(handler);
    });
    return valueDebounced;
}

export default useDebounce;
