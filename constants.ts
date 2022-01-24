
interface IConstants {
    [key: number]: { [key: string]: string };
}
/*
******************************************* Addresses **********************************************
*/
export const constants: IConstants = {
    250: {
        SPOOKY_SWAP_ROUTER: "0xF491e7B69E4244ad4002BC14e878a34207E38c29", // Spooky swap router address
        SPOOKY_SWAP_FACTORY: "0x152eE697f2E276fA89E96742e9bB9aB1F2E61bE3", // Spooky swap factory address
        SPIRIT_ROUTER: "0x16327e3fbdaca3bcf7e38f5af2599d2ddc33ae52", // Spirit Router Fantom Mainnet
        GOHM_ADDRESS: "0x91fa20244Fb509e8289CA630E5db3E9166233FDc", // SynapseERC20 address Fantom Mainnet
        USDC_ADDRESS: "0x04068da6c83afcfa0e13ba15a6696662335d5b75", // Wrapped FTM USDC Fantom Mainnet
        HEC_ADDRESS: "0x5C4FDfc5233f935f20D2aDbA572F770c2E377Ab0", // Hector DAO HEC token address Fantom Mainnet
        DAI_ADDRESS: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", // DAI ERC20 token address
        WFTM_ADDRESS: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83", // Wrapped FTM ERC20 token address
        BOO_ADDRESS: "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE", // Spooky ERC20 token address
        REVEST_ADDRESS_REGISTRY: "0xe0741aE6a8A6D87A68B7b36973d8740704Fd62B9" // Revest ERC20 token address for FNFT
    },
    4002: {
        SPOOKY_SWAP_ROUTER: "0xcCAFCf876caB8f9542d6972f87B5D62e1182767d", // Spooky swap router address used to add initial liquidity
        SPOOKY_SWAP_FACTORY: "0x5D479c2a7FB79E12Ac4eBBAeDB0322B4d5F9Fd02", // Spooky swap factory address used to deposit LP in treasury
        SPIRIT_ROUTER: "0x16327e3fbdaca3bcf7e38f5af2599d2ddc33ae52", // Spirit Router Fantom Mainnet: Used to get price of gOHM via Spot price oracle
        GOHM_ADDRESS: "0x91fa20244Fb509e8289CA630E5db3E9166233FDc", // SynapseERC20 address Fantom Mainnet: Used for gOHM bonds
        USDC_ADDRESS: "0x04068da6c83afcfa0e13ba15a6696662335d5b75", // Wrapped FTM USDC Fantom Mainnet: Used to get price of gOHM with pair
        HEC_ADDRESS: "0x5C4FDfc5233f935f20D2aDbA572F770c2E377Ab0", // Hector DAO HEC token address Fantom Mainnet
        DAI_ADDRESS: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", // DAI ERC20 token address
        WFTM_ADDRESS: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83", // Wrapped FTM ERC20 token address
        BOO_ADDRESS: "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE", // Spooky ERC20 token address
        REVEST_ADDRESS_REGISTRY: "0xe0741aE6a8A6D87A68B7b36973d8740704Fd62B9" // Revest ERC20 token address for FNFT
    },
    43113: {
        SPOOKY_SWAP_ROUTER: "0x2D99ABD9008Dc933ff5c0CD271B88309593aB921", // Spooky swap router address used to add initial liquidity
        SPOOKY_SWAP_FACTORY: "0xe4a575550c2b460d2307b82dcd7afe84ad1484dd", // Spooky swap factory address used to deposit LP in treasury
        SPIRIT_ROUTER: "0x16327e3fbdaca3bcf7e38f5af2599d2ddc33ae52", // Spirit Router Fantom Mainnet: Used to get price of gOHM via Spot price oracle
        GOHM_ADDRESS: "0x91fa20244Fb509e8289CA630E5db3E9166233FDc", // SynapseERC20 address Fantom Mainnet: Used for gOHM bonds
        USDC_ADDRESS: "0x04068da6c83afcfa0e13ba15a6696662335d5b75", // Wrapped FTM USDC Fantom Mainnet: Used to get price of gOHM with pair
        HEC_ADDRESS: "0x5C4FDfc5233f935f20D2aDbA572F770c2E377Ab0", // Hector DAO HEC token address Fantom Mainnet
        DAI_ADDRESS: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", // DAI ERC20 token address
        WFTM_ADDRESS: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83", // Wrapped FTM ERC20 token address
        BOO_ADDRESS: "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE", // Spooky ERC20 token address
        REVEST_ADDRESS_REGISTRY: "0xe0741aE6a8A6D87A68B7b36973d8740704Fd62B9" // Revest ERC20 token address for FNFT
    },

    4: {
        SPOOKY_SWAP_ROUTER: "0x7E2528476b14507f003aE9D123334977F5Ad7B14", // Spooky swap router address used to add initial liquidity
        SPOOKY_SWAP_FACTORY: "0x86f83be9770894d8e46301b12E88e14AdC6cdb5F", // Spooky swap factory address used to deposit LP in treasury
        SPIRIT_ROUTER: "0x16327e3fbdaca3bcf7e38f5af2599d2ddc33ae52", // Spirit Router Fantom Mainnet: Used to get price of gOHM via Spot price oracle
        GOHM_ADDRESS: "0x91fa20244Fb509e8289CA630E5db3E9166233FDc", // SynapseERC20 address Fantom Mainnet: Used for gOHM bonds
        USDC_ADDRESS: "0x04068da6c83afcfa0e13ba15a6696662335d5b75", // Wrapped FTM USDC Fantom Mainnet: Used to get price of gOHM with pair
        HEC_ADDRESS: "0x5C4FDfc5233f935f20D2aDbA572F770c2E377Ab0", // Hector DAO HEC token address Fantom Mainnet
        DAI_ADDRESS: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", // DAI ERC20 token address
        WFTM_ADDRESS: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83", // Wrapped FTM ERC20 token address
        BOO_ADDRESS: "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE", // Spooky ERC20 token address
        REVEST_ADDRESS_REGISTRY: "0xe0741aE6a8A6D87A68B7b36973d8740704Fd62B9" // Revest ERC20 token address for FNFT
    },

    97: {
        SPOOKY_SWAP_ROUTER: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1", // Spooky swap router address used to add initial liquidity
        SPOOKY_SWAP_FACTORY: "0x6725F303b657a9451d8BA641348b6761A6CC7a17", // Spooky swap factory address used to deposit LP in treasury
        SPIRIT_ROUTER: "0x16327e3fbdaca3bcf7e38f5af2599d2ddc33ae52", // Spirit Router Fantom Mainnet: Used to get price of gOHM via Spot price oracle
        GOHM_ADDRESS: "0x91fa20244Fb509e8289CA630E5db3E9166233FDc", // SynapseERC20 address Fantom Mainnet: Used for gOHM bonds
        USDC_ADDRESS: "0x04068da6c83afcfa0e13ba15a6696662335d5b75", // Wrapped FTM USDC Fantom Mainnet: Used to get price of gOHM with pair
        HEC_ADDRESS: "0x5C4FDfc5233f935f20D2aDbA572F770c2E377Ab0", // Hector DAO HEC token address Fantom Mainnet
        DAI_ADDRESS: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", // DAI ERC20 token address
        WFTM_ADDRESS: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83", // Wrapped FTM ERC20 token address
        BOO_ADDRESS: "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE", // Spooky ERC20 token address
        REVEST_ADDRESS_REGISTRY: "0xe0741aE6a8A6D87A68B7b36973d8740704Fd62B9" // Revest ERC20 token address for FNFT
    },

    31337: {
        SPOOKY_SWAP_ROUTER: "0xF491e7B69E4244ad4002BC14e878a34207E38c29", // Spooky swap router address
        SPOOKY_SWAP_FACTORY: "0x152eE697f2E276fA89E96742e9bB9aB1F2E61bE3", // Spooky swap factory address
        SPIRIT_ROUTER: "0x16327e3fbdaca3bcf7e38f5af2599d2ddc33ae52", // Spirit Router Fantom Mainnet
        GOHM_ADDRESS: "0x91fa20244Fb509e8289CA630E5db3E9166233FDc", // SynapseERC20 address Fantom Mainnet
        USDC_ADDRESS: "0x04068da6c83afcfa0e13ba15a6696662335d5b75", // Wrapped FTM USDC Fantom Mainnet
        HEC_ADDRESS: "0x5C4FDfc5233f935f20D2aDbA572F770c2E377Ab0", // Hector DAO HEC token address Fantom Mainnet
        WFTM_ADDRESS: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83", // Wrapped FTM ERC20 token address
        BOO_ADDRESS: "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE", // Spooky ERC20 token address
        REVEST_ADDRESS_REGISTRY: "0xe0741aE6a8A6D87A68B7b36973d8740704Fd62B9" // Revest ERC20 token address for FNFT
    }
}

