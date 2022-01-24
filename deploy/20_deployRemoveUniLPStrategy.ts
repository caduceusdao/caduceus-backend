import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import toggleRights, { MANAGING } from "../src/subdeploy/toggleRights";
import { log } from "../src/utils";
import {
    DAI__factory,
    OlympusBondDepository__factory,
    OlympusBondingCalculator__factory,
    OlympusERC20Token__factory,
    OlympusTreasury__factory,
    RemoveUniLp__factory,
} from "../typechain";

import { TREASURY_DID } from "./03_deployTreasury";

export const DEPLOY_REMOVE_UNI_LP_STRATEGY_DID = "remove_uni_lp_strategy";

const deployUniLpStrategy: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    get,
    deploy,
    getNamedAccounts,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const { contract: treasury } = await get<OlympusTreasury__factory>("OlympusTreasury");
    log("Deploying RemoveUniLP...");
    const { contract: removeUniLP } = await deploy<RemoveUniLp__factory>("RemoveUniLp", [
        treasury.address,
    ]);

    if (!(await treasury.isReserveDepositor(removeUniLP.address))) {
        log("Setting removeUniLP as Reserve depository for treasury...");
        await toggleRights(treasury, MANAGING.RESERVEDEPOSITOR, removeUniLP.address);
    }
    if (!(await treasury.isRewardManager(removeUniLP.address))) {
        log("Setting removeUniLP as Reward manager for treasury...");
        await toggleRights(treasury, MANAGING.REWARDMANAGER, removeUniLP.address);
    }
    if (!(await treasury.isLiquidityManager(removeUniLP.address))) {
        log("Setting removeUniLP as liquidity manager for treasury...");
        await toggleRights(treasury, MANAGING.LIQUIDITYMANAGER, removeUniLP.address);
    }
};
export default deployUniLpStrategy;

deployUniLpStrategy.id = DEPLOY_REMOVE_UNI_LP_STRATEGY_DID;
deployUniLpStrategy.tags = ["local", "test", DEPLOY_REMOVE_UNI_LP_STRATEGY_DID];
deployUniLpStrategy.dependencies = [TREASURY_DID];
deployUniLpStrategy.skip = () => new Promise((resolve, reject) => resolve(true));