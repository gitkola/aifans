import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppState, AppDispatch } from "@/redux/store";
import { useRef } from "react";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatchRef = () => {
  const dispatchRef = useRef<AppDispatch | null>(null);
  dispatchRef.current = useAppDispatch();
  return dispatchRef.current;
};

export const useAppSelectorRef = (fn: (state: AppState) => AppState) => {
  const stateRef = useRef<AppState | null>(null);
  stateRef.current = useAppSelector(fn);
  return stateRef.current;
};
