import axios from 'axios';
import { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import TransactionBox from './components/TransactionBox';

axios.defaults.baseURL = "http://localhost:3000";

export default function Dashboard({ publicToken }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    while(true){
        let accessToken = await axios.post("/exchange_public_token", { public_token: publicToken });
        console.log(accessToken.data);
        const trans = await axios.post('/transactions', { access_token: accessToken.data.accessToken });
        const fetchedTransactions = trans.data.added;
        console.log(fetchedTransactions);
        if (fetchedTransactions.length === 50) {
          setTransactions(fetchedTransactions);
          setLoading(false);
          break;
        }
      }
    }


  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-gray-100">
      {loading ? <h1>Loading...</h1> : <TransactionBox transactions={transactions} />}
    </div>
  );
}
