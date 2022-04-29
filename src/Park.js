import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiKey } from "./ApiKey";
import "./Park.css";

const Park = () => {
    const navigate = useNavigate();
    const {park} = useParams();
    const [result, setResult] = useState([]);
    const [image, setImage] = useState([]);
    const [states, setStates] = useState("");
    const [prices, setPrices] = useState([]);
    const [address, setAddress] = useState([]);

    useEffect(() => {
        const loadPark = async () => {
            const res = await axios.get(`https://developer.nps.gov/api/v1/parks?parkCode=${park}&${ApiKey}`);
            console.log(res);
            if (res.data.data.length === 0) return navigate("/404", {replace: true});
            setResult(res.data.data[0]);
            setImage(res.data.data[0].images[0].url);
            setStates(res.data.data[0].states.replaceAll(",", ", "))
            setPrices(res.data.data[0].entranceFees);
            setAddress(res.data.data[0].addresses[0])
        }
        loadPark();
    }, [])

    return (
        <>
            <div className="park-header" style={{backgroundImage: `url(${image})`}}/>
            <div className="park-info">
                <div className="park-heading">
                    <h1>{result.fullName}</h1>
                    <h4>State(s): <small>{states}</small></h4>
                    <h3>Description:</h3>
                    <p>{result.description}</p>
                    <h3>Weather:</h3>
                    <p>{result.weatherInfo}</p>
                    <h3>Prices:</h3>
                    <ul>
                        {prices.map(price => 
                            <li><b>${price.cost}</b> - {price.title || price.description}</li>    
                        )}
                    </ul>
                    <h3 className="address">Address:</h3>
                    <small className="address-line-1">{address.line1}</small>
                    <small className="address-line-2">{address.city}, {address.stateCode} {address.postalCode}</small>

                </div>
            </div>
            
        </>
    )
}

export default Park;