import { Transaction } from "@mysten/sui/transactions";
import {
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { PUBLIC_PACKAGE } from "../constants/package";

const TARGET = `${PUBLIC_PACKAGE}::building`;

export const useProposals = () => {
  const suiClient = useSuiClient();  
  const { mutate } = useSignAndExecuteTransaction();
  