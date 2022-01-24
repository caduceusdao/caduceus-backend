import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import toggleRights, { MANAGING } from "../src/subdeploy/toggleRights";
import { log } from "../src/utils";
import {
    DAI__factory,
    OlympusBondDepository__factory,
    OlympusTreasury__factory,
} from "../typechain";

import { DAI_DID } from "./00_deployDai";
import { TREASURY_DID } from "./03_deployTreasury";
import { DAI_BOND_DID } from "./11_deployDaiBond";

export const ALLOW_DAI_BOND_TREASURY = "allow_dai_bond_treasury";

const allowDaiBondsTreasury: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    get,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const { contract: dai } = await get<DAI__factory>("DAI");
    const { contract: treasury } = await get<OlympusTreasury__factory>("OlympusTreasury");
    const { contract: bond } = await get<OlympusBondDepository__factory>(
        "DAIBondDepository"
    );

    if (!(await treasury.isReserveDepositor(bond.address))) {
        log("Setting DAI bond as Reserve Depository for treasury...");

        try 
        {
            await toggleRights(treasury, MANAGING.RESERVEDEPOSITOR, bond.address);
        }
        catch (e) {
            console.log("that failed", e); 
        }    
    }
    if (!(await treasury.isReserveDepositor(dai.address))) {
        log("Setting DAI as Reserve Depository for treasury...");
        try 
        {
            await toggleRights(treasury, MANAGING.RESERVEDEPOSITOR, dai.address);
        }
        catch (e) {
            console.log("this  failed", e); 
        }       
    }
};
export default allowDaiBondsTreasury;
allowDaiBondsTreasury.id = ALLOW_DAI_BOND_TREASURY;
allowDaiBondsTreasury.tags = ["local", "test", ALLOW_DAI_BOND_TREASURY];
allowDaiBondsTreasury.dependencies = [TREASURY_DID, DAI_BOND_DID, DAI_DID];
