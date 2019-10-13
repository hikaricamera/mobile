// @flow

/* Utils */
import color from 'color';

/* Constants */
import { Colors as PaperColors } from 'react-native-paper';

const CommonColorsMixin = {
  // Common grey colors
  grey1: '#192a32',
  grey2: '#48636f',
  grey3: '#7e9aa6',
  grey4: '#afc7d1',
  grey5: '#d4e3eb',
  grey6: '#f0f5f7',
  grey7: '#f8fafb',
};

const ThemeColorMixin = {
  primary: '#00204a',
  accent: '#005792',
  background: '#00bbf0',
  surface: '#d9faff',
  error: '#f0134d',
  text: PaperColors.black,
  onBackground: '#000000',
  onSurface: '#000000',
  disabled: color(PaperColors.black)
    .alpha(0.26)
    .rgb()
    .string(),
  placeholder: color(PaperColors.black)
    .alpha(0.54)
    .rgb()
    .string(),
  backdrop: color(PaperColors.black)
    .alpha(0.5)
    .rgb()
    .string(),
  notification: PaperColors.pinkA400,
};

export default {
  ...CommonColorsMixin,
  ...ThemeColorMixin,
};
