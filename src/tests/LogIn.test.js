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

    
    it('On log in with correct data the userID should be 1', () => {
        const wrapper = mount(<LogIn/>);
        const button = wrapper.find('#login-btn').at(0);
        const fakeEvent = { preventDefault: () => console.log('preventDefault') };

        wrapper.setState({username: 'test', password: '123'});
        expect(button.length).toEqual(1);
        button.props().onClick(fakeEvent);
        console.log(wrapper.state());

        expect(wrapper.state('userID')).toEqual(1);
        expect(wrapper.find('#login-btn')).toBeTruthy();

    })
    
    test('Username check', () => {
        wrapper.find('.input').at(0).simulate('change', {target: {name: 'username', value: 'test'}});
        expect(wrapper.state('username')).toEqual('test');

        })

    test('Password check', () => {
        wrapper.find('.input').at(1).simulate('change', {target: {name: 'password', value: '123'}});
        expect(wrapper.state('password')).toEqual('123');
        
        })

    // it('login check with right data',()=>{
    //     wrapper.find('.input').at(0).simulate('change', {target: {name: 'username', value: 'test'}});
    //     wrapper.find('.input').at(1).simulate('change', {target: {name: 'password', value: '123'}});
    //     wrapper.find('.button').at(0).simulate('click');;
    //     expect(wrapper.state(userID)).toBe(1);
    //     })
        
    // it('expectLoginFunction to be called',()=>{
    //     wrapper.find('.input').at(0).simulate('change', {target: {name: 'username', value: 'test'}});
    //     wrapper.find('.input').at(1).simulate('change', {target: {name: 'password', value: '123'}});
    //     wrapper.find('.button').at(0).simulate('click');;
    //     expect(handleClickLogIn()).toHaveBeenCalled();
    //     })

})

