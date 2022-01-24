import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { log } from "../src/utils";
import {
    OlympusERC20Token__factory,
    OlympusStaking__factory,
    StakingHelperV2__factory,
} from "../typechain";

import { OHM_DID } from "./01_deployOhm";
import { STAKING_DID } from "./05_deployStaking";

export const STAKING_HELPER_DID = "staking_helper";

const deployStakingHelper: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    deploy,
    get,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const { contract: ohm } = await get<OlympusERC20Token__factory>("OlympusERC20Token");
    const { contract: staking } = await get<OlympusStaking__factory>("OlympusStaking");
    log("Deploying staking helper V2...");
    const { contract } = await deploy<StakingHelperV2__factory>("StakingHelperV2", [
        staking.address,
        ohm.address,
    ]);
};
export default deployStakingHelper;
deployStakingHelper.id = STAKING_HELPER_DID;
deployStakingHelper.tags = ["local", "test", STAKING_HELPER_DID, STAKING_DID];
deployStakingHelper.dependencies = [OHM_DID];
// deployStakingHelper.runAtTheEnd = true;
