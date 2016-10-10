import React from 'react'
import {shallow} from 'enzyme'
import {Home} from '../../../src/components/home/Home';

function setupWithoutProducts() {
    const products = {};
    const enzymeWrapper = shallow(<Home products={products} />);

    return {
        enzymeWrapper
    }
}

function setupWithProducts() {
    const products = {
        "123456": {
            product_no: "123456",
            name: "Product 1",
            price_in_cents: 1250,
            image_thumb_url: "http://example.com"
        },
        "123457": {
            product_no: "123457",
            name: "Product 2",
            price_in_cents: 1250,
            image_thumb_url: "http://example.com"
        },
        "123458": {
            product_no: "123458",
            name: "Product 3",
            price_in_cents: 1250,
            image_thumb_url: "http://example.com"
        }
    };

    const enzymeWrapper = shallow(<Home products={products} />);

    return {
        enzymeWrapper
    }
}

describe('components', () => {
    describe('Home', () => {
        it('should render self and subcomponents', () => {
            const {enzymeWrapper} = setupWithProducts();

            expect(enzymeWrapper.find('div').hasClass('home-container')).toBe(true);
            expect(enzymeWrapper.find('ProductTile').length).toBe(3);
        });

        it('should render a loader when no products are available', () => {
            const {enzymeWrapper} = setupWithoutProducts();

            expect(enzymeWrapper.find('div').hasClass('home-container')).toBe(true);
            expect(enzymeWrapper.find('ProductTile').length).toBe(0);
            expect(enzymeWrapper.find('SnailLoader').length).toBe(1);
        })
    });
});