/*
***************************************** Initial staking parameters ****************************************
*/

// Initial staking index
export const initialIndex = 1;

// First block epoch occurs
export const firstEpochBlock = '6624500';

// What epoch will be first epoch
export const firstEpochNumber = '0';

// Time of each rebase in blocks
// How many blocks are in each epoch
// Use this to control time of each rebase to occur to distribute rewards to stakers
// 28800 blocks => 8 Hours : @1sec/block
export const epochLengthInBlocks = '100';

/*
*************************************************************************************************************
*/

// Ethereum 0 address, used when toggling changes in treasury
export const zeroAddress = '0x0000000000000000000000000000000000000000';

/*
*************************************** Development Playground only *****************************************
*/

// Initial mint for Frax and DAI (10,000,000 x 10^18)
export const initialMint = '10000000000000000000000000';

// Initial mint OHM (10000 x 10^18)
export const initialMintOhm = '10000000000000000000000';

/*
******************************************** Bond Parameters ************************************************
*/

// DAI bond BCV
export const daiBondBCV = '100';


// Bond vesting length in blocks. 432000 ~ 5 days on fantom
// Total time it takes to mature a bond to fullest
export const bondVestingLength = '3600';

// Min bond price: $20 * 100 = 2500 
export const minBondPrice = '2000';

