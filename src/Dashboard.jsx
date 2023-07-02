import axios from 'axios';
import { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import TransactionBox from './components/TransactionBox';

axios.defaults.baseURL = "http://localhost:3000";

export default function Dashboard({ publicToken }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  let monthTotal = {};
  let catTotal = {};

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
        if (fetchedTransactions.length === 150) {
          setTransactions(fetchedTransactions);   
          setLoading(false);
          break;
        }
      }
  }

  transactions.forEach((item) => {
    if (item.category[0] in catTotal) {
      catTotal[item.category[0]] += -Math.abs(item.amount);
    } else {
      catTotal[item.category[0]] = -Math.abs(item.amount);
    }
  });


  return (
    loading ? <h1>Loading...</h1> : 
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-gray-100 overscroll-none">
      <TransactionBox transactions={transactions} />
    </div>
  );
}
