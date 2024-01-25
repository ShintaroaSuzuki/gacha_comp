"use client";

import * as Slider from "@radix-ui/react-slider";
import { useState, useMemo, useReducer, useRef } from "react";
import { thresholds as getThresholds } from "@/utils/thresholds";

const PROBABILITY_INTERVAL = 10;
const DEFAULT_NUMBER_INPUT_VALUE = 10;
const DEFAULT_SLIDER_VALUE = 50;
const MIN_NUMBER_INPUT_VALUE = 2;
const MAX_NUMBER_INPUT_VALUE = 30;
const INF_PROBABILITY = PROBABILITY_INTERVAL;
const SUP_PROBABILITY =
  Math.floor((100 - PROBABILITY_INTERVAL) / PROBABILITY_INTERVAL) *
  PROBABILITY_INTERVAL;

export default function Home() {
  const [sliderValue, setSliderValue] = useState<number>(DEFAULT_SLIDER_VALUE);
  const inputRef = useRef<HTMLInputElement>(null);
  type State = {
    numberInputValue: number;
    isLoading: boolean;
    thresholds?: number[];
    validationError?: string;
  };
  type Action =
    | {
        type: "SET_NUMBER_INPUT_VALUE";
        value: string | undefined;
      }
    | {
        type: "SET_THRESHOLDS";
        value: number[];
      };
  const [
    { numberInputValue, isLoading, thresholds, validationError },
    dispatch,
  ] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "SET_NUMBER_INPUT_VALUE":
          action.value = action.value?.replace(/[０-９]/g, (s: string) => {
            return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
          });
          console.log(action.value);
          if (action.value === "" || isNaN(Number(action.value)))
            return { ...state, validationError: "数字を入力してください" };
          if (Number(action.value) < MIN_NUMBER_INPUT_VALUE)
            return {
              ...state,
              numberInputValue: MIN_NUMBER_INPUT_VALUE,
              isLoading: false,
              validationError: `${MIN_NUMBER_INPUT_VALUE}以上の数字を入力してください`,
            };
          if (Number(action.value) > MAX_NUMBER_INPUT_VALUE)
            return {
              ...state,
              numberInputValue: MAX_NUMBER_INPUT_VALUE,
              isLoading: false,
              validationError: `${MAX_NUMBER_INPUT_VALUE}以下の数字を入力してください`,
            };
          return {
            ...state,
            numberInputValue: Number(action.value),
            isLoading: true,
            validationError: undefined,
          };
        case "SET_THRESHOLDS":
          return { ...state, thresholds: action.value, isLoading: false };
      }
    },
    { numberInputValue: DEFAULT_NUMBER_INPUT_VALUE, isLoading: true }
  );

  const roundedValue = Math.min(
    Math.max(
      Math.round(sliderValue / PROBABILITY_INTERVAL) * PROBABILITY_INTERVAL,
      INF_PROBABILITY
    ),
    SUP_PROBABILITY
  );

  if (isLoading) {
    (async () => {
      const thresholds = await getThresholds(
        numberInputValue,
        PROBABILITY_INTERVAL / 100
      );
      dispatch({ type: "SET_THRESHOLDS", value: thresholds });
    })();
  }

  const thresholdIndex = useMemo(
    () => roundedValue / PROBABILITY_INTERVAL - 1,
    [roundedValue]
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <form>
        <input
          ref={inputRef}
          className="w-24 text-center border px-4 py-2"
          defaultValue={DEFAULT_NUMBER_INPUT_VALUE.toString()}
        />
        <button
          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => {
            console.log(inputRef.current?.value);
            dispatch({
              type: "SET_NUMBER_INPUT_VALUE",
              value: inputRef.current?.value,
            });
          }}
        >
          確定
        </button>
      </form>
      <p className="text-sm mt-2 text-rose-700 h-4">{validationError ?? ""}</p>
      <div className="max-w-md w-full items-center flex flex-col mt-8">
        {isLoading && (
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent absolute"></div>
        )}
        <div className="flex flex-row items-center gap-x-4">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-[200px] h-5"
            defaultValue={[DEFAULT_SLIDER_VALUE]}
            max={100}
            step={1}
            value={[roundedValue]}
            onValueChange={(value) => setSliderValue(value[0])}
          >
            <Slider.Track className="bg-blackA4 relative grow rounded-full h-[3px]">
              <Slider.Range className="absolute bg-violet9 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-violet9 shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-violet10 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA5"
              aria-label="Volume"
            />
          </Slider.Root>
          <span>
            <span className="text-xl tabular-nums font-bold px-1">{`${roundedValue}`}</span>
            %
          </span>
        </div>
        {!isLoading && !validationError && (
          <p className="mt-4">
            <span className="text-3xl tabular-nums font-bold px-2 text-red-500">{`${thresholds?.[thresholdIndex]}`}</span>
            個買えば
            <span className="tabular-nums font-bold px-1">{`${roundedValue}`}</span>
            %の確率でコンプリートできます
          </p>
        )}
      </div>
    </main>
  );
}
