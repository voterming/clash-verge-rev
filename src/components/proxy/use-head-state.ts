<<<<<<< HEAD
import { useCallback, useEffect, useReducer } from 'react'

import { useProfiles } from '@/hooks/use-profiles'

import { ProxySortType } from './use-filter-sort'

export interface HeadState {
  open?: boolean
  showType: boolean
  sortType: ProxySortType
  filterText: string
  filterMatchCase?: boolean
  filterMatchWholeWord?: boolean
  filterUseRegularExpression?: boolean
  textState: 'url' | 'filter' | null
  testUrl: string
}

type HeadStateStorage = Record<string, Record<string, HeadState>>

const HEAD_STATE_KEY = 'proxy-head-state'
=======
import { useCallback, useEffect, useState } from "react";
import { ProxySortType } from "./use-filter-sort";
import { useProfiles } from "@/hooks/use-profiles";

export interface HeadState {
  open?: boolean;
  showType: boolean;
  sortType: ProxySortType;
  filterText: string;
  textState: "url" | "filter" | null;
  testUrl: string;
}

type HeadStateStorage = Record<string, Record<string, HeadState>>;

const HEAD_STATE_KEY = "proxy-head-state";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
export const DEFAULT_STATE: HeadState = {
  open: false,
  showType: true,
  sortType: 0,
<<<<<<< HEAD
  filterText: '',
  filterMatchCase: false,
  filterMatchWholeWord: false,
  filterUseRegularExpression: false,
  textState: null,
  testUrl: '',
}

type HeadStateAction =
  | { type: 'reset' }
  | { type: 'replace'; payload: Record<string, HeadState> }
  | { type: 'update'; groupName: string; patch: Partial<HeadState> }

function headStateReducer(
  state: Record<string, HeadState>,
  action: HeadStateAction,
): Record<string, HeadState> {
  switch (action.type) {
    case 'reset':
      return {}
    case 'replace':
      return action.payload
    case 'update': {
      const prev = state[action.groupName] || DEFAULT_STATE
      return { ...state, [action.groupName]: { ...prev, ...action.patch } }
    }
    default:
      return state
  }
}

export function useHeadStateNew() {
  const { profiles } = useProfiles()
  const current = profiles?.current || ''

  const [state, dispatch] = useReducer(headStateReducer, {})

  useEffect(() => {
    try {
      const data = JSON.parse(
        localStorage.getItem(HEAD_STATE_KEY)!,
      ) as HeadStateStorage

      const value = data[current] || {}

      if (value && typeof value === 'object') {
        dispatch({ type: 'replace', payload: value })
      } else {
        dispatch({ type: 'reset' })
      }
    } catch {
      dispatch({ type: 'reset' })
    }
  }, [current])

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const item = localStorage.getItem(HEAD_STATE_KEY)

        let data = (item ? JSON.parse(item) : {}) as HeadStateStorage

        if (!data || typeof data !== 'object') data = {}

        data[current] = state

        localStorage.setItem(HEAD_STATE_KEY, JSON.stringify(data))
      } catch {}
    })

    return () => clearTimeout(timer)
  }, [state, current])

  const setHeadState = useCallback(
    (groupName: string, obj: Partial<HeadState>) => {
      dispatch({ type: 'update', groupName, patch: obj })
    },
    [],
  )

  return [state, setHeadState] as const
=======
  filterText: "",
  textState: null,
  testUrl: "",
};

export function useHeadStateNew() {
  const { profiles } = useProfiles();
  const current = profiles?.current || "";

  const [state, setState] = useState<Record<string, HeadState>>({});

  useEffect(() => {
    if (!current) {
      setState({});
      return;
    }

    try {
      const data = JSON.parse(
        localStorage.getItem(HEAD_STATE_KEY)!
      ) as HeadStateStorage;

      const value = data[current] || {};

      if (value && typeof value === "object") {
        setState(value);
      } else {
        setState({});
      }
    } catch {}
  }, [current]);

  const setHeadState = useCallback(
    (groupName: string, obj: Partial<HeadState>) => {
      setState((old) => {
        const state = old[groupName] || DEFAULT_STATE;
        const ret = { ...old, [groupName]: { ...state, ...obj } };

        // 保存到存储中
        setTimeout(() => {
          try {
            const item = localStorage.getItem(HEAD_STATE_KEY);

            let data = (item ? JSON.parse(item) : {}) as HeadStateStorage;

            if (!data || typeof data !== "object") data = {};

            data[current] = ret;

            localStorage.setItem(HEAD_STATE_KEY, JSON.stringify(data));
          } catch {}
        });

        return ret;
      });
    },
    [current]
  );

  return [state, setHeadState] as const;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}
