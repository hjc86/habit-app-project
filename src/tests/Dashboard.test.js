import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import Dashboard from '../containers/Dashboard';


describe('Dashboard', () => {

    // let wrapper;
    // beforeEach(() => {
    //     wrapper = shallow(<Dashboard/>)
    // })

    // it('renders spinner animation', () => {
    //     expect(wrapper.find('.spinner')).toBe(true);
    // })

    it('renders navbar', () => {
        const wrapper = shallow(<Dashboard/>)
        expect(wrapper.find('Navbar')).toEqual(1);
    })

    






})