import { gql } from "@apollo/client"

export const GET_Intents = gql`
{
    intentCreateds(first: 5) {
        id
        user
        intentIndex
        recipient
        frequency
        blockTimestamp
        amount

        }
    intentCanceleds(first: 5) {
        id
        user
        intentIndex
        blockNumber
    }
}`
