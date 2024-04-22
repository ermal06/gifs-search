import React, { useEffect, useState } from 'react';

function GifComponent({ gif }) {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        // Load like status from local storage
        const likedStatus = localStorage.getItem(gif.id);
        if (likedStatus === 'true') {
            setIsLiked(true);
        }
    }, [gif.id]);

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
        console.log(isLiked);
    };

    return (
        <div className="card">
            <img className="card-img" src={gif.images.downsized_large.url} alt={gif.title} />
            <div className="overlay"></div> {/* Overlay */}
            <div className="card-img-overlay d-flex justify-content-center align-items-center">
                <div className="text-overlay">
                    <button onClick={toggleLike}>
                        {isLiked ? <i className="far fa-heart"></i> : <i className="fas fa-heart"></i>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GifComponent;
