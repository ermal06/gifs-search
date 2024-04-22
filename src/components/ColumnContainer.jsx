import GifComponent from './GifComponent';

const ColumnContainer = ({ gifs, lastModifiedTimes }) => {
    return (
        <div className="row">
            {[...Array(3)].map((_, columnIndex) => (
                <div className="col-md-4" key={columnIndex}>
                    {gifs
                        .slice(columnIndex * Math.ceil(gifs.length / 3), (columnIndex + 1) * Math.ceil(gifs.length / 3))
                        .map((gif) => (
                            <div key={gif.id}>
                                <GifComponent key={`${gif.id}_${lastModifiedTimes[gif.id]}`} gif={gif} status={localStorage.getItem(gif.id) !== null} />
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default ColumnContainer;
