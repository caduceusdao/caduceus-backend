import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { log } from "../src/utils";

export const DAI_DID = "dai_token";

const daiDeployment: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    deployments,
    getNamedAccounts,
    network,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const { deployer } = await getNamedAccounts();
    log("Deploying DAI...");
    const deployment = await deployments.deploy("DAI", {
        from: deployer,
        args: [network.config.chainId || 31337],
    });
};
export default daiDeployment;
daiDeployment.id = DAI_DID;
daiDeployment.tags = ["local", "test", DAI_DID];
