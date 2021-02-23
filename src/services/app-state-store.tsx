import React, { useEffect } from "react";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useSelector, Provider } from "react-redux";
import secrets from "#src/services/api/secrets"
const BACKEND_API_URL = secrets.BACKEND_API_URL as string;
import { useAuth0 } from "@auth0/auth0-react";
import { getRequest, redirectHomeIfNotLoggedIn } from "#src/services/api/backendApi";

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
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!palettes) {
      refreshPalettes(getAccessTokenSilently, loginWithRedirect);
    }
  }, [palettes]);

  return palettes;
}

export function usePalette(id: number | undefined): Palette | null {
  if (id === undefined)
    return null;

  const palette = useSelector((state: any) => state.paletteIdLookup?.[id]);
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!palette) {
      refreshPalettes(getAccessTokenSilently, loginWithRedirect);
    }
  }, [palette]);

  return palette;
}

export function useGroups(): Group[] | null {
  const groups = useSelector((state: any) => state?.groups);
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!groups) {
      refreshGroups(getAccessTokenSilently, loginWithRedirect);
    }
  }, [groups]);

  return groups
}

export function useGroup(id: number): Group | null {
  const group = useSelector((state: any) => {
    return state.groups?.find((group: Group) => group.id === id);
  });
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!group) {
      refreshGroups(getAccessTokenSilently, loginWithRedirect);
    }
  }, [group]);

  return group;
}

export function useCurrentGroup(): Group | null {
  const groupId = useSelector((state: any) => state.currentGroupId);
  const groupIdLookup = useSelector((state: any) => state.groupIdLookup);
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!groupIdLookup) 
      refreshGroups(getAccessTokenSilently, loginWithRedirect);
  }, [groupId, groupIdLookup])
  
  const result = groupIdLookup?.[groupId];

  if (!result)
    return null;
  else 
    return result;
}

export function useUser(): User | null {
  const userResult = useSelector((state: AppState) => state.user);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!userResult && isAuthenticated)
      refreshUser(user);
  }, [userResult, isAuthenticated]);

  return userResult;
}

export function setCurrentGroup(id: number | null): void {
  store.dispatch(setCurrentGroupId(id));
}

export function AppStoreProvider(props: any) {
  return <Provider store={store}>
    {props.children}
  </Provider>
}

let palettesRequested = false;
let groupsRequested = false;
export function refreshPalettes(getAccessTokenSilently: Function, loginWithRedirect: Function): Promise<any> {
  if (palettesRequested) {
    return Promise.resolve(null);
  } else {
    palettesRequested = true;
    return getAccessTokenSilently()
      .then(getRequest('/palettes'))
      .then((body: Palette[]) => {
        store.dispatch(setPalettes(body))
      })
      .catch(redirectHomeIfNotLoggedIn(loginWithRedirect))
      .catch(console.error)
      .finally(() => { palettesRequested = false })
  }
}

export function refreshGroups(getAccessTokenSilently: Function, loginWithRedirect: Function): Promise<any> {
  if (groupsRequested) {
    return Promise.resolve(null);
  } else {
    groupsRequested = true;
    return getAccessTokenSilently()
      .then(getRequest('/groups'))
      .then((body: Palette[]) => {
        store.dispatch(setGroups(body));
      })
      .catch(redirectHomeIfNotLoggedIn(loginWithRedirect))
      .catch(console.error)
      .finally(() => { groupsRequested = false })
  }
}

export function refreshUser(user: any): void {
  store.dispatch(setUser(user));
}