import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import AlertMessage from '../components/Alert';
import Alert from 'react-bootstrap/Alert'


describe('AlertMessage', () => {
    it('renders bootstrap alert', () =>{
        const wrapper = shallow(<AlertMessage/>)
        expect(wrapper.find('Alert')).toEqual(1);
    })
})
