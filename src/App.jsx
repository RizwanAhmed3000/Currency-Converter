import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const controller = new AbortController()
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState()

  const currency = ["USD", "GBP", "EUR"]
  const currency2 = ["USD", "GBP", "EUR"]

  // console.log(from);

  async function apiCall() {
    try {
      if (from && to) {

        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
          { signal: controller.signal });
        const data = await res.json()
        console.log(data);
        setResult(data.rates[to])
      }
    } catch (error) {
      console.error(error);
    }


  }

  useEffect(() => {

    apiCall();
    return function () {
      controller.abort();
    }
  }, [from, to, amount])

  return (
    <div className="App">
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select name="" id="" onChange={(e) => setFrom(e.target.value)}>
        {
          currency.map((c, i) => (
            <option key={i}>{c}</option>
          ))
        }
      </select>
      <select name="" id="" onChange={(e) => setTo(e.target.value)}>
        {
          currency2.map((c, i) => (
            <option key={i}>{c}</option>
          ))
        }
      </select>
      <h2>{result}</h2>
    </div>
  );
}

export default App;
