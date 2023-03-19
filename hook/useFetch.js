import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY } from "@env";
const rapidApiKey = "1c696eeb37mshe1242fffa274dc7p1cdf6ajsn1a94da8542a6";

const useFetch = (endpoint, query) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const options = {
		method: "GET",
		url: `https://jsearch.p.rapidapi.com/${endpoint}`,
		params: { ...query },
		headers: {
			"X-RapidAPI-Key": rapidApiKey,
			"X-RapidAPI-Host": "jsearch.p.rapidapi.com",
		},
	};
    const fetchData = async () => {
        setIsLoading(true);
        try{
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        }catch(error){
            setError(error)
            alert('There is an error')
        }finally {
            setIsLoading(false)
        }
    }
    
    useEffect(()=>{
        fetchData()
    
    },[]);
    
    
    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return {data,isLoading,error,refetch};
};

export default useFetch;