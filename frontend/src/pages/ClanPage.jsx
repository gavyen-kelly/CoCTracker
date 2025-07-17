import { Link } from 'react-router-dom';

function ClanPage() {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='bg-blue-600 w-[80vw] h-[90vh] flex flex-col'>
                <div className='flex flex-row justify-evenly'>
                    <div className='bg-green-500 w-1/2 h-[40vh]'>
                        <h1>Clan Name</h1>
                        <p>Clan Rank and Badge</p>
                        <p>Clan Req</p>
                        <p>Members: 50/50</p>
                    </div>
                    <div className='bg-green-500 w-1/2'>
                        <h1>Clan Wars</h1>
                        <h1>Clan Streak</h1>
                        <h1>War Record</h1>
                    </div>
                </div>
                <div className='bg-white flex flex-col h-[60vh] mt-auto mx-auto w-full'>
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
                            <tr>
                                <td>1</td>
                                <td>5800</td>
                                <td>Dolph</td>
                                <td>38080</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>5800</td>
                                <td>Dolph</td>
                                <td>38080</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>5800</td>
                                <td>Dolph</td>
                                <td>38080</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>5800</td>
                                <td>Dolph</td>
                                <td>38080</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>5800</td>
                                <td>Dolph</td>
                                <td>38080</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>5800</td>
                                <td>Dolph</td>
                                <td>38080</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>5800</td>
                                <td>Dolph</td>
                                <td>38080</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ClanPage;