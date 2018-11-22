import { ratio } from '../src/utils';
import { round } from '../src/utils';
import { computeSizes } from '../src/utils';
import photos from './test-photo-data';

describe('the round function', () => {
  it('100.12345 to two places', () => expect(round(100.12345,2)).toBe(100.12));  
  it('100.29 to three places', () => expect(round(100.29,1)).toBe(100.3));  
  it('100.9 with no decimals arg', () => expect(round(100.9)).toBe(101));  
});

describe('the ratio function', () => {
  it('width of 3 and height of 4', () => expect(ratio({width:3,height:4})).toBe(0.75));
  it('width of 800 and height of 600', () => expect(ratio({width:800,height:600})).toBe(1.33));
  it('width of 1 and height of 1', () => expect(ratio({width:1,height:1})).toBe(1));
});

describe('the computeSizes function called with 7 images and 3 columns', () => {
	const width = 1138;
	const columns = 3;
	const margin = 2;
	const newPhotos = computeSizes({width, margin, columns, photos});
	const newPhotosNoWidth = computeSizes({width: 0, margin, columns, photos});

	it('width of no length to return empty array', () => expect(newPhotosNoWidth.length).toBe(0));
	it('photos array to be same length', () => expect(newPhotos.length).toBe(photos.length));
	it('1st image width', () => expect(newPhotos[0].width).toBe(370.4));
	it('1st image height', () => expect(newPhotos[0].height).toBe(246.9));
	it('2nd image width', () => expect(newPhotos[1].width).toBe(370.4));
	it('2nd image height', () => expect(newPhotos[1].height).toBe(246.9));
	it('3rd image width', () => expect(newPhotos[2].width).toBe(385.2));
	it('3rd image height', () => expect(newPhotos[2].height).toBe(246.9));
	it('4th image width', () => expect(newPhotos[3].width).toBe(276));
	it('4th image height', () => expect(newPhotos[3].height).toBe(184));
	it('5th image width', () => expect(newPhotos[4].width).toBe(574));
	it('5th image height', () => expect(newPhotos[4].height).toBe(184));
	it('6th image width', () => expect(newPhotos[5].width).toBe(276));
	it('6th image height', () => expect(newPhotos[5].height).toBe(184));
	it('7th image width', () => expect(newPhotos[6].width).toBe(314.3));
	it('7th image height', () => expect(newPhotos[6].height).toBe(212.4));
});
