import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlayerPage from './pages/PlayerPage';
import ClanPage from './pages/ClanPage';
import LeaderboardPage from './pages/LeaderboardPage';
import Nav from './components/Nav';
import "./index.css"

function App() {
  return (
    <div className='bg-yellow-400 w-full min-h-screen overflow-hidden'>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/player/:playerTag" element={<PlayerPage />} />
        <Route path="/clan/:clanTag" element={<ClanPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </div>
  );
}

export default App;