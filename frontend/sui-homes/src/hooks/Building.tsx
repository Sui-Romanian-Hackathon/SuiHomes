import { Transaction } from "@mysten/sui/transactions";
import {
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { PUBLIC_PACKAGE } from "../constants/package";

const TARGET = `${PUBLIC_PACKAGE}::building`;
export const useBuilding = () => {
  const suiClient = useSuiClient();  
  const { mutate } = useSignAndExecuteTransaction();

  const createBuilding = (params: {
    registryId: string;
    boardId: string;
    treasuryId: string;
    apartmentsTableId: string;
    street: string;
  }) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${TARGET}::create_building`,
      arguments: [
        tx.object(params.registryId),
        tx.object(params.boardId),
        tx.object(params.treasuryId),
        tx.object(params.apartmentsTableId),
        tx.pure.string(params.street),
      ],
    });

    return mutate({ transaction: tx });
  };

  const addApartment = (buildingId: string, apartmentId: string) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${TARGET}::add_apartment`,
      arguments: [
        tx.object(buildingId),
        tx.object(apartmentId),
      ],
    });

    return mutate({ transaction: tx });
  };

  const removeApartment = (buildingId: string, apartmentId: string) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${TARGET}::remove_apartment`,
      arguments: [
        tx.object(buildingId),
        tx.pure.id(apartmentId),
      ],
    });

    return mutate({ transaction: tx });
  };


  const getId = async (buildingId: string) => {
    const tx = new Transaction();

    const res = await tx.moveCall({
      target: `${TARGET}::get_id`,
      arguments: [tx.object(buildingId)],
    });

    
    return res.results?.[0]?.returnValues?.[0]?.[0];
  };

  const getRegistry = async (buildingId: string) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${TARGET}::get_registry`,
      arguments: [tx.object(buildingId)],
    });

    return (tx);
  };

  const getBoard = async (buildingId: string) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${TARGET}::get_board`,
      arguments: [tx.object(buildingId)],
    });

    return (tx);
  };

  const getTreasury = async (buildingId: string) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${TARGET}::get_treasury`,
      arguments: [tx.object(buildingId)],
    });

    return (tx);
  };

  const getApartments = async (buildingId: string) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${TARGET}::get_apartments`,
      arguments: [tx.object(buildingId)],
    });

    return (tx);
  };

  const getApartment = async (buildingId: string, apartmentId: string) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${TARGET}::get_appartment`,
      arguments: [
        tx.object(buildingId),
        tx.pure.id(apartmentId),
      ],
    });

    return (tx);
  };

  const isApartmentEligibleToVote = async (apartmentId: string) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${TARGET}::is_apartment_eligible_to_vote`,
      arguments: [tx.object(apartmentId)],
    });

    const res = await (tx);
    // return Boolean(res.result?.[0]?.returnValues?.[0]?.[0]);
  };

  return {
    // write
    createBuilding,
    addApartment,
    removeApartment,

    // read
    getId,
    getRegistry,
    getBoard,
    getTreasury,
    getApartments,
    getApartment,
    isApartmentEligibleToVote,
  };
};
