import Search from "./Search";
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import Park from "./Park";
import NavBar from "./NavBar";
import Error404 from "./Error404";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Search />}/>
          <Route exact path="/:park" element={<Park />} />
          <Route path="/404" element={<Error404 />} />
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
