import { expect } from "chai";
import hre from "hardhat";
import { GOHM_ORACLE_DID } from "../../deploy/21_deployGOHMSpotPriceOracle";
import { ICaduceusContractsRegistry } from "../../src/contracts/caduceusContracts";
import { IExtendedHRE } from "../../src/HardhatRegistryExtension/ExtendedHRE";
import { toWei, WOHM_DECIMALS } from "../../src/utils";
import {
    GOHMSpotPriceOracle,
    GOHMSpotPriceOracle__factory,
    IUniswapV2Router__factory,
} from "../../typechain";

import { constants } from "../../constants";

const xhre = hre as IExtendedHRE<ICaduceusContractsRegistry>;
const { deployments, get, getNamedAccounts, deploy, getChainId } = xhre;

describe("GOHMSpotPriceOracle", function () {
    let oracle: GOHMSpotPriceOracle;
    let deployer: string;
    
    beforeEach(async function () {
        const namedAccounts = await getNamedAccounts();
        deployer = namedAccounts.deployer;
        const chainID: number = +await getChainId();
        await deployments.fixture([GOHM_ORACLE_DID]);
        const oracleDeployment = await get<GOHMSpotPriceOracle__factory>(
            "GOHMSpotPriceOracle"
        );
        oracle = oracleDeployment.contract;
    });

    it("getAmountsOut spiritswap router", async function () {
        const chainID: number = +await getChainId();
        const router = IUniswapV2Router__factory.connect(
            constants[chainID].SPIRIT_ROUTER,
            await xhre.ethers.getSigner(deployer)
        );
        const amounts = await router.getAmountsOut(toWei(1, WOHM_DECIMALS), [
            constants[chainID].GOHM_ADDRESS,
            constants[chainID].HEC_ADDRESS,
            constants[chainID].USDC_ADDRESS,
        ]);
        expect(amounts.length).to.eq(3);
    });

    it("should return a price", async function () {
        const { answer: price } = await oracle.latestRoundData();
        console.log("gOHM price", price.toNumber());
        expect(price).to.not.be.undefined;
    });
});
