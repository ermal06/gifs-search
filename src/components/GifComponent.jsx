import { useEffect, useState } from 'react';

function GifComponent({ gif, status }) {
    const [isLiked, setIsLiked] = useState(status);

    // Update the liked status whenever the status prop changes
    useEffect(() => {
        setIsLiked(status);
    }, [status]);

    const toggleLike = () => {
        const newLikedStatus = !isLiked;
        setIsLiked(newLikedStatus);
        if (newLikedStatus) {
            // Save image as favorite in local storage
            localStorage.setItem(gif.id, JSON.stringify(gif));
        } else {
            // Remove image from favorites in local storage
            localStorage.removeItem(gif.id);
        }

        // Dispatch custom event to notify components of localStorage change
        window.dispatchEvent(new Event('localStorageChange'));
    };

    return (
        <div className="card border-white">
            <img className="card-img" src={gif.images.downsized_large.url} alt={gif.title}/>
            {/* Overlay */}
            <div className="card-img-overlay d-flex justify-content-center align-items-center">
                <div className="text-overlay">
                    <button className="overlay" onClick={toggleLike}>
                        {isLiked ?
                            (<i className="fas fa-heart"></i>) :
                            (<i className="far fa-heart"></i>)
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GifComponent;
