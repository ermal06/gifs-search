import {useEffect, useState} from "react";
import GifComponent from "../components/GifComponent.jsx";

export default function Favorite(){
    const [likedImages, setLikedImages] = useState([]);

    useEffect(() => {
        try {
            // Load liked images from local storage
            const keys = Object.keys(localStorage);
            console.log(keys);
            const likedImagesArray = keys.map(key => JSON.parse(localStorage.getItem(key)));
            console.log(likedImagesArray);
            setLikedImages(likedImagesArray);
            // Clear local storage (optional)
            // localStorage.clear();
        } catch (error) {
            console.error('Error loading liked images from local storage:', error);
            // Handle the error, e.g., set default state or display an error message
        }
    }, []);

    const clearLocalStorage = () => {
        try {
            localStorage.clear();
            setLikedImages([]); // Clear the state after clearing local storage
        } catch (error) {
            console.error('Error clearing local storage:', error);
        }
    }

    return (
        <div className="container my-3">
            <div className="search-results">
                <button className="btn btn-primary" onClick={clearLocalStorage}>Clear Local Storage</button>
                <div id="images-wrapper">
                    {likedImages.map((gif) => (
                        <div key={gif.id}>
                            <GifComponent gif={gif} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}