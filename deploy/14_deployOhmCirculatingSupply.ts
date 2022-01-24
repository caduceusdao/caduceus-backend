import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { log } from "../src/utils";
import {
    OHMCirculatingSupplyContract__factory,
    OlympusERC20Token__factory,
} from "../typechain";

import { OHM_DID } from "./01_deployOhm";

export const OHM_CIRCULATING_SUPPLY_DID = "ohm_circulating_supply";

const ohmCirculatingSupplyDeployment: IExtendedDeployFunction<ICaduceusContractsRegistry> =
    async ({ deploy, getNamedAccounts, get }: IExtendedHRE<ICaduceusContractsRegistry>) => {
        const { deployer } = await getNamedAccounts();
        const { contract: ohm } = await get<OlympusERC20Token__factory>(
            "OlympusERC20Token"
        );
        log("Deploying circulating supply...");
        const { contract, deployment } =
            await deploy<OHMCirculatingSupplyContract__factory>(
                "OHMCirculatingSupplyContract",
                [deployer]
            );
        
        if (deployment?.newlyDeployed) {
            log("Initializing circulating supply...");
            await contract.initialize(ohm.address);
        }
    };
export default ohmCirculatingSupplyDeployment;
ohmCirculatingSupplyDeployment.id = OHM_CIRCULATING_SUPPLY_DID;
ohmCirculatingSupplyDeployment.tags = ["local", "test", OHM_CIRCULATING_SUPPLY_DID];
ohmCirculatingSupplyDeployment.dependencies = [OHM_DID];
