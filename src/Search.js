import React, {useState, useEffect} from "react";
import axios from "axios";
import { ApiKey } from "./ApiKey";
import "./Search.css";
import forest from "./forest.png"

function Search(){
    const [parks, setParks] = useState([]);
    const [term, setTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const loadParks = async () => {
            const response = await axios.get(`https://developer.nps.gov/api/v1/parks?limit=500&${ApiKey}`);
            setParks(response.data.data);
        }
        loadParks();
    }, [])

    const handleChange = (term) => {
        let matches = [];
        if (term.length > 0){
            matches = parks.filter(park => {
                const regex = new RegExp(`${term}`, "gi");
                return park.fullName.match(regex);
            })
        }
        if (matches.length > 50){
            setSuggestions([]);
        } else {
            setSuggestions(matches);
        }
        setTerm(term);
    }

    const updateSearchTerm = (term) => {
        setTerm(term);
        setSuggestions([]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let matches = [];
        if (term.length > 0 && term !== " "){
            matches = parks.filter(park => {
                const regex = new RegExp(`${term}`, "gi");
                return (park.fullName.match(regex) || park.states.match(regex));
            })
        }
        setResults(matches);
        setSuggestions([]);
        setTerm("");
    }


    return (
        <>
            <div className="header" style={{backgroundImage: `url(${forest})`}}/>
            <div className="search">
                <h1><b>Search National Parks</b></h1>
                <form onSubmit={handleSubmit}>
                    <div className="launch mt-5">
                        <div className="autocomplete">
                            <input type="text" 
                                placeholder="Search by State Code (ex: CA) or Park Name"
                                onChange={e => handleChange(e.target.value)}
                                value={term}
                                onBlur={() => {
                                    setTimeout(() => {
                                    setSuggestions([])
                                    }, 250);
                                }}
                            />
                            <div className="suggestions">
                                {suggestions && suggestions.map((suggestion, i) =>
                                    <div className="suggestion" key={i}
                                        onClick={() => updateSearchTerm(suggestion.fullName)}
                                    >{suggestion.fullName}</div>
                                )}
                            </div>
                        </div>
                        <button className="search-button">Search</button>
                    </div>
                </form>
            </div>
            <div className="search-results">
                {results && results.map((result) =>
                    <a href={`/${result.parkCode}`}  className="result" key={result.parkCode}>
                        <div>
                            <h2>{result.fullName}</h2>
                            <p>{result.description}</p>
                            <h4>States: {result.states.substring(0, 23)}</h4>
                        </div>
                    </a>
                )}
            </div>
        </>
    )
}

export default Search;
