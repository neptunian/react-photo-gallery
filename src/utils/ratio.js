import { round } from './round';

// return two decimal places rounded number
export const ratio = ({ width, height }) => round(width / height, 2);
