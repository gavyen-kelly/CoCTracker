import { useState } from "react"



const SearchBox = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery)
            setSearchQuery('')
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input className="block w-md bg-stone-200 p-2 border border-gray-300 rounded"
                    type="text"
                    placeholder="Enter clan name or tag"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>
        </div>
    )
}
export default SearchBox  