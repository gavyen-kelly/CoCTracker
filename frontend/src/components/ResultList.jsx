import { Link } from 'react-router-dom';
import Card from './Card';

function ResultList({ clans }) {
    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
            {clans.length > 0 ? (
                clans.map(clan => (
                    <Link key={clan.tag} to={`/clan/${clan.tag}`}>
                        <Card
                            name={clan.name}
                            level={clan.clanLevel}
                            members={clan.members}
                            points={clan.points}
                        />
                    </Link>
                ))
            ) : (
                <p className="text-center text-gray-500">No results found</p>
            )}
        </div>
    );
}

export default ResultList;