import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://100.101.155.19:5000' // Pi's Tailscale IP
});

function PlayerPage() {
    const { playerTag } = useParams();
    const [playerData, setPlayerData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await api.get(`/api/players/${playerTag}`);
                console.log('Player Data:', JSON.stringify(response.data, null, 2));
                setPlayerData(response.data);
            } catch (err) {
                setError('Failed to fetch player data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlayer();
    }, [playerTag]);

    if (loading) return <div className='flex justify-center items-center min-h-screen'>Loading...</div>;
    if (error) return <div className='flex justify-center items-center min-h-screen text-red-500'>{error}</div>;

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='bg-blue-600 w-[80vw] h-[90vh] flex flex-col p-4 text-white'>
                <h1 className='text-2xl font-bold'>Player Data</h1>
                {playerData && (
                    <div className='mt-4'>
                        <p>Name: {playerData.name}</p>
                        <p>Tag: {playerData.tag}</p>
                        <p>Town Hall Level: {playerData.townHallLevel}</p>
                        <p>Trophies: {playerData.trophies}</p>
                        <p>War Stars: {playerData.warStars}</p>
                        <p>Check console for full API response</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlayerPage;