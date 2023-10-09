import axios from 'axios';
import { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import TransactionBox from './components/transactions/TransactionBox';
import CategoryCharts from './components/transactions/CategoryCharts';
import BalanceBox from './components/BalanceBox'
import Securities from './components/investments/Securities'
import Holdings from './components/investments/Holdings'

axios.defaults.baseURL = "http://localhost:3000";

export default function Dashboard({ publicToken }) {
  const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [securities, setSecurities] = useState([]);
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
        const hol = await axios.post('/holdings', { access_token: accessToken.data.accessToken });
        const sec = await axios.post('/securities', { access_token: accessToken.data.accessToken });
        const fetchedTransactions = trans.data.added;
        setBalances(bal.data);
        setHoldings(hol.data);
        setSecurities(sec.data);
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
    <div className="flex flex-col w-screen justify-center items-center bg-gray-100 overflow-hidden gap-12 py-20">
      <TransactionBox transactions={transactions} />
      <CategoryCharts />
      <BalanceBox balances={balances}/>
      <Holdings holdings={holdings}/>
      <Securities securities={securities}/>
    </div>
  );
}
