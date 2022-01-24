import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { log } from "../src/utils";
import {
    OlympusERC20Token__factory,
    OlympusStaking__factory,
    SOlympus__factory,
} from "../typechain";

import { OHM_DID } from "./01_deployOhm";
import { SOHM_DID } from "./02_deploysOhm";
import { epochLengthInBlocks, firstEpochNumber, firstEpochBlock } from "../constants";

export const STAKING_DID = "staking";

const deployStaking: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    deploy,
    get,
    ethers,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const { contract: ohm } = await get<OlympusERC20Token__factory>("OlympusERC20Token");
    const { contract: sohm } = await get<SOlympus__factory>("sOlympus");
    log("Deploying staking...");
    const { contract: staking, deployment } = await deploy<OlympusStaking__factory>(
        "OlympusStaking",
        [ohm.address, sohm.address, epochLengthInBlocks, firstEpochNumber, firstEpochBlock]
    );
    if (deployment?.newlyDeployed) {
        log("Initializing sOHM...");
        await sohm.initialize(staking.address);
    }
};
export default deployStaking;
deployStaking.id = STAKING_DID;
deployStaking.tags = ["local", "test", STAKING_DID];
deployStaking.dependencies = [SOHM_DID, OHM_DID];
