import React from 'react'
import {shallow} from 'enzyme'
import ProductTile from '../../../src/components/products/ProductTile';

function setup() {
    const product = {
        product_no: "123456",
        name: "Product 1",
        price_in_cents: 1250,
        image_thumb_url: "http://example.com"
    };

    const enzymeWrapper = shallow(<ProductTile product={product} />);

    return {
        product,
        enzymeWrapper
    }
}


describe('components', () => {
    describe('ProductTile', () => {
        it('should render self and subcomponents', () => {
            const {product, enzymeWrapper} = setup();

            expect(enzymeWrapper.find('Card').length).toBe(1);

            expect(enzymeWrapper.find('CardHeader').length).toBe(1);
            const cardHeaderProps = enzymeWrapper.find('CardHeader').props();
            expect(cardHeaderProps.title).toBe(product.name);
            expect(cardHeaderProps.subtitle).toBe("$" + (product.price_in_cents / 100.0));

            expect(enzymeWrapper.find('CardMedia img').props().src).toBe(product.image_thumb_url);

            expect(enzymeWrapper.find('Link').props().to).toBe(`/products/${product.product_no}`);
            expect(enzymeWrapper.find('Link RaisedButton').length).toBe(1);
        });
    });
});