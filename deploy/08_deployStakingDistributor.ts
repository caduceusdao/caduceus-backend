import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import toggleRights, { MANAGING } from "../src/subdeploy/toggleRights";
import { log } from "../src/utils";
import {
    Distributor__factory,
    OlympusERC20Token__factory,
    OlympusStaking__factory,
    OlympusTreasury__factory,
} from "../typechain";

import { OHM_DID } from "./01_deployOhm";
import { TREASURY_DID } from "./03_deployTreasury";
import { STAKING_DID } from "./05_deployStaking";
import { epochLengthInBlocks } from "../constants";

export const STAKING_DISTRIBUTOR_DID = "distributor";

const deployDistributor: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    deploy,
    get,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const { contract: ohm } = await get<OlympusERC20Token__factory>("OlympusERC20Token");
    const { contract: staking } = await get<OlympusStaking__factory>("OlympusStaking");
    const { contract: treasury } = await get<OlympusTreasury__factory>("OlympusTreasury");
    log("Deploying staking...");
    const { contract: distributor, deployment } = await deploy<Distributor__factory>(
        "Distributor",
        [treasury.address, ohm.address, epochLengthInBlocks, epochLengthInBlocks]
    );
    if (deployment?.newlyDeployed) {
        log("Setting distributor for staking...");
        await staking.setContract(0, distributor.address);
    }
    if (!(await treasury.isRewardManager(distributor.address))) {
        log("Setting distributor as Reward Manager for treasury...");
        toggleRights(treasury, MANAGING.REWARDMANAGER, distributor.address);
    }
};
export default deployDistributor;
deployDistributor.id = STAKING_DISTRIBUTOR_DID;
deployDistributor.tags = ["local", "test", STAKING_DISTRIBUTOR_DID, STAKING_DID];
deployDistributor.dependencies = [OHM_DID, TREASURY_DID];
deployDistributor.runAtTheEnd = true;
