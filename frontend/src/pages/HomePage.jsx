import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import Buttonx from '../components/Buttonx';
import ResultList from '../components/ResultList';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://100.101.155.19:5000'
})


function HomePage() {
    const [results, setResults] = useState([])
    const [error, setError] = useState(null)
    const [searchType, setSearchType] = useState('clan')
    const navigate = useNavigate()

    useEffect(() => {
        console.log('searchType updated:', searchType);
    }, [searchType]);

    const handleSearch = async (query) => {
        if (!query) {
            setError('Please enter a search query');
            return
        }
        setError(null)
        setResults([])
        try {
            let response;
            if (searchType === 'clan') {
                response = await api.get('/api/clans', { params: { query } })
                setResults(response.data.items || [])
            } else {
                const playerTag = query.replace('#', '').trim().toUpperCase();
                if (!playerTag.match(/^[0-9A-Z]{3,}$/)) {
                    setError('Invalid player tag. Use alphanumeric characters (e.g., #2PP).');
                    return;
                }
                response = await api.get(`/api/players/${playerTag}`);
                setResults([response.data]);
            }
            console.log('Search Results: ', response.data);
        } catch (err) {
        }
    }
    const handleResultClick = (item) => {
        const tag = item.tag.replace('#', '')
        const path = searchType === 'clan' ? `/clan/${tag}` : `/player/${tag}`
        navigate(path)
    }
    return (
        <div className='flex flex-col items-center pt-16'>
            <h1 className='text-3xl font-bold text-center mt-4'>Clash Stat Tracker</h1>
            <div className='flex flex-row flex-nowrap justify-center items-center gap-2 mt-4'>
                <SearchBox onSearch={handleSearch} />
                <Buttonx
                    className={`bg-blue-500 text-white p-2 hover:cursor-pointer rounded ${searchType === 'clan' ? 'opacity-100' : 'opacity-50'}`}
                    text='Clan'
                    onClickFunction={() => {
                        setSearchType('clan')
                    }}
                />
                <Buttonx
                    className={`bg-blue-500 text-white p-2 hover:cursor-pointer rounded ${searchType === 'player' ? 'opacity-100' : 'opacity-50'}`}
                    text='Player'
                    onClickFunction={() => {
                        setSearchType('player')
                    }}
                />
            </div>
            {error && <p className='mt-4 text-red-500'>{error}</p>}
            <ResultList clans={results} onResultClick={handleResultClick} />
        </div>
    );
}

export default HomePage;