import React, { useEffect } from "react";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useSelector, Provider } from "react-redux";
import BACKEND_API_URL from "#src/services/backendApi/BACKEND_API_URL"

type AppState = {
  palettes: Palette[] | null,
  paletteIdLookup: {} | null,
  groups: Group[] | null
}

const initialState: AppState = {
  palettes: null,
  paletteIdLookup: null,
  groups: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPalette: (state, action) => {
      const palettes = action.payload;
      const paletteIdLookup = palettes.reduce((acc: any, cur: Palette) => {
        acc[cur.id as number] = cur;
        return acc;
      }, {});

      return {
        palettes,
        paletteIdLookup,
        groups: state.groups,
      };
    },
    refetchGroups: state => {
    }
  }
})

const { setPalette, refetchGroups } = appSlice.actions

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
      store.dispatch(setPalette(body));
  })();
}

export function refreshGroups() {
  store.dispatch(refetchGroups())
}
