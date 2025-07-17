function Card({ name, level, members, points }) {
    return (
        <div className="w-full max-w-md border border-gray-300 bg-white rounded-md shadow-md p-4">
            <p>{name}</p>
            <p>Lvl {level}</p>
            <p>Members: {members}</p>
            <p>Points: {points}</p>
        </div>
    );
}

export default Card;