import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import ColumnContainer from "../components/ColumnContainer.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";


export default function Favorite() {
    const [likedImages, setLikedImages] = useState([]);
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
            fetchData();
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

            <div className="search-results">
                {likedImages.length > 0 ? (
                    <ColumnContainer gifs={likedImages} lastModifiedTimes={''} />
                ) : (
                    <div className="text-center mt-3 h4">No favorite GIFs found.</div>
                )}
            </div>

            <div>
                {/* ScrollToTopButton */}
                <ScrollToTopButton />
            </div>
        </div>
    );

}