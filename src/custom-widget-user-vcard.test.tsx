import React from "react"
import {screen, render} from "@testing-library/react"

import {CustomWidgetUserVcard} from "./custom-widget-user-vcard";

describe("CustomWidgetUserVcard", () => {
    it("should render the component", () => {
        render(<CustomWidgetUserVcard contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
