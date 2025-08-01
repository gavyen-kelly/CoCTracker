import Card from './Card';

function ResultList({ clans, onResultClick }) {
    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl mt-4">
            {clans.length > 0 ? (
                clans.map(clan => (
                    <div key={clan.tag} onClick={() => onResultClick(clan)} className="cursor-pointer">
                        <Card
                            name={clan.name}
                            level={clan.clanLevel || clan.townHallLevel}
                            members={clan.members}
                            points={clan.points || clan.trophies}
                        />
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No results found</p>
            )}
        </div>
    );
}

export default ResultList;