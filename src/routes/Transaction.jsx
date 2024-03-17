import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import alchemy from "../alchemyProvider";
import { timeAgo } from "../utils";

function Transaction() {
  const { txnHash } = useParams();
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    async function getTransaction() {
      const txn = await alchemy.core.getTransaction(txnHash);
      console.log(txn);
      setTransaction(txn);
    }
    getTransaction();
  }, [txnHash]);
  return (
    <>
      {transaction.hash && (
        <TransactionDetail transaction={transaction} />
      )}
    </>
  );
}

function TransactionDetail({ transaction }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Transaction Details</h2>
      <div>
        <strong>Transaction Hash: </strong> {transaction.hash}
      </div>
      <div>
        <strong>Block: </strong> {transaction.blockNumber}
      </div>
      <div>
        <strong>From:</strong> {transaction.from}
      </div>
      <div>
        <strong>To:</strong> {transaction.to}
      </div>
      <div>
        <strong>Value:</strong>{" "}
        {parseInt(transaction.value._hex, 16) / Math.pow(10, 18) + " ETH"}
      </div>
      <div>
        <strong>Transaction Fee:</strong>{" "}
        {(parseInt(transaction.gasPrice._hex, 16) *
          parseInt(transaction.gasLimit._hex, 16)) /
          Math.pow(10, 18)}
      </div>
      <div>
        <strong>Gas Price:</strong>{" "}
        {parseInt(transaction.gasPrice._hex, 16) / Math.pow(10, 9) + " Gwei"}
      </div>
    </div>
  );
}

export default Transaction;
