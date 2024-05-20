import {
    amber, blue,
    blueGrey,
    brown,
    cyan,
    deepOrange,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow
} from '@mui/material/colors';
import { map } from 'lodash';

export const colorsArray = [
    amber,
    blue,
    blueGrey,
    brown,
    cyan,
    deepOrange,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow,
];
export const colors = map(colorsArray, (colorItem: Record<number,string>) => ({
    light: colorItem[100],
    main: colorItem[500],
    dark: colorItem[900],
    contrastText: '#fff'
})) 