import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { log } from "../src/utils";
import { OlympusERC20Token__factory } from "../typechain";

export const OHM_DID = "ohm_token";

const ohmDeployment: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    deploy,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    log("Deploying OHM...");
    const { contract } = await deploy<OlympusERC20Token__factory>(
        "OlympusERC20Token",
        []
    );
};
export default ohmDeployment;
ohmDeployment.id = OHM_DID;
ohmDeployment.tags = ["local", "test", OHM_DID];
