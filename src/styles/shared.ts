import styled, { css } from "styled-components";

const shared = {
    plainButton: css`
        display: block;
        border: 0;
        outline: 0;
        background: none;
        cursor: pointer;
    `,
    transition200ms: css`
        transition: all .2s;
    `,
    hoverInvert: css`
        &:hover {
            filter: invert(20%);
        }
    `,
    disabled: css`
        cursor: disabled;
        background: rgba(0, 0, 0, 0.2);
    `
}

export default shared