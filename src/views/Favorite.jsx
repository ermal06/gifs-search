import {useEffect, useState} from "react";
import GifComponent from "../components/GifComponent.jsx";
import {useNavigate} from 'react-router-dom';


export default function Favorite() {
    const [likedImages, setLikedImages] = useState([]);
    const [lastModifiedTimes, setLastModifiedTimes] = useState({}); // State to track the last modified time of localStorage for each gif.id
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        try {
            // Load liked images from local storage
            const keys = Object.keys(localStorage);
            const likedImagesArray = keys.map(key => JSON.parse(localStorage.getItem(key)));
            setLikedImages(likedImagesArray);
        } catch (error) {
            console.error('Error loading liked images from local storage:', error);
            // Handle the error, e.g., set default state or display an error message
        }
    };


    const clearLocalStorage = () => {
        try {
            localStorage.clear();
            setLikedImages([]); // Clear the state after clearing local storage
        } catch (error) {
            console.error('Error clearing local storage:', error);
        }
    }

    // Listen for custom event to handle localStorage changes
    useEffect(() => {
        const handleLocalStorageChange = () => {
            // Update last modified time for each gif.id in the state
            const updatedLastModifiedTimes = {};
            likedImages.forEach(gif => {
                updatedLastModifiedTimes[gif.id] = Date.now();
                fetchData();
            });
            setLastModifiedTimes(updatedLastModifiedTimes);
        };

        window.addEventListener('localStorageChange', handleLocalStorageChange);

        return () => {
            window.removeEventListener('localStorageChange', handleLocalStorageChange);
        };
    }, [likedImages]);

    const handleSearch = () => {
        // Replace '/path/to/navigate' with the desired path
        navigate('/');
    };

    return (
        <div className="container my-3">
            <div className="search-results">
                <div className="d-flex justify-content-between align-items-center p-3 bg-dark">
                    <h2 className="text-white mb-0">My Favorite GIFs</h2>
                    <div>
                    <span className="d-inline-block mx-3" tabIndex="0" data-toggle="tooltip" title="Delete all Favorite GIFs">
                        <button className="btn btn-danger" onClick={clearLocalStorage}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </span>
                        <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Search for more GIFs">
                        <button className="btn btn-success" onClick={handleSearch}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </span>
                    </div>
                </div>
                {likedImages.length > 0 ? (
                    <div id="images-wrapper">
                        {likedImages.map((gif) => (
                            <div key={gif.id}>
                                <GifComponent key={`${gif.id}_${lastModifiedTimes[gif.id]}`} gif={gif} status={localStorage.getItem(gif.id) !== null}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-3 h4">No favorite GIFs found.</div>
                )}
            </div>
        </div>
    );

}