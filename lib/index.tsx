import React from "react";

export type TypeUseStateHook<State> = () => [
  State,
  <Key extends keyof State>(state: State | Pick<State, Key> | null) => void
];

type InitParam<State> = {
  defaultState: State;
};

type PropsProvider = {
  children: React.ReactNode;
};

export default function initStateHook<State>(params: InitParam<State>) {
  const { defaultState } = params;

  const initValue: any = [defaultState, (_: any) => {}];
  const Context = React.createContext(initValue);

  const StateProvider = (props: PropsProvider) => {
    const _reducer = (state: State = defaultState, newState: any) => ({
      ...state,
      ...newState
    });

    const [state, dispatcher] = React.useReducer(_reducer, defaultState);
    const setState = (state: any) => dispatcher(state);
    return (
      <Context.Provider value={[state, setState]}>
        {props.children}
      </Context.Provider>
    );
  };

  function useStateHook(): [
    State,
    <Key extends keyof State>(state: Pick<State, Key> | State | null) => void
  ] {
    const ctx = React.useContext(Context);
    return [ctx[0], ctx[1]];
  }

  return {
    StateProvider,
    useStateHook
  };
}
