import { createSlice } from '@reduxjs/toolkit';

export interface NavigationState {
  selectedTab: string;
}

export const initialState: NavigationState = {
  selectedTab: 'CoinSender',
};

const navigationSlice = createSlice({
  name: 'activeTab',
  initialState,
  reducers: {
    // updateStatisticInfo(state, { payload: { NavigationInfo } }) {
    //   const notDublicatedNetwork = state.netwtorksStatistic.filter(
    //     (item) => item.network !== NavigationInfo.network,
    //   );
    //
    //   state.netwtorksStatistic = [...notDublicatedNetwork, NavigationInfo];
    // },
  },
});

// export const { updateStatisticInfo } = statisticSlice.actions;
export default navigationSlice.reducer;
