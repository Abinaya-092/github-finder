import { useState,useEffect } from "react"
// import image 
function App() {
  const [username, setUsername]=useState("")
  const [searchedUser, setSearchedUser]=useState("")
  const [userData, setUserData]=useState(null)
  const [error, setError]= useState("")
  useEffect(()=>{
  fetch(`https://api.github.com/users/${searchedUser}`)
  .then(res => res.json())
  .then(data => 
    {
      if(data.message==="Not Found")
      {
        setError("User Not Found")
        setUserData(null)
      }
      else{
        setError("")
        setUserData(data)
      }
    }
  )
  },[searchedUser])

return (
  <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-16 px-4">
    <h1 className="text-4xl font-bold mb-2">GitHub Profile Finder</h1>
    <p className="text-gray-400 mb-8">Search for any GitHub user</p>

    <div className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none w-64"
      />
      <button
        onClick={() => setSearchedUser(username)}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
      >
        Search
      </button>
    </div>

    {error && <p className="text-red-400 mb-4">{error}</p>}

    {userData && (
      <div className="bg-gray-800 rounded-2xl p-8 flex flex-col items-center w-80 gap-3">
        <img src={userData.avatar_url} className="w-24 h-24 rounded-full" />
        <h2 className="text-xl font-bold">{userData.name}</h2>
        <p className="text-gray-400 text-sm text-center">{userData.bio}</p>
        <div className="flex gap-6 mt-2">
          <div className="text-center">
            <p className="font-bold">{userData.followers}</p>
            <p className="text-gray-400 text-xs">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{userData.public_repos}</p>
            <p className="text-gray-400 text-xs">Repos</p>
          </div>
        </div>
      </div>
    )}
  </div>
)
}

export default App