import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { zeroAddress } from "../src/subdeploy/deployBasics";
import { log } from "../src/utils";
import {
    DAI__factory,
    OlympusBondDepository__factory,
    OlympusERC20Token__factory,
    OlympusStaking__factory,
    OlympusTreasury__factory,
    RedeemHelper__factory,
    StakingHelperV2__factory,
    UniswapV2Factory__factory,
} from "../typechain";
import { DAI_DID } from "./00_deployDai";
import { MINT_DAI_DID } from "./15_mintDai";
import { MINT_OHM_DID } from "./16_mintOHM";
import { OHM_DID } from "./01_deployOhm";
import { TREASURY_DID } from "./03_deployTreasury";
import { BONDING_CALCULATOR_DID } from "./09_deployOlympusBondingCalculator";
import { REDEEM_HELPER_DID } from "./10_deployRedeemHelper";
import { constants, ohmDaiBondBCV, lpBondVestingLength, minLpBondPrice, maxLpBondPayout, lpBondFee, maxLpBondDebt, intialLpBondDebt } from "../constants"

export const OHM_DAI_BOND_DID = "ohm_dai_bond";

const deployOhmDaiBond: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    deploy,
    get,
    getChainId,
    getNamedAccounts,
    ethers,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const { contract: ohm } = await get<OlympusERC20Token__factory>("OlympusERC20Token");
    const { contract: dai } = await get<DAI__factory>("DAI");
    const chainID = +await getChainId();
    const { deployer } = await getNamedAccounts();
    const spookyPairFactory = await UniswapV2Factory__factory.connect(
        constants[chainID].SPOOKY_SWAP_FACTORY,
        await ethers.getSigner(deployer)
    );
    const pair = await spookyPairFactory.getPair(ohm.address, dai.address);
    const { contract: treasury } = await get<OlympusTreasury__factory>("OlympusTreasury");
    const { DAO } = await getNamedAccounts();
    log("Deploying bond depository...");
    const { contract: bond, deployment } = await deploy<OlympusBondDepository__factory>(
        "OhmDaiBondDepository",
        [ohm.address, pair, treasury.address, DAO, zeroAddress]
    );
    log("Initializing Ohm-Dai LP bond terms...");
    await bond.initializeBondTerms(ohmDaiBondBCV, lpBondVestingLength, minLpBondPrice, maxLpBondPayout, lpBondFee, maxLpBondDebt, intialLpBondDebt);
    if (deployment?.newlyDeployed) {
        const { contract: redeemHelper } = await get<RedeemHelper__factory>(
            "RedeemHelper"
        );
        await redeemHelper.addBondContract(bond.address);
    }
};
export default deployOhmDaiBond;
deployOhmDaiBond.id = OHM_DAI_BOND_DID;
deployOhmDaiBond.tags = ["local", "test", OHM_DAI_BOND_DID];
deployOhmDaiBond.dependencies = [DAI_DID, TREASURY_DID, OHM_DID, REDEEM_HELPER_DID, MINT_DAI_DID, MINT_OHM_DID];
