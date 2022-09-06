import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import shared from "../../styles/shared"

export const StyledHeader = styled.header`
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center ;
`

export const Fragment = css`
    ${shared.plainButton}
    height: 100%;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #242424;
    font: normal 20px 'Rubik';
    flex: 0 0 25%;
`

export const TextBlock = styled.div`
    ${Fragment}
    cursor: default;
`

export const Button = styled.button`
    ${Fragment}
    ${shared.transition200ms}
    ${shared.hoverInvert}
`

export const LinkButton = styled(Link)`
    ${Fragment}
    ${shared.transition200ms}
    ${shared.hoverInvert}
`

export const Logo = styled(LinkButton)`
    font: bold 34px 'Rubik';
    flex: 1 0 50%;
`