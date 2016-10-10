import React from 'react'
import {shallow} from 'enzyme'
import LinkToHome from '../../../src/components/home/LinkToHome';

function setup() {
    const enzymeWrapper = shallow(<LinkToHome/>);

    return {
        enzymeWrapper
    }
}

describe('components', () => {
    describe('LinkToHome', () => {
        it('should render self and subcomponents', () => {
            const {enzymeWrapper} = setup();

            const linkProps = enzymeWrapper.find('Link').props();
            expect(linkProps.to).toBe("/");

            const buttonProps = enzymeWrapper.find('FlatButton').props();
            expect(buttonProps.label).toBe("< Back To Products");
        });
    });
});