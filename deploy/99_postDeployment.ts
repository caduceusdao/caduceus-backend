import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { log } from "../src/utils";
import {
    DAI__factory,
    OlympusERC20Token__factory,
    OlympusTreasury__factory,
    OlympusStaking__factory,
    StakingWarmup__factory,
    StakingHelperV2__factory,
    Distributor__factory,
    OlympusBondingCalculator__factory,
    OlympusBondDepository__factory,
    OHMCirculatingSupplyContract__factory,
    WOHM__factory,
    UniswapV2Router02__factory,
    GOHMSpotPriceOracle__factory,
    GOHMBondDepository__factory,
    SOlympus__factory,
    LiquidLockStaking__factory,
    LLSRewardHandler__factory,
    UniswapV2Factory__factory
} from "../typechain";
import { constants } from "../constants";
import { DAI_DID } from "./00_deployDai";
import { OHM_DID } from "./01_deployOhm";
import { SOHM_DID } from "./02_deploysOhm";
import { TREASURY_DID } from "./03_deployTreasury";
import { OHM_SET_VAULT_DID } from "./04_setVault";
import { STAKING_DID } from "./05_deployStaking";
import { WARMUP_STAKING_DID } from "./06_deployStakingWarmup";
import { STAKING_HELPER_DID } from "./07_deployStakingHelper";
import { STAKING_DISTRIBUTOR_DID } from "./08_deployStakingDistributor";
import { BONDING_CALCULATOR_DID } from "./09_deployOlympusBondingCalculator";
import { REDEEM_HELPER_DID } from "./10_deployRedeemHelper";
import { DAI_BOND_DID } from "./11_deployDaiBond";
import { DAI_BOND_SET_STAKING_DID } from "./12_daiBondSetStaking";
import { ALLOW_DAI_BOND_TREASURY } from "./13_allowDaiBondsTreasuryAccess";
import { OHM_CIRCULATING_SUPPLY_DID } from "./14_deployOhmCirculatingSupply";
import { MINT_DAI_DID } from "./15_mintDai";
import { MINT_OHM_DID } from "./16_mintOHM";
import { WOHM_DID } from "./17_deployWOHM";
import { ADD_SPOOKY_LP_DID } from "./18_addSpookyLP";
import { DEPOSIT_SPOOKY_LP } from "./19_depositSpookyLP";
import { DEPLOY_REMOVE_UNI_LP_STRATEGY_DID } from "./20_deployRemoveUniLPStrategy";
import { GOHM_ORACLE_DID } from "./21_deployGOHMSpotPriceOracle";
import { GOHM_BOND_DID } from "./22_deployGOHMBonds";
import { GOHM_BOND_SET_STAKING_DID } from "./23_GOHMBondSetStaking";
import { LIQUID_LOCK_STAKING_DID } from "./24_liquidLockStakingDeployment";

export const POST_DEPLOYMENT_DID = "post_deployment";

