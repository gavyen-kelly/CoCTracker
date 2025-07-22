import { useState } from 'react';
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

    const handleSearch = async (query) => {
        if (!query) return
        setError(null)
        setResults([])
        try {
            const endpoint = searchType === 'clan' ? '/api/clans' : '/api/players'
            const response = await api.get(endpoint, { params: { query } })
            const data = searchType === 'clan' ? response.data.items : [response.data]
            setResults(data)
            console.log('Search results: ', response.data)
        } catch (err) {
            setError('Failed to fetch data')
            console.error(err)
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
                    className={`bg-blue-500 text-white p-2 rounded ${searchType === 'clan' ? 'opacity-100' : 'opacity-50'}`}
                    text='Clan'
                    onClick={() => setSearchType('clan')}
                />
                <Buttonx
                    className={`bg-blue-500 text-white p-2 rounded ${searchType === 'player' ? 'opacity-100' : 'opacity-50'}`}
                    text='Player'
                    onClick={() => setSearchType('player')}
                />
            </div>
            {error && <p className='mt-4 text-red-500'>{error}</p>}
            <ResultList clans={results} onResultClick={handleResultClick} />
        </div>
    );
}

export default HomePage;