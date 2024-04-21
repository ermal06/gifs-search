import GifComponent from "../components/GifComponent.jsx";

export default function Search() {
    const items = Array.from({ length: 10 }, (_, index) => index + 1);

    return (
        <div className="container">
            <div className="search">
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <div className="search-2"><i className='bx bxs-map'></i>
                                <input type="text" placeholder="Gif Search" />
                                <button>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="row">
                    {items.map(item => (
                        <div className="col-md-3" key={item}>
                            <GifComponent />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}