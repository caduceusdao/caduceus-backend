import { ContractFactory } from "./ContractFactory";
import { contracts, ICaduceusContractsRegistry } from "./caduceusContracts";
import { providers } from "./providers";

export const contractFactory = new ContractFactory<ICaduceusContractsRegistry>(
    providers,
    contracts
);
