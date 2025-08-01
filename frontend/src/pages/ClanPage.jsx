import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FixedSizeList } from 'react-window';

const api = axios.create({
    baseURL: 'http://100.101.155.19:5000'
});

function ClanPage() {
    const { clanTag } = useParams();
    const [clanData, setClanData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [warLogData, setWarLogData] = useState([])

    useEffect(() => {
        const fetchClan = async () => {
            try {
                const response = await api.get(`/api/clans/${clanTag}`);
                const responseWarLog = await api.get(`/api/${clanTag}/warlog`)
                console.log('Clan Data:', JSON.stringify(response.data, null, 2));
                console.log('Clan War Log', JSON.stringify(responseWarLog.data, null, 2))
                setClanData(response.data);
                setWarLogData(responseWarLog.data)
            } catch (err) {
                setError('Failed to fetch clan data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchClan();
    }, [clanTag]);

    const ROW_HEIGHT = 48;
    const VISIBLE_ROWS = 8;

    const Row = ({ index, style }) => {
        const member = clanData?.memberList?.[index];
        if (!member) return null;

        return (
            <div style={style}>
                <table className="w-full table-bordered text-center">
                    <tbody>
                        <tr key={member.tag} className="border-b">
                            <td className="border-r px-4 py-2">{index + 1}</td>
                            <td className="border-r px-4 py-2">{member.trophies}</td>
                            <td className="border-r px-4 py-2">{member.name}</td>
                            <td className="px-4 py-2">{member.warStars || 0}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;

    return (
        <div className="flex justify-center items-start w-full pt-[60px]">
            <div className="bg-blue-600 w-[80vw] flex flex-col p-4 text-white h={60vh}">
                <div className="flex flex-row justify-evenly">
                    <div className="bg-green-500 w-1/2 h-[30vh] p-4">
                        <h1 className="text-xl font-bold">{clanData?.name || 'Clan Name'}</h1>
                        <p>Tag: {clanData?.tag}</p>
                        <p>Level: {clanData?.clanLevel}</p>
                        <p>Members: {clanData?.members}/50</p>
                    </div>
                    <div className="bg-green-500 w-1/2 p-4">
                        <h1 className="text-xl font-bold">Clan Wars</h1>
                        <p>War Win Streak: {clanData?.warWinStreak || 0}</p>
                        <p>Wins: {clanData?.warWins || 0}</p>
                        <p>Check console for full API response</p>
                    </div>
                </div>
                <div className="bg-white flex flex-col mt-auto mx-auto w-full text-black flex-grow">
                    <table className="w-full table-bordered text-center">
                        <thead>
                            <tr>
                                <th className="border-b px-4 py-2">Rank</th>
                                <th className="border-b px-4 py-2">Trophies</th>
                                <th className="border-b px-4 py-2">Name</th>
                                <th className="border-b px-4 py-2">War Stars</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="overflow-auto" style={{ height: `${ROW_HEIGHT * VISIBLE_ROWS}px` }}>
                        {clanData?.memberList?.length > 0 ? (
                            <FixedSizeList
                                height={ROW_HEIGHT * VISIBLE_ROWS}
                                width="100%"
                                itemCount={clanData?.memberList?.length || 0}
                                itemSize={ROW_HEIGHT}
                            >
                                {Row}
                            </FixedSizeList>
                        ) : (
                            <div className="text-center py-4">No members found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClanPage;