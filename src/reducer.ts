import React from "react";

const initialState = {
    failed: false,
    won: false,
    attempts: 3,
    dice: generateDefaultDice()
}

export type State = typeof initialState;

export type Action =
    | { type: 'failed', payload: boolean }
    | { type: 'won', payload: boolean }
    | { type: 'attempts/set', payload: number }
    | { type: 'dice/roll', payload?: undefined }
    | { type: 'dice/hold', payload: string }
    | { type: 'dice/set', payload: State['dice'] }


export function reducer(state: typeof initialState, action: Action) {
    const { type, payload } = action

    switch (type) {
        case "failed":
            return {
                ...state,
                failed: payload
            }

        case "won":
            return {
                ...state,
                won: payload
            }

        case "attempts/set": {
            return {
                ...state,
                attempts: payload
            }
        }

        case "dice/set":
            return {
                ...state,
                dice: payload
            }

        case "dice/roll":
            if (state.won || state.failed) {
                return initialState // resetting
            }

            return {
                ...state,
                dice: state.dice.map(die => (die.held ? die : generateNewDie()))
            }

        case "dice/hold": {
            return {
                ...state,
                dice: state.dice.map(die => (die.key === payload ? { ...die, held: !die.held } : die))
            }
        }

        default:
            return state;
    }
}

export function useDiceReducer() {
    return React.useReducer(reducer, initialState)
}

export function generateDefaultDice(length = 10) {
    return Array.from({ length }, () => ({
        key: Math.random().toString().substring(2, 9),
        value: Math.ceil(Math.random() * 6),
        held: false
    }))
}

function generateNewDie() {
    return {
        key: Math.random().toString().substring(2, 9),
        value: Math.ceil(Math.random() * 6),
        held: false
    }
}