"use client"

import { useQuery } from "@apollo/client";
import { GET_Intents } from "@/contracts/appoloQuery";
import CancelIntentButton from "@/components/canel-intent-button";
import SendTransactionButton from "@/components/send-transaction";
import Loading from "@/components/Loading";

export default function Home() {
  const { loading, data: intents } = useQuery(GET_Intents);
  console.log(intents);
  return (
    <div className="">
      {loading && <Loading />}
      <div className="w-full m-3 my-4">
        <h1 className="text-2xl text-green-500 text-center">Active Intents</h1>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Intent Index</th>
              <th>Creator</th>
              <th>Recipient</th>
              <th>Send</th>
              <th>Cancel</th>
            </tr>
          </thead>

          <tbody>

            {intents?.intentCreateds.map((intent: any) => {
              for (let i = 0; i < intents?.intentCanceleds.length; i++) {
                if (intent.id == intents?.intentCanceleds[i].id) {
                  return;
                }
              }
              return (
                <tr key={intent.id}>
                  <td>{intent.intentIndex}</td>
                  <td>{intent.user}</td>
                  <td>{intent.recipient}</td>
                  <td><SendTransactionButton intentCreator={intent.user} amount={intent.amount} intentIndex={intent.intentIndex} blockTimestamp={intent.blockTimestamp} frequency={intent.frequency} /></td>
                  <td><CancelIntentButton user={intent.user} index={intent.intentIndex} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <hr></hr>
      <div className="w-full m-3 my-10">
        <h1 className="text-2xl text-red-500 text-center">Canceled Intents</h1>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Status</th>
              <th>Intent Index</th>
              <th>Creator</th>
            </tr>
          </thead>

          <tbody>

            {intents?.intentCanceleds.map((intent: any) => {
              return (
                <tr key={intent.id}>
                  <td>Canceled</td>
                  <td>{intent.intentIndex}</td>
                  <td>{intent.user}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
