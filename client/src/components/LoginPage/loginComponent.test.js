import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import sinon from "sinon";

import {LoginComponent} from './loginComponent'

test('Testing login form component',async () => {
    const mockHandleClick = sinon.spy(e => e.preventDefault())
    userEvent.setup()
    render(<LoginComponent handleSubmitLogin={mockHandleClick} />)

    const userNameField = screen.getByPlaceholderText('username')
    const passwordField = screen.getByPlaceholderText('password')
    const submitBtn = await screen.findAllByText('Login')

    await fireEvent.change(userNameField, {target: {value: 'user'}})
    await fireEvent.change(passwordField, {target: {value: 12345}})
    await userEvent.click(submitBtn[0])

    // ASSERT
    expect(userNameField).toBeInTheDocument()
    expect(passwordField).toBeInTheDocument()
    sinon.assert.calledOnce(mockHandleClick);
});



