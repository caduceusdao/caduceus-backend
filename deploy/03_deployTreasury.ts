import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { log } from "../src/utils";
import {
    DAI__factory,
    OlympusERC20Token__factory,
    OlympusTreasury__factory,
} from "../typechain";
import { DAI_DID } from "./00_deployDai";

import { OHM_DID } from "./01_deployOhm";

export const TREASURY_DID = "treasury";

const treasuryDeployment: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    deploy,
    get,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const { contract: dai } = await get<DAI__factory>("DAI");
    const { contract: ohm } = await get<OlympusERC20Token__factory>("OlympusERC20Token");
    log("Deploying treasury...");
    const { contract, deployment } = await deploy<OlympusTreasury__factory>(
        "OlympusTreasury",
        // ohm, dai, _blocksNeededForQueue
        [ohm.address, dai.address, 0]
    );
};
export default treasuryDeployment;
treasuryDeployment.id = TREASURY_DID;
treasuryDeployment.tags = ["local", "test", TREASURY_DID];
treasuryDeployment.dependencies = [OHM_DID, DAI_DID];
