import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state ", () => {
        const component = create(<ProfileStatus status="My status" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("My status");
    });
    test("after creation 'span' should be displayed", () => {
        const component = create(<ProfileStatus status="My status" />);
        const root = component.root;
        const span = root.findByType('span')
        expect(span).not.toBeNull();
    });
    test("after creation 'input' shouldn't be displayed", () => {
        const component = create(<ProfileStatus status="My status" />);
        const root = component.root;
        expect(()=>{
            const input = root.findByType('input')
        }).toThrow();
    });
    test("after creation 'span' should be displayed", () => {
        const component = create(<ProfileStatus status="My status" />);
        const root = component.root;
        const span = root.findByType('span')
        expect(span.children[0]).toBe('My status');
    });
    test("input should be displayed", () => {
        const component = create(<ProfileStatus status="My status" />);
        const root = component.root;
        const span = root.findByType('span')
        span.props.onDoubleClick()
        const input = root.findByType('input')
        expect(input.props.value).toBe('My status');
    });
});