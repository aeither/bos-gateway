import type { NetworkId } from '@/utils/types';

type NetworkComponents = {
  home: string;
};

export const componentsByNetworkId: Record<NetworkId, NetworkComponents | undefined> = {
  testnet: {
    home: 'f54a9bc1772d359e09686dc19b32d291234bdbaa685cdd87ff1ef68d3c0dc74a/widget/friendtech',
  },

  mainnet: {
    home: 'f54a9bc1772d359e09686dc19b32d291234bdbaa685cdd87ff1ef68d3c0dc74a/widget/friendtech',
  },
};
