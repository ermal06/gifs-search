import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from "./views/Search";
import Favorite from "./views/Favorite";


function App() {

  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path="/" element={<Search />} />
                  <Route path="/fav" element={<Favorite />} />
              </Routes>
          </div>
      </Router>
  )
}

export default App
