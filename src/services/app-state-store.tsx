import React, { useEffect } from "react";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useSelector, Provider } from "react-redux";
import secrets from "#src/services/api/secrets"
const BACKEND_API_URL = secrets.BACKEND_API_URL as string;
import { getRequest }  from "./api/backendApi";

type AppState = {
  palettes: Palette[] | null,
  paletteIdLookup: { [key:number]: Palette } | null,
  groups: Group[] | null,
  groupIdLookup: { [key:number]: Palette } | null,
  currentGroupId: number | null,
  user: User | null,
}

const initialState: AppState = {
  palettes: null,
  paletteIdLookup: null,
  groups: null,
  groupIdLookup: null,
  currentGroupId: null,
  user: null,
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
      newState.groupIdLookup = (newState.groups as Group[])?.reduce((acc: any, cur: Group) => {
        acc[cur.id as number] = cur;
        return acc;
      }, {})

      return newState;
    },
    setCurrentGroupId: (state, action) => {
      const id = action.payload;
      const newState = {...state};
      newState.currentGroupId = id;

      return newState;
    },
    setUser: (state, action) => {
      return {...state, user: action.payload};
    }
  }
})

const { setPalettes, setGroups, setCurrentGroupId, setUser } = appSlice.actions

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
  }, [palettes]);

  return palettes;
}

export function usePalette(id: number | undefined): Palette | null {
  if (id === undefined)
    return null;

  const palette = useSelector((state: any) => state.paletteIdLookup?.[id]);

  useEffect(() => {
    if (!palette) {
      refreshPalettes();
    }
  }, [palette]);

  return palette;
}

export function useGroups(): Group[] | null {
  const groups = useSelector((state: any) => state?.groups);

  useEffect(() => {
    if (!groups) {
      refreshGroups();
    }
  }, [groups]);

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
  }, [group]);

  return group;
}

export function useCurrentGroup(): Group | null {
  const groupId = useSelector((state: any) => state.currentGroupId);
  const groupIdLookup = useSelector((state: any) => state.groupIdLookup);

  useEffect(() => {
    if (!groupIdLookup) 
      refreshGroups();
  }, [groupId, groupIdLookup])
  
  const result = groupIdLookup?.[groupId];

  if (!result)
    return null;
  else 
    return result;
}

export function useUser(): User | null {
  const user = useSelector((state: AppState) => state.user);

  useEffect(() => {
    if (!user)
      refreshUser();
  }, [user]);

  return user;
}

export function setCurrentGroup(id: number | null): void {
  store.dispatch(setCurrentGroupId(id));
}

export function AppStoreProvider(props: any) {
  return <Provider store={store}>
    {props.children}
  </Provider>
}

export async function refreshPalettes(): Promise<any> {
  try {
    const fetchPromise = await getRequest('/palettes');
    const body = await fetchPromise.json();
    store.dispatch(setPalettes(body));
    return body;
  } catch(e) {
    console.error(e);
  }
}

export async function refreshGroups(): Promise<any> {
    try {
      const fetchPromise = await getRequest('/groups');
      const body = await fetchPromise.json();
      store.dispatch(setGroups(body.data.groups));
      return body;
    } catch(e) {
      console.error(e);
    }
}

export async function refreshUser(): Promise<any> {
  try {
    const fetchPromise = await getRequest('/users/me');
    const body = await fetchPromise.json();
    store.dispatch(setUser(body));
    return body;
  } catch (error) {
    console.error(error);
  }
}