import { Network } from "./Network";
import { ProvidersRegistry } from "./providersRegistry";

export const providers = new ProvidersRegistry();
providers.addNetwork(Network.OPERA_MAIN_NET, {
    httpRpc: ["https://rpc.ftm.tools"],
});

providers.addNetwork(Network.OPERA_TEST_NET, {
    httpRpc: ["https://rpc.testnet.fantom.network/"],
});
providers.addNetwork(Network.RINKEBY, {
    httpRpc: ["https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
});
