import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { DAI_DECIMALS, toWei } from "../src/utils";
import { DAI__factory } from "../typechain";
import { log } from "../src/utils";
import { initialMint } from "../constants"
import { DAI_DID } from "./00_deployDai";

export const MINT_DAI_DID = "mint_dai_token";

const mintDai: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    get,
    getNamedAccounts,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const { deployer } = await getNamedAccounts();
    const { contract: dai } = await get<DAI__factory>("DAI");
    log("Minting " + initialMint + " DAI to deployer account...");
    await dai.mint(deployer, initialMint);
};
export default mintDai;
mintDai.id = MINT_DAI_DID;
mintDai.tags = ["local", "test", MINT_DAI_DID];
mintDai.dependencies = [DAI_DID];