const postDeployment: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    deploy,
    get,
    getChainId,
    ethers,
    getNamedAccounts
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const chainID = +await getChainId();
    const { deployer } = await getNamedAccounts();

    const { contract: dai } = await get<DAI__factory>("DAI");
    const { contract: ohm } = await get<OlympusERC20Token__factory>("OlympusERC20Token");
    const { contract: sOhm } = await get<SOlympus__factory>("sOlympus");
    const { contract: treasury } = await get<OlympusTreasury__factory>("OlympusTreasury");
    const { contract: staking } = await get<OlympusStaking__factory>("OlympusStaking");
    const { contract: warmup } = await get<StakingWarmup__factory>("StakingWarmup");
    const { contract: stakingHelper } = await get<StakingHelperV2__factory>("StakingHelperV2");
    const { contract: distributor } = await get<Distributor__factory>("Distributor");
    const { contract: calc } = await get<OlympusBondingCalculator__factory>("OlympusBondingCalculator");
    const { contract: daiBond } = await get<OlympusBondDepository__factory>("DAIBondDepository");
    const { contract: ohmDaiBond } = await get<OlympusBondDepository__factory>("OhmDaiBondDepository");
    const { contract: circulatingSupply } = await get<OHMCirculatingSupplyContract__factory>("OHMCirculatingSupplyContract");
    const { contract: gOhmOracle } = await get<GOHMSpotPriceOracle__factory>("GOHMSpotPriceOracle");
    const { contract: gOhm } = await get<GOHMBondDepository__factory>("GOHMBondDepository");
    const { contract: wOhm } = await get<WOHM__factory>("wOHM");
    const { contract: lls } = await get<LiquidLockStaking__factory>("LiquidLockStaking");
    const { contract: rewardHelper } = await get<LLSRewardHandler__factory>("LLSRewardHandler");
    const { contract: redeemHelper } = await get<OlympusERC20Token__factory>("RedeemHelper");
    const spookyRouter = await UniswapV2Router02__factory.connect(
        constants[chainID].SPOOKY_SWAP_ROUTER,
        await ethers.getSigner(deployer)
    );
    const spookyPairFactory = await UniswapV2Factory__factory.connect(
        constants[chainID].SPOOKY_SWAP_FACTORY,
        await ethers.getSigner(deployer)
    );
    const pair = await spookyPairFactory.getPair(ohm.address, dai.address);
    
    console.log("\nDeployer: " + deployer);
    console.log("\n*** Frontend ***");
    console.log("\nDAI_ADDRESS: \"" + dai.address + "\",");
    console.log("OHM_ADDRESS: \"" + ohm.address + "\",");
    console.log("TREASURY_ADDRESS: \"" + treasury.address + "\",");
    console.log("STAKING_ADDRESS: \"" + staking.address + "\",");
    console.log("STAKING_HELPER_ADDRESS: \"" + stakingHelper.address + "\",");
    console.log("DISTRIBUTOR_ADDRESS: \"" + distributor.address + "\",");
    console.log("BONDINGCALC_ADDRESS: \"" + calc.address + "\",");
    console.log("CIRCULATING_SUPPLY_ADDRESS: \"" + circulatingSupply.address + "\",");
    console.log("WSOHM_ADDRESS: \"" + wOhm.address + "\",");
    console.log("SOHM_ADDRESS: \"" + sOhm.address + "\",");
    console.log("REDEEM_HELPER_ADDRESS: \"" + redeemHelper.address + "\",");
    console.log("DAI_BOND_ADDRESS: \"" + daiBond.address + "\",");
    console.log("DAI_LP_RESERVE_ADDRESS: \"" + pair + "\",");
    console.log("DAI_LP_BOND_ADDRESS: \"" + ohmDaiBond.address + "\",");
    console.log("\n*** Misc ***");
    console.log("\nWarmup: \"" + warmup.address + "\",");
    console.log("SpookyRouter(chainID=" + chainID + "): \"" + spookyRouter.address + "\",");
    console.log("SpookyFactory(chainID=" + chainID + "): \"" + spookyRouter.address + "\",");    
    console.log("Oracle: \"" + gOhmOracle.address + "\",");
    console.log("LiquidLockStaking: \"" + lls.address + "\",");
    console.log("gOhm: \"" + gOhm.address + "\",");
    console.log("rewardHelper: \"" + rewardHelper.address + "\",");
    // For subgraphs
    console.log("\n*** Subgraph ***");
    console.log("\nexport const SLP_CDSDAI_PAIR= '" + pair + "';");
    console.log("export const TREASURY_ADDRESS_V2 = '" + treasury.address + "';");
    console.log("export const OHMDAISLPBOND_CONTRACT4 = '" + ohmDaiBond.address + "';");
    // console.log("OHMDAISLPBOND_CONTRACT4_BLOCK = '" + .address + "';");
    console.log("export const DAIBOND_CONTRACTS3 = '" + daiBond.address + "';");
    // console.log("DAIBOND_CONTRACTS3_BLOCK = '" + .address + "';");
    console.log("export const OHM_ERC20_CONTRACT = '" + ohm.address + "';");
    console.log("export const SOHM_ERC20_CONTRACTV2 = '" + sOhm.address + "';");
    console.log("export const ERC20DAI_CONTRACT = '" + dai.address + "';");
    console.log("export const CIRCULATING_SUPPLY_CONTRACT = '" + circulatingSupply.address + "';");
    // console.log("CIRCULATING_SUPPLY_CONTRACT_BLOCK = '" + .address + "';");
    console.log("export const STAKING_CONTRACT_V2 = '" + staking.address + "';");
    console.log("export const BONDING_CALCULATOR = '" + calc.address + "';");
    // console.log("BONDING_CALCULATOR_BLOCK = '" + .address + "';");


};

