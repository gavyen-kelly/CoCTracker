import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://100.101.155.19:5000' // Pi's Tailscale IP
});

function ClanPage() {
    const { clanTag } = useParams();
    const [clanData, setClanData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClan = async () => {
            try {
                const response = await api.get(`/api/clans/${clanTag}`);
                console.log('Clan Data:', JSON.stringify(response.data, null, 2));
                setClanData(response.data);
            } catch (err) {
                setError('Failed to fetch clan data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchClan();
    }, [clanTag]);

    if (loading) return <div className='flex justify-center items-center min-h-screen'>Loading...</div>;
    if (error) return <div className='flex justify-center items-center min-h-screen text-red-500'>{error}</div>;

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='bg-blue-600 w-[80vw] h-[90vh] flex flex-col p-4 text-white'>
                <div className='flex flex-row justify-evenly'>
                    <div className='bg-green-500 w-1/2 h-[40vh] p-4'>
                        <h1 className='text-xl font-bold'>{clanData?.name || 'Clan Name'}</h1>
                        <p>Tag: {clanData?.tag}</p>
                        <p>Level: {clanData?.clanLevel}</p>
                        <p>Members: {clanData?.members}/50</p>
                    </div>
                    <div className='bg-green-500 w-1/2 p-4'>
                        <h1 className='text-xl font-bold'>Clan Wars</h1>
                        <p>War Win Streak: {clanData?.warWinStreak || 0}</p>
                        <p>Wins: {clanData?.warWins || 0}</p>
                        <p>Check console for full API response</p>
                    </div>
                </div>
                <div className='bg-white flex flex-col h-[60vh] mt-auto mx-auto w-full text-black'>
                    <table className='w-full table-bordered text-center'>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Trophies</th>
                                <th>Name</th>
                                <th>War Stars</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clanData?.memberList?.map((member, index) => (
                                <tr key={member.tag}>
                                    <td>{index + 1}</td>
                                    <td>{member.trophies}</td>
                                    <td>{member.name}</td>
                                    <td>{member.warStars || 0}</td>
                                </tr>
                            )) || <tr><td colSpan="4">No members found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ClanPage;