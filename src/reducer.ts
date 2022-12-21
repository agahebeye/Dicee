import React from "react";


const initialState = {
    failed: false,
    won: false,
    attempts: 3,
    dice: generateDefaultDice()
}

export type Action =
    | { type: 'failed', payload: boolean }
    | { type: 'won', payload: boolean }
    | { type: 'attempts/decrement', payload?: number }
    | { type: 'dice/roll', payload?: undefined }
    | { type: 'dice/hold', payload: string }

export type State = typeof initialState;

export function reducer(state: typeof initialState, action: Action) {
    const { type, payload } = action

    switch (type) {
        case "failed":
            return {
                ...state,
                failed: action.payload
            }

        case "won":
            return {
                ...state,
                won: action.payload
            }

        case "attempts/decrement": {
            return {
                ...state,
                attempts: state.attempts - 1
            }
        }

        case "dice/roll":
            if (state.won || state.failed) {
                return initialState
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

function generateDefaultDice() {
    return Array.from({ length: 10 }, () => ({
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