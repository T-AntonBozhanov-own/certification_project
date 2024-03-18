import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import sinon from "sinon";

import {HeaderComponent} from './headerComponent'

test('Testing header component',async () => {
    const mockHandleClick = sinon.spy(e => e.preventDefault())
    userEvent.setup()
    render(<HeaderComponent
        name='user'
        handleClick={mockHandleClick}
    />)


    const userName = screen.getByText('Hello user')
    const logoutButton = screen.getByText('Logout')
    const logo = await screen.findByAltText('Logo')

    await logoutButton.click()

    // ASSERT
    expect(userName).toHaveTextContent('Hello user')
    expect(logo).toBeInTheDocument()
    sinon.assert.calledOnce(mockHandleClick)
});


