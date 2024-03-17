import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import alchemy from "../alchemyProvider";

function Transactions() {
  const [searchParams] = useSearchParams();
  const blockNumber = searchParams.get("block");

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getTransactions() {
      const block = await alchemy.core.getBlockWithTransactions(
        parseInt(blockNumber)
      );
      console.log(block.transactions[0]);
      setTransactions(block.transactions);
    }

    getTransactions();
  }, [blockNumber]);

  return (
    <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
      <div>
        <h2>Transactions</h2>
        {transactions.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ padding: "16px" }}>Txn hash</th>
                <th style={{ padding: "16px" }}>Block Number</th>
                <th style={{ padding: "16px" }}>From</th>
                <th style={{ padding: "16px" }}>To</th>
                <th style={{ padding: "16px" }}>Value</th>
                <th style={{ padding: "16px" }}>Txn Fee</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr style={{ border: "1px solid black" }} key={index}>
                  <td style={{ padding: "16px" }}>
                  <Link to={`/txn/${transaction.hash}`} >

                    {transaction.hash.slice(0, 12) + "..."}
                  </Link>
                  </td>
                  <td style={{ padding: "16px" }}>{blockNumber}</td>
                  <td style={{ padding: "16px" }}>
                    {transaction.from.slice(0, 12) + "..."}
                  </td>
                  <td style={{ padding: "16px" }}>
                    {transaction.to.slice(0, 12) + "..."}
                  </td>
                  <td style={{ padding: "16px" }}>
                    {parseInt(transaction.value._hex, 16) / Math.pow(10, 18) + " ETH"}
                  </td>
                  <td style={{ padding: "16px" }}>
                    {(parseInt(transaction.gasPrice._hex, 16) *
                      parseInt(transaction.gasLimit._hex, 16)) /
                      Math.pow(10, 18)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {transactions.length === 0 && <h2>Loading...</h2>}
      </div>
    </div>
  );
}

export default Transactions;
