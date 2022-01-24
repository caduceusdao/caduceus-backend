import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import toggleRights, { MANAGING } from "../src/subdeploy/toggleRights";
import { log } from "../src/utils";
import { constants } from "../constants"
import {
    DAI__factory,
    OlympusBondDepository__factory,
    OlympusTreasury__factory,
    UniswapV2Factory__factory,
    OlympusERC20Token__factory,
} from "../typechain";

import { DAI_DID } from "./00_deployDai";
import { TREASURY_DID } from "./03_deployTreasury";
import { DAI_BOND_DID } from "./11_deployDaiBond";
import { OHM_DID } from "./01_deployOhm";
import { OHM_DAI_BOND_DID } from "./25_deployOhmDaiBond";
import { MINT_OHM_DID } from "./16_mintOHM";
import { MINT_DAI_DID } from "./15_mintDai";
import { ADD_SPOOKY_LP_DID } from "./18_addSpookyLP";

export const ALLOW_OHM_DAI_BOND_TREASURY = "allow_ohm_dai_bond_treasury";

const allowOhmDaiBondsTreasury: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    get,
    getChainId,
    ethers,
    getNamedAccounts,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const chainID = +await getChainId();
    const { deployer } = await getNamedAccounts();
    const { contract: dai } = await get<DAI__factory>("DAI");
    const { contract: ohm } = await get<OlympusERC20Token__factory>("OlympusERC20Token");
    const { contract: treasury } = await get<OlympusTreasury__factory>("OlympusTreasury");
    const { contract: bond } = await get<OlympusBondDepository__factory>(
        "OhmDaiBondDepository"
    );
    const spookyPairFactory = await UniswapV2Factory__factory.connect(
        constants[chainID].SPOOKY_SWAP_FACTORY,
        await ethers.getSigner(deployer)
    );
    const pair = await spookyPairFactory.getPair(ohm.address, dai.address);

    if (!(await treasury.isLiquidityDepositor(bond.address))) {
        log("Setting Ohm-Dai Lp bond as Liquidity Depository for treasury...");
        await toggleRights(treasury, MANAGING.LIQUIDITYDEPOSITOR, bond.address);
    }
    if (!(await treasury.isLiquidityDepositor(pair))) {
        log("Setting Pair Lp bond as Liquidity Depository for treasury...");
        await toggleRights(treasury, MANAGING.LIQUIDITYDEPOSITOR, pair);
    }
};
export default allowOhmDaiBondsTreasury;
allowOhmDaiBondsTreasury.id = ALLOW_OHM_DAI_BOND_TREASURY;
allowOhmDaiBondsTreasury.tags = ["local", "test", ALLOW_OHM_DAI_BOND_TREASURY];
allowOhmDaiBondsTreasury.dependencies = [TREASURY_DID, DAI_BOND_DID, DAI_DID, OHM_DID, OHM_DAI_BOND_DID, MINT_DAI_DID, MINT_OHM_DID, ADD_SPOOKY_LP_DID];
