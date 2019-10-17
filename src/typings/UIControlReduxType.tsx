/* Actions */
import { setStatusBarHeight } from '../actions/UIControlAction';

export type ActionsType = ReturnType<typeof setStatusBarHeight>;

export declare interface StatesType {
  statusBarHeight: number;
}
