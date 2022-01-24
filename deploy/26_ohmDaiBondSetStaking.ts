import { ICaduceusContractsRegistry } from "../src/contracts/caduceusContracts";
import { IExtendedDeployFunction } from "../src/HardhatRegistryExtension/ExtendedDeployFunction";
import { IExtendedHRE } from "../src/HardhatRegistryExtension/ExtendedHRE";
import { log } from "../src/utils";
import { OlympusBondDepository__factory, StakingHelperV2__factory } from "../typechain";

import { STAKING_HELPER_DID } from "./07_deployStakingHelper";
import { OHM_DAI_BOND_DID } from "./25_deployOhmDaiBond";

export const OHM_DAI_BOND_SET_STAKING_DID = "ohm_dai_bond_set_staking";

const setStakingOhmDaiBond: IExtendedDeployFunction<ICaduceusContractsRegistry> = async ({
    get,
}: IExtendedHRE<ICaduceusContractsRegistry>) => {
    const { contract: stakingHelper } = await get<StakingHelperV2__factory>(
        "StakingHelperV2"
    );
    const { contract: bond } = await get<OlympusBondDepository__factory>(
        "OhmDaiBondDepository"
    );
    const bondStakingHelperAddress = await bond.stakingHelper();
    if (stakingHelper.address !== bondStakingHelperAddress) {
        await bond.setStaking(stakingHelper.address, true);
        log(
            "Ohm-Dai bond StakingHelper address updated:",
            bondStakingHelperAddress,
            " -> ",
            stakingHelper.address
        );
    }
};
export default setStakingOhmDaiBond;
setStakingOhmDaiBond.id = OHM_DAI_BOND_SET_STAKING_DID;
setStakingOhmDaiBond.tags = ["local", "test", OHM_DAI_BOND_SET_STAKING_DID];
setStakingOhmDaiBond.dependencies = [STAKING_HELPER_DID, OHM_DAI_BOND_DID];
