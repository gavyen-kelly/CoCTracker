import { useState } from 'react';
import SearchBox from '../components/SearchBox';
import Buttonx from '../components/Buttonx';
import ResultList from '../components/ResultList';
import { mockClans } from '../services/mockData';


function HomePage() {
    const [results, setResults] = useState([])

    const handleSearch = (query) => {
        const filtered = mockClans.filter(clan =>
            clan.name.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered)
        console.log('Filtered clans:', filtered);
    }
    return (
        <div className='flex flex-col items-center pt-16'>
            <h1 className='text-3xl font-bold text-center mt-4'>Clash Stat Tracker</h1>
            <div className='flex flex-row flex-nowrap justify-center items-center gap-2 mt-4'>

                <SearchBox onSearch={handleSearch} />
                <Buttonx className='bg-blue-500 text-white p-2 rounded' text='clan' />
                <Buttonx className='bg-blue-500 text-white p-2 rounded' text='player' />
            </div>
            <ResultList clans={results} /> 
        </div>
    );
}

export default HomePage;