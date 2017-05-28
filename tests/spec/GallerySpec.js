import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';

import Gallery from '../../lib/Gallery';

before(() => {
    // Make any warning (like proptype requirements) throw an error
    sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
});

after(() => {
    // Clean up after console hijacking
    console.error.restore()
});

describe("Gallery:", () =>  {
    it("It renders when passing it valid data", () => {
        const VALID_PHOTO_SET = [
            {
                src: 'http://example.com/example/img1.jpg',
                srcset: [
                    'http://example.com/example/img1_1024.jpg 1024w',
                    'http://example.com/example/img1_800.jpg 800w',
                    'http://example.com/example/img1_500.jpg 500w',
                    'http://example.com/example/img1_320.jpg 320w',
                ],
                sizes:[
                    '(min-width: 480px) 50vw',
                    '(min-width: 1024px) 33.3vw',
                    '100vw'
                ],
                width: 681,
                height: 1024,
                alt: 'image 1'
            }
        ];
        const wrapper = shallow(<Gallery photos={VALID_PHOTO_SET} />);
       expect(wrapper.find('.clearfix').length).to.equal(1)
    });
});