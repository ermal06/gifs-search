import { useState, useEffect } from 'react';
import GifComponent from "../components/GifComponent.jsx";
import axios from '../services/axios'; // Import the Axios instance
import {useNavigate} from 'react-router-dom';
import ColumnContainer from "../components/ColumnContainer.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";


export default function Search() {
    const [gifs, setGifs] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9); // Number of items per page
    const [lastModifiedTimes, setLastModifiedTimes] = useState({}); // State to track the last modified time of localStorage for each gif.id
    const navigate = useNavigate();

    // Function to fetch data
    const fetchData = async () => {
        try {
            const response = await axios.get('/search', {
                params: {
                    q: query,
                    limit: itemsPerPage, // Number of items per page
                    offset: (currentPage - 1) * itemsPerPage // Calculate offset based on current page
                },
            });
            setGifs(response.data.data.map((gif, index) => ({ ...gif, uniqueId: `${gif.id}_${index}` }))); // Update state with the fetched data and generate unique IDs
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to handle input change
    const handleInputChange = (event) => {
        setQuery(event.target.value); // Update query state with user input
    };

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Update currentPage state
    };

    useEffect(() => {
        fetchData();
    }, [query, currentPage]); // Fetch data when the query or currentPage changes

    // Listen for custom event to handle localStorage changes
    useEffect(() => {
        const handleLocalStorageChange = () => {
            // Update last modified time for each gif.id in the state
            const updatedLastModifiedTimes = {};
            gifs.forEach(gif => {
                updatedLastModifiedTimes[gif.id] = Date.now();
            });
            setLastModifiedTimes(updatedLastModifiedTimes);
        };

        window.addEventListener('localStorageChange', handleLocalStorageChange);

        return () => {
            window.removeEventListener('localStorageChange', handleLocalStorageChange);
        };
    }, [gifs]); // Re-run effect whenever gifs change

    const handleFavorites = () => {
        // Replace '/path/to/navigate' with the desired path
        navigate('/fav');
    };
    return (
        <div className={gifs.length > 0 ? "container" : "container d-flex justify-content-center align-items-center vh-100"}>
            <div className="search m-2">
                <div className="row align-items-center">
                    <div className="col-md-9">
                        <div className="search-2"><i className='bx bxs-map'></i>
                            <input
                                type="text"
                                placeholder="Search for GIFs"
                                value={query}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-3 d-flex justify-content-end">
                        <span tabIndex="0" data-toggle="tooltip" title="Go to your favorite GIFs">
                            <button className="btn btn-success" onClick={handleFavorites}>
                                <i className="fa-solid fa-heart"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>

            {gifs.length > 0 && (
                <div className="search-results m-2">
                    <ColumnContainer gifs={gifs} lastModifiedTimes={lastModifiedTimes} />

                    <div className="d-flex justify-content-center py-3">
                        {/* Previous page button */}
                        <button className="btn btn-primary btn-sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <div className="border">
                            <span className="card-body">{currentPage}</span>
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={() => handlePageChange(currentPage + 1)} disabled={gifs.length < itemsPerPage}>Next</button>
                    </div>
                </div>
            )}

            <div>
                {/* ScrollToTopButton */}
                <ScrollToTopButton />
            </div>
        </div>
    );
}
