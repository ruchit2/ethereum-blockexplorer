import { useEffect, useState } from "react";
import alchemy from "../alchemyProvider";
import { Link } from "react-router-dom";
import { timeAgo } from "../utils";

function LatestBlocks() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    async function getLatestBlocks() {
      const latestBlockNumber = await alchemy.core.getBlockNumber();
      const latestBlocks = [];

      for (let i = latestBlockNumber; i > latestBlockNumber - 10; i--) {
        const block = await alchemy.core.getBlock(i);
        latestBlocks.push(block);
      }

      setBlocks(latestBlocks);
    }

    getLatestBlocks();
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", textAlign: "center" }}
    >
      <div>
        <h2>Latest Blocks</h2>
        {blocks.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ padding: "16px" }}>Block Number</th>
                <th style={{ padding: "16px" }}>Miner</th>
                <th style={{ padding: "16px" }}>No. of Transactions</th>
                <th style={{ padding: "16px" }}>Time Elapsed</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((block, index) => (
                <tr style={{ border: "1px solid black" }} key={index}>
                  <td style={{ padding: "16px" }}>
                    <Link to={`/block/${block.number}`}>{block.number}</Link>
                  </td>
                  <td style={{ padding: "16px" }}>{block.miner}</td>
                  <td style={{ padding: "16px" }}>
                    <Link to={`/txns?block=${block.number}`}>
                      {block.transactions.length}
                    </Link>
                  </td>
                  <td style={{ padding: "16px" }}>
                    {timeAgo(block.timestamp * 1000)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {blocks.length === 0 && <h2>Loading...</h2>}
      </div>
    </div>
  );
}

export default LatestBlocks;
