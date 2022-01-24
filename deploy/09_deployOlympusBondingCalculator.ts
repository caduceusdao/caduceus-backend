import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { log } from "../src/utils";
import {
    OlympusBondingCalculator__factory,
    OlympusERC20Token__factory,
} from "../typechain";

import { OHM_DID } from "./01_deployOhm";

export const BONDING_CALCULATOR_DID = "bonding_calculator";

const deployStakingHelper: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    deploy,
    get,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const { contract: ohm } = await get<OlympusERC20Token__factory>("OlympusERC20Token");
    log("Deploying bonding calculator...");
    const { contract } = await deploy<OlympusBondingCalculator__factory>(
        "OlympusBondingCalculator",
        [ohm.address]
    );
};
export default deployStakingHelper;
deployStakingHelper.id = BONDING_CALCULATOR_DID;
deployStakingHelper.tags = ["local", "test", BONDING_CALCULATOR_DID];
deployStakingHelper.dependencies = [OHM_DID];
