import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import mint from "../src/subdeploy/mint";
import { DAI_DECIMALS, OHM_DECIMALS, toWei, toBN } from "../src/utils";
import {
    DAI__factory,
    OlympusERC20Token__factory,
    OlympusTreasury__factory,
    UniswapV2Router02__factory,
} from "../typechain";
import { log } from "../src/utils";
import { TREASURY_DID } from "./03_deployTreasury";
import { OHM_SET_VAULT_DID } from "./04_setVault";
import { DAI_DID } from "./00_deployDai";
import { OHM_DID } from "./01_deployOhm";
import { MINT_DAI_DID } from "./15_mintDai";
import { MINT_OHM_DID } from "./16_mintOHM";
import { constants, amountOhmDesired, amountDaiDesired, amountOhmMin, amountDaiMin, expiration } from "../constants";

export const ADD_SPOOKY_LP_DID = "add_spooky_lp_did";

const addSpookyLP: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    get,
    getNamedAccounts,
    ethers,
    getChainId,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const { deployer } = await getNamedAccounts();
    const { contract: ohm } = await get<OlympusERC20Token__factory>("OlympusERC20Token");
    const { contract: dai } = await get<DAI__factory>("DAI");
    const { contract: treasury } = await get<OlympusTreasury__factory>("OlympusTreasury");
    const chainID: number = +await getChainId();
    const spookyRouter = await UniswapV2Router02__factory.connect(
        constants[chainID].SPOOKY_SWAP_ROUTER,
        await ethers.getSigner(deployer)
    );
    console.log("Minting " + amountOhmDesired + " OHM for LP deposit");
    // mint OHM: mint DAI and add that DAI to treasury to get OHM from treasury into deployer account
    await mint(deployer, treasury, dai, toWei(amountOhmDesired,OHM_DECIMALS)); 
    console.log("Minting " + amountDaiDesired + " DAI for LP deposit");
    // mint DAI
    await dai.mint(deployer, toWei(amountDaiDesired,DAI_DECIMALS));
    console.log("Setting approval for DEX router");
    await ohm.approve(constants[chainID].SPOOKY_SWAP_ROUTER, toWei(amountOhmDesired,OHM_DECIMALS));
    await dai.approve(constants[chainID].SPOOKY_SWAP_ROUTER, toWei(amountDaiDesired,DAI_DECIMALS));
    log("Adding OHM and DAI liquidity to spooky swap...");
    await spookyRouter.addLiquidity(
        ohm.address,
        dai.address,
        toWei(amountOhmDesired,OHM_DECIMALS),
        toWei(amountDaiDesired,DAI_DECIMALS),
        toWei(amountOhmMin,OHM_DECIMALS),
        toWei(amountDaiMin,DAI_DECIMALS),
        deployer,
        expiration
    );

};
export default addSpookyLP;

addSpookyLP.id = ADD_SPOOKY_LP_DID;
addSpookyLP.tags = ["local", "test", ADD_SPOOKY_LP_DID];
addSpookyLP.dependencies = [MINT_DAI_DID, MINT_OHM_DID, TREASURY_DID, OHM_SET_VAULT_DID, DAI_DID, OHM_DID];
// addSpookyLP.skip = () => new Promise((resolve, reject) => resolve(true));