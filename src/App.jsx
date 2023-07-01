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
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );

}

export default App