// Max bond payout (Max user can buy)
export const maxBondPayout = '5000'

// DAO fee for bond
export const bondFee = '10000';

// Max total debt bond can take on 1,000,000 x 10^9
export const maxBondDebt = '1000000000000000';

// Initial Bond debt when deploying
export const intialBondDebt = '0'


// Ohm-Dai LP bond BCV
export const ohmDaiBondBCV = '350';

// Bond vesting length in blocks. 432000 ~ 5 days on fantom
// Total time it takes to mature a bond to fullest
export const lpBondVestingLength = '1800';

// Min bond price: $25 * 100 = 2500 
export const minLpBondPrice = '2500';

// Max bond payout (Max user can buy)
export const maxLpBondPayout = '50000'

// DAO fee for bond
export const lpBondFee = '10000';

// Max total debt bond can take on 1,000,000 x 10^9
export const maxLpBondDebt = '1000000000000000';

// Initial Bond debt when deploying
export const intialLpBondDebt = '0'


/*
******************************************** LP Parameters ************************************************
*/

// The amount of ohm to add as liquidity if the Dai/Ohm price is <= amountDaiDesired/amountOhmDesired (Ohm depreciates)
export const amountOhmDesired = 100;
// The amount of Dai to add as liquidity if the Ohm/Dai price is <= amountOhmDesired/amountDaiDesired (Dai depreciates).
export const amountDaiDesired = 100;
// Bounds the extent to which the Dai/Ohm price can go up before the transaction reverts. Must be <= amountOhmDesired.
export const amountOhmMin =  99;
// Bounds the extent to which the Ohm/Dai price can go up before the transaction reverts. Must be <= amountDaiDesired.
export const amountDaiMin = 99;
// Unix timestamp after which the transaction will revert.
export const expiration = Math.round(new Date().valueOf() / 1000 + 3600);

/*
*************************************************************************************************************
*/

