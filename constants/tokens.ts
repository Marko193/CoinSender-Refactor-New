import { SupportedChainId } from './chains';

export const DEFAULT_ERC20_DECIMALS = 18;

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export interface TokensMap {
  [chainId: number]: {
    address: string;
    name: string;
    decimals?: number;
    symbol?: string;
    logoURI?: string;
    chainId?: number;
  }[];
}

export const TOKENS: TokensMap = {
  [SupportedChainId.BSC]: [
    {
      address: 'native',
      symbol: 'BNB',
      name: 'bnb',
      decimals: 18,
    },
    {
      address: '0x7fa892544D49598460B821De4D99E8c28b1Decaa',
      chainId: 56,
      name: 'COMPLUS',
      symbol: 'COM',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x7fa892544D49598460B821De4D99E8c28b1Decaa/logo.png',
    },
    {
      address: '0x59d8e0Ad1A61b9BAf152a66cBAd2743A70555077',
      chainId: 56,
      name: 'XCom',
      symbol: 'xCOM',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x59d8e0Ad1A61b9BAf152a66cBAd2743A70555077/logo.png',
    },
    {
      address: '0x3AA5f9bC7965E5D5CfE42a33AE7d5CD720113B28',
      chainId: 56,
      name: 'COM+',
      symbol: 'COM+',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x3AA5f9bC7965E5D5CfE42a33AE7d5CD720113B28/logo.png',
    },
    {
      address: '0x8aa07670cDCcC2095C6F466570099436fc205c56',
      chainId: 56,
      name: 'BNB BT',
      symbol: 'BNB+',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x8aa07670cDCcC2095C6F466570099436fc205c56/logo.png',
    },
    {
      address: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A',
      chainId: 56,
      name: 'beefy.finance',
      symbol: 'BIFI',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xCa3F508B8e4Dd382eE878A314789373D80A5190A/logo.png',
    },
    {
      address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
      chainId: 56,
      name: 'Ethereum Token',
      symbol: 'ETH',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x2170Ed0880ac9A755fd29B2688956BD959F933F8/logo.png',
    },
    {
      address: '0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE',
      chainId: 56,
      name: 'XRP Token',
      symbol: 'XRP',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE/logo.png',
    },
    {
      address: '0x1CE0c2827e2eF14D5C4f29a091d735A204794041',
      chainId: 56,
      name: 'Binance Pegged AVAX',
      symbol: 'AVAXb',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x1CE0c2827e2eF14D5C4f29a091d735A204794041/logo.png',
    },
    {
      address: '0x55d398326f99059fF775485246999027B3197955',
      chainId: 56,
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x55d398326f99059fF775485246999027B3197955/logo.png',
    },
    {
      address: '0x4338665CBB7B2485A8855A139b75D5e34AB0DB94',
      chainId: 56,
      name: 'Litecoin Token',
      symbol: 'LTC',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x4338665CBB7B2485A8855A139b75D5e34AB0DB94/logo.png',
    },
    {
      address: '0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf',
      chainId: 56,
      name: 'Bitcoin Cash Token',
      symbol: 'BCH',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf/logo.png',
    },
    {
      address: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
      chainId: 56,
      name: 'ChainLink Token',
      symbol: 'LINK',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD/logo.png',
    },
    {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      chainId: 56,
      name: 'Wrapped Binance',
      symbol: 'WBNB',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/logo.png',
    },
    {
      address: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
      chainId: 56,
      name: 'Cardano Token',
      symbol: 'ADA',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47/logo.png',
    },
    {
      address: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
      chainId: 56,
      name: 'Polkadot Token',
      symbol: 'DOT',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402/logo.png',
    },
    {
      address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      chainId: 56,
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d/logo.png',
    },
    {
      address: '0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6',
      chainId: 56,
      name: 'EOS Token',
      symbol: 'EOS',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6/logo.png',
    },
    {
      address: '0x0Eb3a705fc54725037CC9e008bDede697f62F335',
      chainId: 56,
      name: 'Cosmos Token',
      symbol: 'ATOM',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x0Eb3a705fc54725037CC9e008bDede697f62F335/logo.png',
    },
    {
      address: '0x16939ef78684453bfDFb47825F8a5F714f12623a',
      chainId: 56,
      name: 'Tezos Token',
      symbol: 'XTZ',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x16939ef78684453bfDFb47825F8a5F714f12623a/logo.png',
    },
    {
      address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
      chainId: 56,
      name: 'Dai Token',
      symbol: 'DAI',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3/logo.png',
    },
    {
      address: '0xBf5140A22578168FD562DCcF235E5D43A02ce9B1',
      chainId: 56,
      name: 'Uniswap',
      symbol: 'UNI',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xBf5140A22578168FD562DCcF235E5D43A02ce9B1/logo.png',
    },
    {
      address: '0x9Ac983826058b8a9C7Aa1C9171441191232E8404',
      chainId: 56,
      name: 'Synthetix Network Token',
      symbol: 'SNX',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x9Ac983826058b8a9C7Aa1C9171441191232E8404/logo.png',
    },
    {
      address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      chainId: 56,
      name: 'BUSD Token',
      symbol: 'BUSD',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/logo.png',
    },
    {
      address: '0x88f1A5ae2A3BF98AEAF342D26B30a79438c9142e',
      chainId: 56,
      name: 'yearn.finance',
      symbol: 'YFI',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x88f1A5ae2A3BF98AEAF342D26B30a79438c9142e/logo.png',
    },
    {
      address: '0x1Ba42e5193dfA8B03D15dd1B86a3113bbBEF8Eeb',
      chainId: 56,
      name: 'Zcash Token',
      symbol: 'ZEC',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x1Ba42e5193dfA8B03D15dd1B86a3113bbBEF8Eeb/logo.png',
    },
    {
      address: '0x3d6545b08693daE087E957cb1180ee38B9e3c25E',
      chainId: 56,
      name: 'Ethereum Classic',
      symbol: 'ETC',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x3d6545b08693daE087E957cb1180ee38B9e3c25E/logo.png',
    },
    {
      address: '0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8',
      chainId: 56,
      name: 'Compound Coin',
      symbol: 'COMP',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8/logo.png',
    },
    {
      address: '0x5f0Da599BB2ccCfcf6Fdfd7D81743B6020864350',
      chainId: 56,
      name: 'Maker',
      symbol: 'MKR',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x5f0Da599BB2ccCfcf6Fdfd7D81743B6020864350/logo.png',
    },
    {
      address: '0xFd7B3A77848f1C2D67E05E54d78d174a0C850335',
      chainId: 56,
      name: 'Ontology Token',
      symbol: 'ONT',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xFd7B3A77848f1C2D67E05E54d78d174a0C850335/logo.png',
    },
    {
      address: '0x101d82428437127bF1608F699CD651e6Abf9766E',
      chainId: 56,
      name: 'Basic Attention Token',
      symbol: 'BAT',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x101d82428437127bF1608F699CD651e6Abf9766E/logo.png',
    },
    {
      address: '0xD475c9c934DCD6d5f1cAC530585aa5ba14185b92',
      chainId: 56,
      name: 'Bitcoin Cash ABC',
      symbol: 'BCHA',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xD475c9c934DCD6d5f1cAC530585aa5ba14185b92/logo.png',
    },
    {
      address: '0xAD6cAEb32CD2c308980a548bD0Bc5AA4306c6c18',
      chainId: 56,
      name: 'Band Protocol Token',
      symbol: 'BAND',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xAD6cAEb32CD2c308980a548bD0Bc5AA4306c6c18/logo.png',
    },
    {
      address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      chainId: 56,
      name: 'BTC Token',
      symbol: 'BTC',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c/logo.png',
    },
    {
      address: '0x7950865a9140cB519342433146Ed5b40c6F210f7',
      chainId: 56,
      name: 'PAX Gold',
      symbol: 'PAXG',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x7950865a9140cB519342433146Ed5b40c6F210f7/logo.png',
    },
    {
      address: '0xf307910A4c7bbc79691fD374889b36d8531B08e3',
      chainId: 56,
      name: 'Ankr',
      symbol: 'ANKR',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xf307910A4c7bbc79691fD374889b36d8531B08e3/logo.png',
    },
    {
      address: '0x7F70642d88cf1C4a3a7abb072B53B929b653edA5',
      chainId: 56,
      name: 'YFII.finance Token',
      symbol: 'YFII',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x7F70642d88cf1C4a3a7abb072B53B929b653edA5/logo.png',
    },
    {
      address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
      chainId: 56,
      name: 'PancakeSwap Token',
      symbol: 'Cake',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png',
    },
    {
      address: '0xd4CB328A82bDf5f03eB737f37Fa6B370aef3e888',
      chainId: 56,
      name: 'Cream',
      symbol: 'CREAM',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xd4CB328A82bDf5f03eB737f37Fa6B370aef3e888/logo.png',
    },
    {
      address: '0xaF53d56ff99f1322515E54FdDE93FF8b3b7DAFd5',
      chainId: 56,
      name: 'Prometeus',
      symbol: 'PROM',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xaF53d56ff99f1322515E54FdDE93FF8b3b7DAFd5/logo.png',
    },
    {
      address: '0xE4Ae305ebE1AbE663f261Bc00534067C80ad677C',
      chainId: 56,
      name: 'SPARTAN PROTOCOL TOKEN',
      symbol: 'SPARTA',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xE4Ae305ebE1AbE663f261Bc00534067C80ad677C/logo.png',
    },
    {
      address: '0x007EA5C0Ea75a8DF45D288a4debdD5bb633F9e56',
      chainId: 56,
      name: 'CanYaCoin',
      symbol: 'CAN',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x007EA5C0Ea75a8DF45D288a4debdD5bb633F9e56/logo.png',
    },
    {
      address: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
      chainId: 56,
      name: 'BakeryToken',
      symbol: 'BAKE',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5/logo.png',
    },
    {
      address: '0x90DF11a8ccE420675e73922419e3f4f3Fe13CCCb',
      chainId: 56,
      name: 'Streamity',
      symbol: 'STM',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x90DF11a8ccE420675e73922419e3f4f3Fe13CCCb/logo.png',
    },
    {
      address: '0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f',
      chainId: 56,
      name: 'Burger Swap',
      symbol: 'BURGER',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f/logo.png',
    },
    {
      address: '0x0cC7CBC1609D2B6fD6D33048b9B4aDe8CF9dDe47',
      chainId: 56,
      name: 'ARGENT',
      symbol: 'XAG',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x0cC7CBC1609D2B6fD6D33048b9B4aDe8CF9dDe47/logo.png',
    },
    {
      address: '0x1758F8046Ad8D425560f44fD5E0E6beEA04762BA',
      chainId: 56,
      name: 'CUPRUM',
      symbol: 'XCU',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0x1758F8046Ad8D425560f44fD5E0E6beEA04762BA/logo.png',
    },
  ],
  [SupportedChainId.MAINNET]: [
    {
      address: 'native',
      symbol: 'ETH',
      name: 'eth',
      decimals: 18,
    },
    {
      address: '0xa85d8C972E1d54136e4BbEd3D108dB6e108e98f9',
      name: 'Optimus',
      symbol: 'OPT',
    },
    {
      address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
      name: ' Aave Token',
      symbol: 'AAVE',
    },
    {
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      name: 'USD Coin',
      symbol: 'USDC',
    },
    {
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
    },
    {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      name: 'Tether USD',
      symbol: 'USDT',
    },
    {
      address: '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
      name: 'Aave interest bearing DAI',
      symbol: 'aDAI',
    },
    {
      address: '0xBcca60bB61934080951369a648Fb03DF4F96263C',
      name: 'Aave interest bearing USDC',
      symbol: 'aUSDC',
    },
  ],
  [SupportedChainId.POLYGON]: [
    {
      address: 'native',
      symbol: 'MATIC',
      name: 'Matic',
      decimals: 18,
    },
    {
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      symbol: 'USDT',
      name: '(PoS) Tether USD',
      decimals: 6,
    },
    {
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      symbol: 'DAI',
      name: '(PoS) Dai Stablecoin',
      decimals: 18,
    },
    {
      address: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
      symbol: 'AAVE',
      name: 'Aave (PoS)',
      decimals: 18,
    },
    {
      address: '0x329434Fe066AC71D5FB93489F955A6959658097b',
      symbol: 'aDAI',
      name: 'Aave interest bearing DAI (PoS)',
      decimals: 18,
    },
    {
      address: '0xe87Ba1bd11EE6e0D3c7dd6932E6A038e38627F65',
      symbol: 'aUSDC',
      name: 'aUSDC',
      decimals: 18,
    },
  ],
  [SupportedChainId.OPTIMISM]: [
    {
      address: 'native',
      symbol: 'ETH',
      name: 'ETH',
      decimals: 18,
    },
    {
      address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
    },
    {
      address: '0x4200000000000000000000000000000000000006',
      symbol: 'WETH',
      name: 'Wrapped Ether',
      decimals: 18,
    },
    {
      address: '0x76FB31fb4af56892A25e32cFC43De717950c9278',
      symbol: 'AAVE',
      name: 'Aave Token',
      decimals: 18,
    },
    {
      address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
    },
    {
      address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
    },
  ],
  [SupportedChainId.ARBITRUM_ONE]: [
    {
      address: 'native',
      symbol: 'ETH',
      name: 'ETH',
      decimals: 18,
    },
    {
      address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
    },
    {
      address: '0x8F4581D173FFD2c439824465366a67c509A813ac',
      symbol: 'AETH',
      name: 'Atlantis EThereum',
      decimals: 18,
    },
    {
      address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
      symbol: 'USDC',
      name: 'USD Coin (Arb1)',
      decimals: 6,
    },
    {
      address: '0x625E7708f30cA75bfd92586e17077590C60eb4cD',
      symbol: 'aArbUSDC',
      name: 'Aave Arbitrum USDC',
      decimals: 6,
    },
    {
      address: '0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE',
      symbol: 'aArbDAI',
      name: 'Aave Arbitrum DAI',
      decimals: 18,
    },
    {
      address: '0xa0b862F60edEf4452F25B4160F177db44DeB6Cf1',
      symbol: 'GNO',
      name: 'Gnosis Token',
      decimals: 18,
    },
    {
      address: '0x9623063377AD1B27544C965cCd7342f7EA7e88C7',
      symbol: 'GRT',
      name: 'Graph Token',
      decimals: 18,
    },
    {
      address: '0xe4DDDfe67E7164b0FE14E218d80dC4C08eDC01cB',
      symbol: 'KNC',
      name: 'Kyber Network Crystal v2',
      decimals: 18,
    },
  ],
  [SupportedChainId.CELO]: [
    {
      address: 'native',
      symbol: 'CELO',
      name: 'CELO',
      decimals: 18,
    },
    {
      address: '0xe8537a3d056da446677b9e9d6c5db704eaab4787',
      symbol: 'cREAL',
      name: 'Celo Brazilian Real',
      decimals: 18,
    },
    {
      address: '0x765de816845861e75a25fca122bb6898b8b1282a',
      symbol: 'cUSD',
      name: 'Celo Dollar',
      decimals: 18,
    },
    {
      address: '0x29dfce9c22003a4999930382fd00f9fd6133acd1',
      symbol: 'SUSHI',
      name: 'SushiToken',
      decimals: 18,
    },
    {
      address: '0x122013fd7df1c6f636a5bb8f03108e876548b455',
      symbol: 'WETH',
      name: 'Wrapped Ether',
      decimals: 18,
    },
  ],
  [SupportedChainId.BSC_TEST]: [
    {
      address: 'native',
      symbol: 'BNB',
      name: 'BNB',
      decimals: 18,
    },
    {
      address: '0x64544969ed7EBf5f083679233325356EbE738930',
      symbol: 'USDC',
      name: 'USDC Token',
      decimals: 18,
    },
    {
      address: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
      symbol: 'USDT',
      name: 'USDT Token',
      decimals: 18,
    },
    {
      address: '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867',
      symbol: 'DAI',
      name: 'DAI Token',
      decimals: 18,
    },
  ],
  [SupportedChainId.AVALANCHE]: [
    {
      address: 'native',
      symbol: 'AVAX',
      name: 'Avax',
      decimals: 18,
    },
    {
      address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
      symbol: 'USDT',
      name: 'TetherToken',
      decimals: 6,
    },
    {
      address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
    },
    {
      address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
      symbol: 'DAIe',
      name: 'Dai Stablecoin',
      decimals: 18,
    },
    {
      address: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9',
      symbol: 'AAVEe',
      name: 'Aave Token',
      decimals: 18,
    },
  ],
  [SupportedChainId.GODWOKEN]: [
    {
      address: 'native',
      symbol: 'CKB',
      name: 'CKB',
      decimals: 18,
    },
  ],
  [SupportedChainId.FANTOM]: [
    {
      address: 'native',
      symbol: 'FTM',
      name: 'FTM',
      decimals: 18,
    },
    {
      address: '0x6a07A792ab2965C72a5B8088d3a069A7aC3a993B',
      symbol: 'AAVE',
      name: 'Aave',
      decimals: 18,
    },
    {
      address: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e',
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
    },
    {
      address: '0x657A1861c15A3deD9AF0B6799a195a249ebdCbc6',
      symbol: 'CREAM',
      name: 'Cream',
      decimals: 18,
    },
    {
      address: '0xe1146b9AC456fCbB60644c36Fd3F868A9072fc6E',
      symbol: 'FBTC',
      name: 'fBTC',
      decimals: 18,
    },
    {
      address: '0x658b0c7613e890EE50B8C4BC6A3f41ef411208aD',
      symbol: 'FETH',
      name: 'fETH',
      decimals: 18,
    },
    {
      address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
    },
  ],
  [SupportedChainId.GNOSIS]: [
    {
      address: 'native',
      symbol: 'xDai',
      name: 'xDai',
      decimals: 18,
    },
    {
      address: '0xdd96B45877d0E8361a4DDb732da741e97f3191Ff',
      symbol: 'BUSD',
      name: 'BUSD Token on xDai',
      decimals: 18,
    },
    {
      address: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
      symbol: 'USDC',
      name: ' USD//C on xDai',
      decimals: 6,
    },
    {
      address: '0x256eb8a51f382650B2A1e946b8811953640ee47D',
      symbol: 'DATA',
      name: 'Streamr',
      decimals: 18,
    },
    {
      address: '0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb',
      symbol: 'GNO',
      name: 'Gnosis Token on xDai',
      decimals: 18,
    },
    {
      address: '0xFAdc59D012Ba3c110B08A15B7755A5cb7Cbe77D7',
      symbol: 'GRT',
      name: 'Graph Token on xDai',
      decimals: 18,
    },
    {
      address: '0x9fB1d52596c44603198fB0aee434fac3a679f702',
      symbol: 'jEUR',
      name: 'Jarvis Synthetic Euro',
      decimals: 18,
    },
  ],
  [SupportedChainId.MOONBEAM]: [
    {
      address: 'native',
      symbol: 'GLMR',
      name: 'GLMR',
      decimals: 18,
    },
    {
      address: '0x765277EebeCA2e31912C9946eAe1021199B39C61',
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
    },
    {
      address: '0x0E358838ce72d5e61E0018a2ffaC4bEC5F4c88d2',
      symbol: 'STELLA',
      name: 'StellaSwap',
      decimals: 18,
    },
    {
      address: '0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
    },
    {
      address: '0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
    },
  ],
  [SupportedChainId.OASIS_EMERALD]: [
    {
      address: 'native',
      symbol: 'ROSE',
      name: 'Oasis Network',
      decimals: 18,
    },
  ],
  [SupportedChainId.FUSE]: [
    {
      address: 'native',
      symbol: 'FUSE',
      name: 'FUSE',
      decimals: 18,
    },
    {
      address: '0x6a5f6a8121592becd6747a38d67451b310f7f156',
      symbol: 'BUSD',
      name: 'Binance USD on Fuse',
      decimals: 18,
    },
    {
      address: '0x249be57637d8b013ad64785404b24aebae9b098b',
      symbol: 'fUSD',
      name: 'Fuse Dollar',
      decimals: 18,
    },
    {
      address: '0x38bc6110cd10bf396e67d54adb9aa8de8426c8bf',
      symbol: 'GDD',
      name: 'GoodDollar',
      decimals: 18,
    },
  ],
};
