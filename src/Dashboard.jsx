import axios from 'axios';
import { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import plaidParam from './plaid.json';
import TransactionBox from './components/transactions/TransactionBox';
import CategoryCharts from './components/transactions/CategoryCharts';
import BalanceBox from './components/BalanceBox';
import Investments from './components/Investments';
import Payment from './components/Payment';

axios.defaults.baseURL = "http://localhost:3000";

export default function Dashboard({ publicToken }) {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState([]);
  const [balances, setBalances] = useState([]);
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
        const bal = await axios.post('/balances', { access_token: accessToken.data.accessToken });
        const fetchedTransactions = trans.data.added;
        setBalances(bal.data);
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

  console.log(catTotal)

  return (
    loading ? <h1>Loading...</h1> : 
    <>
      <h1 className='px-10 pt-8 text-3xl font-bold bg-gray-100'>Your FinBoard 💸</h1>
      <div className="flex flex-col w-full h-screen justify-center items-center bg-gray-100 overflow-hidden py-10 pb-20">
        <div className='flex flex-row w-3/4 h-1/2 gap-8'>
          <TransactionBox transactions={transactions} />
          <Investments param={plaidParam}/>
        </div>
        <div className='flex flex-row w-3/4 h-1/2 justify-between items-center gap-8'>
          <CategoryCharts />
          <BalanceBox balances={balances}/>
          <Payment />
        </div>
      </div>
    </>
  );
}
