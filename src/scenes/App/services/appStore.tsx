import React from "react";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useSelector, Provider } from "react-redux";

const appSlice = createSlice({
  name: 'app',
  initialState: {
    value: {
      "palettes": {},
      "paletteIdLookup": {},
      "groups": {},
    }
  },
  reducers: {
    refetchPalettes: state => {
    },
    refetchGroups: state => {
    }
  }
})

const { refetchPalettes, refetchGroups } = appSlice.actions

const store = configureStore({
  reducer: appSlice.reducer
})

// Possible actions from a react component
export function refreshPalettes() {
  store.dispatch(refetchPalettes());
}

export function refreshGroups() {
  store.dispatch(refetchGroups)
}

export function usePalettes(): Palette[] {
  return useSelector((state: any) => state.palettes);
}

export function usePalette(id: number): Palette {
  return useSelector((state: any) => state.paletteIdLookup[id]);
}

export function useGroups(): Group[] {
  return useSelector((state: any) => state.palettes);
}

export function useGroup(id: number): Palette {
  return useSelector((state: any) => {
    return state.groups.find((group: Group) => group.id === id);
  });
}

export function AppStoreProvider(props: any) {
  return <Provider store={store}>
    {props.children}
  </Provider>
}