/**
 * Typed Redux hooks pre-bound to the app's store types.
 * Use these instead of the plain useDispatch and useSelector hooks.
 */

import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