export default postDeployment;
postDeployment.id = POST_DEPLOYMENT_DID;
postDeployment.tags = ["local", "test", POST_DEPLOYMENT_DID];
postDeployment.dependencies = [OHM_DID, DAI_DID, TREASURY_DID, OHM_SET_VAULT_DID, SOHM_DID, STAKING_DID, WARMUP_STAKING_DID, STAKING_HELPER_DID, STAKING_HELPER_DID, STAKING_DISTRIBUTOR_DID, BONDING_CALCULATOR_DID, REDEEM_HELPER_DID, DAI_BOND_DID, DAI_BOND_SET_STAKING_DID, ALLOW_DAI_BOND_TREASURY, OHM_CIRCULATING_SUPPLY_DID, MINT_OHM_DID, MINT_DAI_DID, WOHM_DID, ADD_SPOOKY_LP_DID, DEPLOY_REMOVE_UNI_LP_STRATEGY_DID, DEPOSIT_SPOOKY_LP, GOHM_BOND_SET_STAKING_DID, GOHM_ORACLE_DID, GOHM_BOND_DID, LIQUID_LOCK_STAKING_DID];
postDeployment.runAtTheEnd = true;




export const SLP_CDSDAI_PAIR = '0x89a58C84542BEab180Df293F10D74dEdA38b83E8';
// export const SLP_WFTMUSDC_PAIR= '0x2b4c76d0dc16be1c31d4c1dc53bf9b45987fc75c';
export const TREASURY_ADDRESS_V2 = '0xe7da76b15796C803a17C7B1E90e9F2C44e8573f9';

export const OHMDAISLPBOND_CONTRACT4 = '0xb26f8A969E8719572B516e3A5d44c4d68A007FCA';
export const OHMDAISLPBOND_CONTRACT4_BLOCK = "6624644";
export const DAIBOND_CONTRACTS3 = '0xcE7ae0481Ab61F95ebfaD782DC07F1d180cD6928';
export const DAIBOND_CONTRACTS3_BLOCK = "6624521";
// export const ETHBOND_CONTRACT1 = '0xd7cbA20A464C10FB03Bbc265D962ADa8e29af118';
// export const ETHBOND_CONTRACT1_BLOCK = "21161524";

export const OHM_ERC20_CONTRACT = '0x5f1485C80F60191129a24B1A09fa0371BeE5B3e1';
export const SOHM_ERC20_CONTRACTV2 = '0x8A98E774cE6Ce46Ba405d6b3E26E45025B73a8b3';
export const ERC20DAI_CONTRACT = '0x43d7DaBBbc3e4381fB046DC5c10caB5E5494f579'
// export const WETH_ERC20_CONTRACT = '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83';
// export const GOHM_ERC20_CONTRACT = '0x91fa20244fb509e8289ca630e5db3e9166233fdc';

export const CIRCULATING_SUPPLY_CONTRACT = '0x776a5ff3f112ED0Ce8b299F17b955b223c98BE23';
export const CIRCULATING_SUPPLY_CONTRACT_BLOCK = '6624566';

export const STAKING_CONTRACT_V2 = '0x64761C14572BD830c1588B19bE2ffD5901370820';

export const BONDING_CALCULATOR = '0xc181822626bbc87D4c9D772C08828b7c5B5cF332';
export const BONDING_CALCULATOR_BLOCK = '6624566';