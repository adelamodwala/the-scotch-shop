import React from 'react'
import {shallow} from 'enzyme'
import ProductPage from '../../../src/components/products/ProductPage';

function setupWithFetching() {
    const props = {
        addItemToCart: jest.fn(),
        productId: "123456",
        fetchedProducts: false
    };

    const enzymeWrapper = shallow(<ProductPage {...props}/>);

    return {
        enzymeWrapper
    }
}

function setupWithNoProduct() {

    const props = {
        addItemToCart: jest.fn(),
        productId: "123456",
        fetchedProducts: true
    };

    const enzymeWrapper = shallow(<ProductPage {...props}/>);

    return {
        enzymeWrapper
    }
}

function setupWithProduct() {
    const props = {
        addItemToCart: jest.fn(),
        product: {
            product_no: "123456",
            name: "Product 1",
            price_in_cents: 1250,
            image_url: "http://example.com",
            tags: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        productId: "123456",
        fetchedProducts: true
    };

    const enzymeWrapper = shallow(<ProductPage {...props}/>);

    return {
        props,
        enzymeWrapper
    }
}

describe('components', () => {
    describe('ProductPage', () => {
        it('should render loader while fetching products', () => {
            const {enzymeWrapper} = setupWithFetching();
            expect(enzymeWrapper.find('LinkToHome').length).toBe(1);
            expect(enzymeWrapper.find('Card').length).toBe(1);
            expect(enzymeWrapper.find('Snackbar').length).toBe(1);

            expect(enzymeWrapper.find('div SnailLoader').length).toBe(1);

        });

        it('should render a not found message when product does not exist', () => {
            const {enzymeWrapper} = setupWithNoProduct();
            expect(enzymeWrapper.find('LinkToHome').length).toBe(1);
            expect(enzymeWrapper.find('Card').length).toBe(1);
            expect(enzymeWrapper.find('Snackbar').length).toBe(1);

            expect(enzymeWrapper.find('CardTitle').props().title).toBe("This product is unavailable.");
        });

        it('should render product information correclty', () => {
            const {props, enzymeWrapper} = setupWithProduct();
            expect(enzymeWrapper.find('LinkToHome').length).toBe(1);
            expect(enzymeWrapper.find('Card').length).toBe(1);
            expect(enzymeWrapper.find('Snackbar').length).toBe(1);

            expect(enzymeWrapper.find('CardTitle').length).toBe(2);
            expect(enzymeWrapper.find('CardTitle').at(0).props().title).toBe(props.product.name);
            expect(enzymeWrapper.find('CardTitle').at(1).props().title).toBe("$" + props.product.price_in_cents / 100.0);

            expect(enzymeWrapper.find('CardMedia img').props().src).toBe(props.product.image_url);
            expect(enzymeWrapper.find('CardText .product-description').text()).toBe(props.product.tags + ".");

            expect(enzymeWrapper.find('CardActions').hasClass("single-row")).toBe(true);
            expect(enzymeWrapper.find('CardActions TextField').length).toBe(1);

            let addButton = enzymeWrapper.find('CardActions RaisedButton');
            expect(addButton.length).toBe(1);
        });

        it('should trigger add to cart for happy path', () => {
            const {props, enzymeWrapper} = setupWithProduct();
            expect(typeof enzymeWrapper.instance().handleAddToCart).toBe("function");

            expect(props.addItemToCart.mock.calls.length).toBe(0);
            enzymeWrapper.instance().handleAddToCart(2);
            expect(props.addItemToCart.mock.calls.length).toBe(1);
        });

        it('should not trigger add to cart for 0 or negative values', () => {
            const {props, enzymeWrapper} = setupWithProduct();
            expect(typeof enzymeWrapper.instance().handleAddToCart).toBe("function");

            expect(props.addItemToCart.mock.calls.length).toBe(0);
            enzymeWrapper.instance().handleAddToCart(0);
            expect(props.addItemToCart.mock.calls.length).toBe(0);
            enzymeWrapper.instance().handleAddToCart(-4);
            expect(props.addItemToCart.mock.calls.length).toBe(0);
        });
    });
});