import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import sinon from "sinon";

import {SignUpComponent} from './signUpComponent'

test('Testing signup form component',async () => {
    const mockHandleClick = sinon.spy(e => e.preventDefault())
    userEvent.setup()
    render(<SignUpComponent handleSubmitSignup={mockHandleClick} isSignUpSuccess={false}/>)

    const userNameField = screen.getByPlaceholderText('username')
    const passwordField = screen.getByPlaceholderText('password')
    const successBage = screen.queryByTestId('successBage')
    const submitBtn = await screen.findAllByText('SignUp')

    await fireEvent.change(userNameField, {target: {value: 'user'}})
    await fireEvent.change(passwordField, {target: {value: 12345}})
    await userEvent.click(submitBtn[0])

    // ASSERT
    expect(userNameField).toBeInTheDocument()
    expect(passwordField).toBeInTheDocument()
    expect(successBage).not.toBeInTheDocument()
    sinon.assert.calledOnce(mockHandleClick);
});

test('Testing signup form component show success bage',async () => {
    const mockHandleClick = sinon.spy(e => e.preventDefault())
    userEvent.setup()
    render(<SignUpComponent handleSubmitSignup={mockHandleClick} isSignUpSuccess={true}/>)

    const successBage = screen.queryByTestId('successBage')

    // ASSERT
    expect(successBage).toBeInTheDocument()
});



