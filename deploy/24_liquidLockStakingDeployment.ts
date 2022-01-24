import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { log } from "../src/utils";
import {
    LiquidLockStaking,
    LiquidLockStaking__factory,
    LLSRewardHandler__factory,
    WOHM__factory,
} from "../typechain";
import { WOHM_DID } from "./17_deployWOHM";
import { constants } from "../constants";

export const LIQUID_LOCK_STAKING_DID = "liquid_lock_staking";

const liquidLockStakingDeployment: IExtendedDeployFunction<ICaduceusContractsRegistry> =
    async ({ get, deploy, getChainId }: IExtendedHRE<ICaduceusContractsRegistry>) => {
        const { contract: wohm } = await get<WOHM__factory>("wOHM");
        const chainID = +await getChainId();
        log("Deplying LLS Reward handler...");
        const { contract: rewardHandler } = await deploy<LLSRewardHandler__factory>(
            "LLSRewardHandler",
            [wohm.address]
        );
        log("Deplying Liquid lock staking...");
        const { contract: staking, deployment } =
            await deploy<LiquidLockStaking__factory>("LiquidLockStaking", [
                wohm.address,
                rewardHandler.address,
                constants[chainID].REVEST_ADDRESS_REGISTRY,
            ]);
        if (deployment?.newlyDeployed) {
            log("Setting stake contract for reward handler...");
            await rewardHandler.setStakingContract(staking.address);
        }
    };

export default liquidLockStakingDeployment;
liquidLockStakingDeployment.id = LIQUID_LOCK_STAKING_DID;
liquidLockStakingDeployment.tags = ["local", "test", LIQUID_LOCK_STAKING_DID];
liquidLockStakingDeployment.dependencies = [WOHM_DID];
liquidLockStakingDeployment.skip = () => new Promise((resolve, reject) => resolve(true));