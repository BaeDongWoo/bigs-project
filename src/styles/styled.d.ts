import 'styled-components';
import { AppTheme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      desktop: string;
      tablet: string;
      mobile: string;
    };
  }
}
