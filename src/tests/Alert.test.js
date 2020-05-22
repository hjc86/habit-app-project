import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import AlertMessage from '../components/Alert';
import Alert from 'react-bootstrap/Alert'


describe('AlertMessage', () => {
    it('renders bootstrap alert if show="true"', () =>{
        const wrapper = mount(<AlertMessage message={"Test alert message"} show={"true"}/>)
        expect(wrapper.find('#alert').exists()).toBe(true);
        
    })
})
