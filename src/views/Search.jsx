import { useState, useEffect } from 'react';
import GifComponent from "../components/GifComponent.jsx";
import axios from '../services/axios'; // Import the Axios instance

export default function Search() {
    const [gifs, setGifs] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12); // Number of items per page

    useEffect(() => {
        fetchData();
    }, [query, currentPage]); // Fetch data when the query or currentPage changes

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

    const handleInputChange = (event) => {
        setQuery(event.target.value); // Update query state with user input
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Update currentPage state
    };

    return (
        <div className="container mb-3">
            <div className="search">
                <div className="row">
                    <div className="col-md-12">
                        <div>
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
                    </div>
                </div>
            </div>
            <div className="search-results">
                <div id="images-wrapper">
                    {gifs.map((gif) => (
                        <div key={gif.id}>
                            <GifComponent gif={gif} />
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-center py-3">
                    {/* Previous page button */}
                    <button className="btn btn-primary btn-sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <div className="border">
                        <span className="card-body">{currentPage}</span>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => handlePageChange(currentPage + 1)} disabled={gifs.length < itemsPerPage}>Next</button>
                </div>
            </div>
        </div>
    )
}
