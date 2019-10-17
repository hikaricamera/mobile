/* Utils */
import color from 'color';

/* Constants */
import { Colors as PaperColors } from 'react-native-paper';

const CommonColorsMixin = {
  // Common grey colors
  grey1: '#192a33',
  grey2: '#486370',
  grey3: '#7e9aa7',
  grey4: '#afc7d2',
  grey5: '#d4e3ec',
  grey6: '#f0f5f8',
  grey7: '#f8fafc',
};

const ThemeColorMixin = {
  primary: '#00204a',
  accent: '#005792',
  background: '#00bbf0',
  surface: '#d9faff',
  error: '#f0134d',
  text: PaperColors.black,
  onBackground: PaperColors.black,
  onSurface: PaperColors.black,
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
