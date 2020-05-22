import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import LogIn from '../components/LogIn';


describe('LogIn', () => {

    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<LogIn/>)
    })

    it('renders title', ()=>{
        expect(wrapper.find('HabitChecker')).toBeTruthy();
    })

    it('renders login form', () => {
        expect(wrapper.find('.form').exists()).toBe(true);
    })
  

    test('Username check', () => {
        wrapper.find('.input').at(0).simulate('change', {target: {name: 'username', value: 'test'}});
        expect(wrapper.state('username')).toEqual('test');

        })

    test('Password check', () => {
        wrapper.find('.input').at(1).simulate('change', {target: {name: 'password', value: '123'}});
        expect(wrapper.state('password')).toEqual('123');
        
        })


})

