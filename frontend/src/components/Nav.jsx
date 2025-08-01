import { Link } from 'react-router-dom';

function Nav() {
    return (
        <div className="flex justify-start items-start p-5">
            <Link to="/" className="p-2 text-lg text-black hover:text-gray-600 hover:cursor-pointer">
                Home
            </Link>
            <Link to="/leaderboard" className="p-2 text-lg text-black hover:text-gray-600 hover:cursor-pointer">
                Leaderboard
            </Link>
        </div>
    );
}

export default Nav;