import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import alchemy from "../alchemyProvider";
import { timeAgo } from "../utils";

function Block() {
  const { blockNumber } = useParams();
  const [block, setBlock] = useState({});

  useEffect(() => {
    async function getBlock() {
      const blockObj = await alchemy.core.getBlock(parseInt(blockNumber));
      console.log(blockObj._difficulty);
      setBlock(blockObj);
    }
    getBlock();
  }, [blockNumber]);

  return <>{block.number && <BlockDetails block={block} />}</>;
}

function BlockDetails({ block }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Block Details</h2>
      <div>
        <strong>Block Number:</strong> {block.number}
      </div>
      <div>
        <strong>Timestamp:</strong>{" "}
        {timeAgo(block.timestamp * 1000) +
          ", " +
          new Date(block.timestamp * 1000).toUTCString()}
      </div>
      <div>
        <strong>Gas Used:</strong> {block.gasUsed.toString()}
      </div>
      <div>
        <strong>Gas Limit:</strong> {block.gasLimit.toString()}
      </div>
      <div>
        <strong>Miner:</strong> {block.miner}
      </div>
      <div>
        <strong>Transactions:</strong> {block.transactions.length}
      </div>
      <div>
        <strong>Base Fee Per Gas:</strong> {block.baseFeePerGas.toString()}
      </div>
    </div>
  );
}

export default Block;
