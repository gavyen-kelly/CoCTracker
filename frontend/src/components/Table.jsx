

const Table = () => {
    return (
        <div className="flex justify-center">
            <table className="w-md table-bordered">
                <thead>
                    <tr>
                        <th className="text-left">Rank</th>
                        <th className="text-left">Trophies</th>
                        <th className="text-left">Player</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>5900</td>
                        <td>Dolphin</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>5900</td>
                        <td>Chicken</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>5900</td>
                        <td>Dolph</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;