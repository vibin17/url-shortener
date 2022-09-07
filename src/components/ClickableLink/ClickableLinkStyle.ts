import styled from "styled-components";

export const StyledLink = styled.a<{ short: boolean, fontSize: number }>`
    font-size: ${({ fontSize }) => fontSize};
    color: rgb(102, 140, 211);
    text-decoration: none;
    position: relative;

    &:hover {
        text-decoration: underline;
        ${({ short = false }) => short && 
            `color: rgba(0, 0, 0, 0.5);
            text-decoration: none;`}
    }

`