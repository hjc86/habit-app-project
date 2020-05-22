import React from 'react';
import { shallow, mount, render } from 'enzyme';
import AccountModal from '../components/AccountModal';
import renderer from 'react-test-renderer';
import ReactDOM from "react-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../css/Modal.css';
import AlertMessage from '../components/Alert';
import { BsFillTrashFill, BsCheckCircle } from "react-icons/bs";


describe("<AccountModal />", () => {



    let essentialProps ={
        show: true,
        onHide: false,
        user_id: 1 ,
        updateAccState: null,
        setID: null,
        username: "props user", 
        password: "props password" 
    }
    
    let componentWithProps = <AccountModal {...essentialProps}/>
    let wrapper;

    beforeEach(() => wrapper = mount(componentWithProps));
    beforeEach(() => wrapper.setState({
        data: null,
        message: null,
        variant: null,
        alertShow: false,
        username: "state username",//this.props.username,
        password: "state password" //this.props.password
    }))
  
    it('should render a form is props.username is not null', () => {
        expect(wrapper.find('Form').length).toEqual(1);
    })

    it('should render 1 modal body',() =>{
        expect(wrapper.find('.modal-content').length).toEqual(1)
    })
    
    it('should render two Form.Control',() =>{
        expect(wrapper.find('.form-control').length).toEqual(2)
    })

    it('should render one modal header',() =>{
        expect(wrapper.find('.modal-header').length).toEqual(1)
    })
    
    it('should update username in component state when set by onChange' ,()=>{

        wrapper.find('.form-group').at(1).simulate('change', 
            {
                target: {
                    name: 'username',
                    value: 'test user 2'
                }
            }
        )
     
        
        expect(wrapper.state('username')).toEqual("test user 2")
        
    })

    it('should update password in component state when set by onChange' ,()=>{
    
        wrapper.find('.form-group').at(2).simulate('change', 
            {
                target: {
                    name: 'password',
                    value: 'test password 2'
                }
            }
        )

        expect(wrapper.state('password')).toEqual("test password 2")
    })

    it('should handleClickDelete' ,()=>{
    
        window.confirm = jest.fn().mockImplementation(() => true)
        window.prompt= jest.fn().mockImplementation(() => true)
        wrapper.find('.btn-danger').simulate('click')
        wrapper.update()
        
        expect(window.confirm).toHaveBeenCalled()
        expect(window.prompt).toHaveBeenCalled()
    })

    it('should handleSubmit()' ,(done)=>{
        // https://medium.com/@rishabhsrao/mocking-and-testing-fetch-with-jest-c4d670e2e167
        
        const mockSuccessResponse = {
  
            errorMessage:"we are testing for error"
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
        });
        
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4

        wrapper.find('.btn-primary').simulate('click')

       
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith("http://localhost:3001/users", 
        {"body": 
            "{\"id\":1,\"username\":\"state username\",\"password\":\"state password\"}", 
            "headers": {"Content-Type": "application/json"}, 
            "method": "put"
        }
        );

        process.nextTick(() => { // 6
            expect(wrapper.state('message')).toEqual(
                "we are testing for error"
   
            );
      
            global.fetch.mockClear(); // 7
            done(); // 8
        });
    
    })

})