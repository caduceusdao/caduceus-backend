import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import toggleRights, { MANAGING } from "../src/subdeploy/toggleRights";
import { DAI_DECIMALS, toWei } from "../src/utils";
import { DAI__factory, OlympusTreasury__factory } from "../typechain";
import { log } from "../src/utils";
import { TREASURY_DID } from "./03_deployTreasury";
import { OHM_SET_VAULT_DID } from "./04_setVault";
import { MINT_DAI_DID } from "./15_mintDai";
import { initialMintOhm } from "../constants"

export const MINT_OHM_DID = "mint_ohm_token";

const mintDai: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    get,
    getNamedAccounts,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const { deployer } = await getNamedAccounts();
    const { contract: dai } = await get<DAI__factory>("DAI");
    const { contract: treasury } = await get<OlympusTreasury__factory>("OlympusTreasury");
    if (!(await treasury.isReserveDepositor(deployer))) {
        log("Setting deployer as Reserve Depository for treasury...");
        await toggleRights(treasury, MANAGING.RESERVEDEPOSITOR, deployer);
    }
    log("Depositing " + initialMintOhm + " DAI to treasury to mint OHM to deployer's account...");
    await dai.approve(treasury.address, initialMintOhm);
    await treasury.deposit(initialMintOhm, dai.address, 0);
};
export default mintDai;

mintDai.id = MINT_OHM_DID;
mintDai.tags = ["local", "test", MINT_OHM_DID];
mintDai.dependencies = [MINT_DAI_DID, TREASURY_DID, OHM_SET_VAULT_DID];
