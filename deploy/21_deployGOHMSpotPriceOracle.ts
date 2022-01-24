import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { log } from "../src/utils";
import { GOHMSpotPriceOracle__factory } from "../typechain";
import { constants } from "../constants";
export const GOHM_ORACLE_DID = "gohm_oracle_did";

const deployDaiBond: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    deploy, getChainId
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const chainID: number = +await getChainId();
    log("Deploying gOHM spot price oracle...");
    const { contract: oracle, deployment } = await deploy<GOHMSpotPriceOracle__factory>(
        "GOHMSpotPriceOracle",
        [constants[chainID].GOHM_ADDRESS, constants[chainID].USDC_ADDRESS]
    );

    if (deployment?.newlyDeployed) {
        log("Updating oracle path for gOHM price...");
        await oracle.updatePath(constants[chainID].SPIRIT_ROUTER, [constants[chainID].GOHM_ADDRESS, constants[chainID].HEC_ADDRESS, constants[chainID].USDC_ADDRESS]);
    }
};
export default deployDaiBond;
deployDaiBond.id = GOHM_ORACLE_DID;
deployDaiBond.tags = ["local", "test", GOHM_ORACLE_DID];
deployDaiBond.skip = () => new Promise((resolve, reject) => resolve(true));