import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { log, OHM_DECIMALS, toWei } from "../src/utils";
import { SOlympus__factory } from "../typechain";
import { initialIndex } from "../constants";


export const SOHM_DID = "sohm_token";

const sohmDeployment: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    deploy,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    log("Deploying sOHM...");
    const { contract, deployment } = await deploy<SOlympus__factory>("sOlympus", []);
    if (deployment?.newlyDeployed) {
        log("Setting sOHM index...");
        await contract.setIndex(toWei(initialIndex, OHM_DECIMALS));
    }
};
export default sohmDeployment;
sohmDeployment.id = SOHM_DID;
sohmDeployment.tags = ["local", "test", SOHM_DID];
