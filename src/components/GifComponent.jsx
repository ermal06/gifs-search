
function GifComponent({gif}){
    return(
            <div className="card m-1">
                <img key={gif.id} src={gif.images.downsized_large.url}
                     height={'336px'}
                     alt={gif.title} />
                <div className="card-body">
                    <h5 className="card-title">{gif.title}</h5>
                    <a href="#" className="btn btn-primary">Add to favorite</a>
                </div>
            </div>
    );
}
export default GifComponent;