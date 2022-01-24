import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { ifNotProd, log } from "../src/utils";
import {
    OlympusERC20Token__factory,
    OlympusStaking__factory,
    SOlympus__factory,
    StakingHelperV2__factory,
    WOHM__factory,
} from "../typechain";

import { OHM_DID } from "./01_deployOhm";
import { SOHM_DID } from "./02_deploysOhm";
import { STAKING_DID } from "./05_deployStaking";
import { STAKING_HELPER_DID } from "./07_deployStakingHelper";

export const WOHM_DID = "wohm_token";

const deployWOHM: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    deploy,
    get,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const { contract: ohm } = await get<OlympusERC20Token__factory>("OlympusERC20Token");
    const { contract: sohm } = await get<SOlympus__factory>("sOlympus");
    const { contract: staking } = await get<StakingHelperV2__factory>("OlympusStaking");
    log("Deploying wOHM...");
    const { contract: wohm } = await deploy<WOHM__factory>("wOHM", [
        staking.address,
        ohm.address,
        sohm.address,
    ]);
};
export default deployWOHM;
deployWOHM.id = WOHM_DID;
deployWOHM.tags = ["local", "test", WOHM_DID];
deployWOHM.dependencies = ifNotProd([STAKING_DID, SOHM_DID, OHM_DID]);
