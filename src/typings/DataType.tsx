/* Types */
import { StatesType as CameraStatesType } from './CameraReduxType';
import { StatesType as UIControlStatesType } from './UIControlReduxType';

export declare interface FullStatesType {
  camera: CameraStatesType;
  ui: UIControlStatesType;
}
