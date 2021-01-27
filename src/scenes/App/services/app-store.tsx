import React, { useEffect } from "react";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useSelector, Provider } from "react-redux";
import BACKEND_API_URL from "#src/services/backendApi/BACKEND_API_URL"

type AppState = {
  palettes: Palette[] | null,
  paletteIdLookup: {} | null,
  groups: Group[] | null,
  groupIdLookup: {} | null,
  currentGroup: number | null,
}

const initialState: AppState = {
  palettes: null,
  paletteIdLookup: null,
  groups: null,
  groupIdLookup: null,
  currentGroup: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPalettes: (state, action) => {
      const newState = {...state};
      newState.palettes = action.payload;
      newState.paletteIdLookup = (newState.palettes as Palette[]).reduce((acc: any, cur: Palette) => {
        acc[cur.id as number] = cur;
        return acc;
      }, {});

      return newState;
    },
    setGroups: (state, action) => {
      const newState = {...state};
      newState.groups = action.payload;
      newState.groupIdLookup = (newState.groups as Group[]).reduce((acc: any, cur: Group) => {
        acc[cur.id as number] = cur;
        return acc;
      }, {})

      return newState;
    }
  }
})

const { setPalettes, setGroups } = appSlice.actions

const store = configureStore({
  reducer: appSlice.reducer
})

// Possible actions from a react component
// React custom hooks for store
// if return is null, then store is loading from api
export function usePalettes(): Palette[] | null {
  const palettes =  useSelector((state: any) => state.palettes);

  useEffect(() => {
    if (!palettes) {
      refreshPalettes();
    }
  });

  return palettes;
}

export function usePalette(id: number): Palette | null {
  const palette = useSelector((state: any) => state.paletteIdLookup?.[id]);

  useEffect(() => {
    if (!palette) {
      refreshPalettes();
    }
  });

  return palette;
}

export function useGroups(): Group[] | null {
  const groups = useSelector((state: any) => state?.palettes);

  useEffect(() => {
    if (!groups) {
      refreshGroups();
    }
  });

  return groups
}

export function useGroup(id: number): Group | null {
  const group = useSelector((state: any) => {
    return state.groups?.find((group: Group) => group.id === id);
  });

  useEffect(() => {
    if (!group) {
      refreshGroups();
    }
  });

  return group;
}

export function setCurrentGroup(id: number): void {
}

export function AppStoreProvider(props: any) {
  return <Provider store={store}>
    {props.children}
  </Provider>
}

export function refreshPalettes(): void {
  (async () => {
    const fetchPromise = await fetch(`${BACKEND_API_URL}/palettes`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
      const body = await fetchPromise.json();
      store.dispatch(setPalettes(body));
  })();
}

export function refreshGroups(): void {
  (async () => {
    const fetchPromise = await fetch(`${BACKEND_API_URL}/groups`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
      const body = await fetchPromise.json();
      store.dispatch(setGroups(body));
  })();
}
