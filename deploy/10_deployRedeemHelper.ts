import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { log } from "../src/utils";
import { OlympusERC20Token__factory } from "../typechain";

export const REDEEM_HELPER_DID = "redeem_helper";

const deployRedeemHelper: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    deploy,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    log("Deploying redeem helper...");
    const { contract } = await deploy<OlympusERC20Token__factory>("RedeemHelper", []);
};
export default deployRedeemHelper;
deployRedeemHelper.id = REDEEM_HELPER_DID;
deployRedeemHelper.tags = ["local", "test"];
