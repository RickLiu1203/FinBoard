import axios from 'axios';
import { useState, useEffect } from 'react'
import './App.css'
import { usePlaidLink } from 'react-plaid-link';
import Dashboard from './Dashboard'

axios.defaults.baseURL = "http://localhost:3000"

function App() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();

  useEffect(() => {

    async function fetch(){
      const response = await axios.post("/create_link_token")
      setLinkToken(response.data.link_token)
    }
    fetch();

  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setPublicToken(public_token)
      console.log('success', public_token, metadata)
    },
  });

  return publicToken ? (<Dashboard publicToken={publicToken} />):(
    <div className='flex flex-col items-center justify-center h-screen gap-4 border-black'>
      <h1 className='text-6xl font-extrabold'>FinBoard 💸</h1>
      <button className='bg-purple-500 px-4 py-3 text-white rounded-2xl font-semibold shadow-lg hover:bg-white hover:text-purple-400 duration-300'>
        Connect Bank Account
      </button>
      <button onClick={() => open()} disabled={!ready} 
      className='bg-purple-500 px-4 py-3 text-white rounded-2xl font-semibold shadow-lg hover:bg-white hover:text-purple-400 duration-300'>
        Site Demo
      </button>
    </div>
  );

}

export default App
