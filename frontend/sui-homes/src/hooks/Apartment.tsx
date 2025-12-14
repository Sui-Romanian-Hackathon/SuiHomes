import { Transaction } from "@mysten/sui/transactions";
import {
  useSignAndExecuteTransaction,
  useSuiClient,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import { PUBLIC_PACKAGE } from "../constants/package";

const TARGET = `${PUBLIC_PACKAGE}::apartment`;

export const useApartment = () => {
  const suiClient = useSuiClient();
  const { mutateAsync } = useSignAndExecuteTransaction();

  /* ───────────── WRITE ───────────── */

  const createApartment = async (owner: string) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${TARGET}::create_apartment`,
      arguments: [tx.pure.address(owner)],
    });

    return mutateAsync({ transaction: tx });
  };

  const deleteApartment = async (apartmentId: string) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${TARGET}::delete_apartment`,
      arguments: [tx.object(apartmentId)],
    });

    return mutateAsync({ transaction: tx });
  };

  

  const emitOwner = async (apartmentId: string) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${TARGET}::emit_owner`,
      arguments: [tx.object(apartmentId)],
    });

    const res = await mutateAsync({ transaction: tx });
    return extractEvent(res.digest, "ApartmentOwnerEvent");
  };

  const emitNumber = async (apartmentId: string) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${TARGET}::emit_number`,
      arguments: [tx.object(apartmentId)],
    });

    const res = await mutateAsync({ transaction: tx });
    return extractEvent(res.digest, "ApartmentNumberEvent");
  };

  const emitFeesPaid = async (apartmentId: string) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${TARGET}::emit_fees_paid`,
      arguments: [tx.object(apartmentId)],
    });

    const res = await mutateAsync({ transaction: tx });
    return extractEvent(res.digest, "ApartmentFeesPaidEvent");
  };

  const extractEvent = async (digest: string, eventName: string) => {
    const { events } = await suiClient.getTransactionBlock({
      digest,
      options: { showEvents: true },
    });

    const event = events?.find((e) =>
      e.type.endsWith(eventName),
    );

    return event?.parsedJson;
  };

  return {
    // write
    createApartment,
    deleteApartment,

    // reads
    emitOwner,
    emitNumber,
    emitFeesPaid,
  };
};
