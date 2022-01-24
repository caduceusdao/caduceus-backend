import { expect } from "chai";
import hre from "hardhat";
import { constants } from "../../constants";
import { GOHM_ORACLE_DID } from "../../deploy/21_deployGOHMSpotPriceOracle";
import { ICaduceusContractsRegistry } from "../../src/contracts/caduceusContracts";
import { IExtendedHRE } from "../../src/HardhatRegistryExtension/ExtendedHRE";
import { toWei, WOHM_DECIMALS } from "../../src/utils";
import {
    GOHMSpotPriceOracle,
    GOHMSpotPriceOracle__factory,
    IUniswapV2Router__factory,
} from "../../typechain";

const xhre = hre as IExtendedHRE<ICaduceusContractsRegistry>;
const { deployments, get, getNamedAccounts, deploy, getChainId } = xhre;




describe("GOHMSpotPriceOracle", function () {
    let deployer: string;
    beforeEach(async function () {
        const namedAccounts = await getNamedAccounts();
        deployer = namedAccounts.deployer;
    });

    it("should return a price (path length 2)", async function () {
        const chainID: number = +await getChainId();
        const { contract } = await deploy<GOHMSpotPriceOracle__factory>(
            "GOHMSpotPriceOracle",
            [constants[chainID].WFTM_ADDRESS, constants[chainID].USDC_ADDRESS]
        );
        
        await contract.updatePath(constants[chainID].SPOOKY_SWAP_ROUTER, [constants[chainID].WFTM_ADDRESS, constants[chainID].USDC_ADDRESS]);

        const { answer: price } = await contract.latestRoundData();
        console.log("WFTM/USDC ratio", price.toNumber());
        expect(price).to.not.be.undefined;
    });

    it("should return a price (path length 3)", async function () {
        const chainID: number = +await getChainId();
        const { contract } = await deploy<GOHMSpotPriceOracle__factory>(
            "GOHMSpotPriceOracle",
            [constants[chainID].BOO_ADDRESS, constants[chainID].USDC_ADDRESS]
        );
        await contract.updatePath(constants[chainID].SPOOKY_SWAP_ROUTER, [
            constants[chainID].BOO_ADDRESS,
            constants[chainID].WFTM_ADDRESS,
            constants[chainID].USDC_ADDRESS,
        ]);

        const { answer: price } = await contract.latestRoundData();
        console.log("BOO/USDC ratio", price.toNumber());
        expect(price).to.not.be.undefined;
    });
});
