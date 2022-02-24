import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ToolbarComp from "./Components/ToolbarComp";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import PostPage from "./Pages/PostPage";
import AllPage from "./Pages/AllPage";
import SinglePage from "./Pages/SinglePage";
import HistoryPage from "./Pages/HistoryPage";
import BidPage from "./Pages/BidPage";
import {useState} from "react";
import {MyContext} from "./contexts/MyContext";

function App() {

  const [getUser, setUser] = useState(null);

    console.log(getUser)

  return (
    <div className="App">
        <MyContext.Provider value={{getUser, setUser}}>
            <BrowserRouter>
                <ToolbarComp/>
                <Routes>
                    <Route path="/" element={<RegisterPage/>} exact/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/create" element={<PostPage/>}/>
                    <Route path="/all" element={<AllPage/>}/>
                    <Route path="/single/:id" element={<SinglePage/>}/>
                    <Route path="/history" element={<HistoryPage/>}/>
                    <Route path="/my-bids" element={<BidPage/>}/>
                </Routes>
            </BrowserRouter>
        </MyContext.Provider>
    </div>
  );
}

export default App;
