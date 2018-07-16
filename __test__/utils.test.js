import { ratio } from '../src/utils';
import { round } from '../src/utils';
import { computeSizes } from '../src/utils';
import photos from './test-photo-data';

describe('the round function', () => {
  test('100.12345 to two places', () => expect(round(100.12345,2)).toBe(100.12));  
  test('100.29 to three places', () => expect(round(100.29,1)).toBe(100.3));  
  test('100.9 with no decimals arg', () => expect(round(100.9)).toBe(101));  
});

describe('the ratio function', () => {
  test('width of 3 and height of 4', () => expect(ratio({width:3,height:4})).toBe(0.75));
  test('width of 800 and height of 600', () => expect(ratio({width:800,height:600})).toBe(1.33));
  test('width of 1 and height of 1', () => expect(ratio({width:1,height:1})).toBe(1));
});

describe('the computeSizes function called with 7 images and 3 columns', () => {
	const clientWidth = 1138;
	const columns = 3;
	const margin = 2;
	const newPhotos = computeSizes({clientWidth, margin, columns, photos});
	const newPhotosNoWidth = computeSizes({clientWidth: 0, margin, columns, photos});

	test('width of no length to return empty array', () => expect(newPhotosNoWidth.length).toBe(0));
	test('photos array to be same length', () => expect(newPhotos.length).toBe(photos.length));
	test('1st image width', () => expect(newPhotos[0].width).toBe(370.4));
	test('1st image height', () => expect(newPhotos[0].height).toBe(246.9));
	test('2nd image width', () => expect(newPhotos[1].width).toBe(370.4));
	test('2nd image height', () => expect(newPhotos[1].height).toBe(246.9));
	test('3rd image width', () => expect(newPhotos[2].width).toBe(385.2));
	test('3rd image height', () => expect(newPhotos[2].height).toBe(246.9));
	test('4th image width', () => expect(newPhotos[3].width).toBe(276));
	test('4th image height', () => expect(newPhotos[3].height).toBe(184));
	test('5th image width', () => expect(newPhotos[4].width).toBe(574));
	test('5th image height', () => expect(newPhotos[4].height).toBe(184));
	test('6th image width', () => expect(newPhotos[5].width).toBe(276));
	test('6th image height', () => expect(newPhotos[5].height).toBe(184));
	test('7th image width', () => expect(newPhotos[6].width).toBe(378));
	test('7th image height', () => expect(newPhotos[6].height).toBe(255.4));
});
