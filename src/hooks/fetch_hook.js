import { useState, useEffect } from "react";
const apiUrl = 'https://gist.githubusercontent.com/abhijit-paul-blippar/0f97bb6626cfa9d8989c7199f7c66c5b/raw/dcff66021fba04ee8d3c6b23a3247fb5d56ae3e5/words';

export const useFetch = (run) => {
    const [ response, setResponse ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        // if 'run' bool is true, then fetchData
        if (run) {
        const fetchData = async () => {
            setLoading(true); // loading
            try {
            const res = await fetch(apiUrl);
            const resText = await res.text(); // get response as string
            const json = resText.split('\n'); // convert string to arr 
            setResponse(json); // set response as json
            setLoading(false); // loading complete
            } catch(err) {
            console.log('%cAn Error has occured');
            console.log(err);
            }
        };
        fetchData();
        }
    }, [run, apiUrl]);

    return { response, loading }
}