
import { Link } from 'react-router-dom';

function HamburgerMenu() {
    return (
        <div className="fixed top-0 left-0 z-10 p-4">
            <nav className="bg-gray-800 text-white rounded-md shadow-lg">
                <ul className="flex flex-col p-4">
                    <li className="mb-2">
                        <Link to="/" className="text-lg hover:text-yellow-400">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/leaderboard" className="text-lg hover:text-yellow-400">
                            Leaderboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/clan" className="text-lg hover:text-yellow-400">
                            Clan
                        </Link>
                    </li>
                    <li>
                        <Link to="/player" className="text-lg hover:text-yellow-400">
                            Player
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default HamburgerMenu;