// import { useState,useEffect } from "react"
// // import image 
// function App() {
//   const [username, setUsername]=useState("")
//   const [searchedUser, setSearchedUser]=useState("")
//   const [userData, setUserData]=useState(null)
//   const [error, setError]= useState("")
//   const [loading, setLoading]= useState(false)
//   useEffect(()=>{
//   if(!searchedUser) return 
//   setLoading(true);
//   setError("") 
//   fetch(`https://api.github.com/users/${searchedUser}`)
//   .then(res => res.json())
//   .then(data => 
//     {
//       if(data.message==="Not Found")
//       {
//         setError("User Not Found")
//         setUserData(null)
//       }
//       else{
//         setError("")
//         setUserData(data)
//       }
//     setLoading(false);
    
//     }
//   )
  
//   },[searchedUser])

// return (
//   <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-16 px-4">
//     <h1 className="text-4xl font-bold mb-2">GitHub Profile Finder</h1>
//     <p className="text-gray-400 mb-8">Search for any GitHub user</p>

//     <div className="flex gap-2 mb-6">
//       <input
//         type="text"
//         placeholder="Enter GitHub username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none w-64"
//       />
//       <button
//         onClick={() => setSearchedUser(username)}
//         className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
//       >
//         Search
//       </button>
//     </div>

//     {error && <p className="text-red-400 mb-4">{error}</p>}

//     {userData && (
//       <div className="bg-gray-800 rounded-2xl p-8 flex flex-col items-center w-80 gap-3">
//         <img src={userData.avatar_url} className="w-24 h-24 rounded-full" />
//         <h2 className="text-xl font-bold">{userData.name}</h2>
//         <p className="text-gray-400 text-sm text-center">{userData.bio}</p>

//         <div className="flex gap-6 mt-2">
          
//           <div className="text-center">
//             <p className="font-bold">{userData.followers}</p>
//             <p className="text-gray-400 text-xs">Followers</p>
//           </div>
//           <div className="text-center">
//             <p className="font-bold">{userData.public_repos}</p>
//             <p className="text-gray-400 text-xs">Repos</p>
//           </div>
//           <div className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
//             <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
//               View Profile
//             </a>
//           </div>
         
//         </div>
//       </div>
//     )}
//     {loading && <p>Searching...</p>}
//   </div>
// )
// }

// export default App

import { useState, useEffect } from "react"

function App() {
  const [username, setUsername] = useState("")
  const [searchedUser, setSearchedUser] = useState("")
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!searchedUser) return
    setLoading(true)
    setError("")

    fetch(`https://api.github.com/users/${searchedUser}`)
      .then(res => res.json())
      .then(data => {
        if (data.message === "Not Found") {
          setError("User Not Found")
          setUserData(null)
        } else {
          setError("")
          setUserData(data)
        }
        setLoading(false)
      })
      .catch(() => {
        setError("An error occurred")
        setLoading(false)
      })
  }, [searchedUser])

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
          // DAY 4 ADDITION: Listen for the Enter key
          onKeyDown={(e) => e.key === "Enter" && setSearchedUser(username)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none w-64 border border-transparent focus:border-blue-500 transition-all"
        />
        <button
          onClick={() => setSearchedUser(username)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-blue-400 mb-4 animate-pulse">Searching...</p>}
      {error && <p className="text-red-400 mb-4">{error}</p>}

      {userData && !loading && (
        <div className="bg-gray-800 rounded-2xl p-8 flex flex-col items-center w-80 gap-3 shadow-xl border border-gray-700">
          <img 
            src={userData.avatar_url} 
            alt={userData.login}
            className="w-24 h-24 rounded-full border-2 border-blue-500 p-1" 
          />
          <h2 className="text-xl font-bold">{userData.name || userData.login}</h2>

          <p className="text-gray-400 text-sm text-center italic">
            {userData.bio || "No bio available"}
          </p>

          <div className="flex flex-col items-center gap-1 my-2">
            {userData.location && (
              <p className="text-gray-400 text-sm">📍 {userData.location}</p>
            )}

            {userData.created_at && (
              <p className="text-gray-500 text-xs">
                Joined{" "}
                {new Date(userData.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            )}
          </div>

          <div className="flex gap-6 mt-2">
            <div className="text-center">
              <p className="font-bold text-lg">{userData.followers}</p>
              <p className="text-gray-400 text-xs uppercase tracking-wider">Followers</p>
            </div>

            <div className="text-center">
              <p className="font-bold text-lg">{userData.public_repos}</p>
              <p className="text-gray-400 text-xs uppercase tracking-wider">Repos</p>
            </div>
          </div>

          <a 
            href={userData.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg text-sm font-medium transition-colors w-full text-center"
          >
            View Profile
          </a>
        </div>
      )}
    </div>
  )
}

export default App