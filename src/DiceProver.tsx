import React from "react";
import { useDiceReducer } from "./reducer";
import type { Action } from "./reducer";

type DiceProviderProps = {
  children: React.ReactNode;
};

export type DiceContextType = {
  state: {
    failed: boolean;
    won: boolean;
    attempts: number;
    dice: { key: string; value: number; held: boolean }[];
  };
  dispatch: React.Dispatch<Action>;
};

export const DiceContext = React.createContext<DiceContextType | undefined>(
  undefined
);

export function DiceProvider(props: DiceProviderProps) {
  const [state, dispatch] = useDiceReducer();

  return (
    <DiceContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DiceContext.Provider>
  );
}

export function useDice() {
  return React.useContext(DiceContext) as DiceContextType;
}
