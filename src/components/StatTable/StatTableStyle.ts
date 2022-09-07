import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import styled, { css } from "styled-components";
import shared from "../../styles/shared";

export const Table = styled.div`
    width: 100%;
`

export const Row = styled.div`
    width: 100%;
    display: grid;
    grid: none / 30% 52% 18%;
`

export const Cell = styled.div<{ align?: string }>`
    font-size: 14px;
    padding: 20px 10px;
    display: flex;
    justify-content: ${({align = 'flex-start'}) => align};
    align-items: center;
    outline: solid 1px rgba(0, 0, 0, 0.3);
    max-height: 125px;
    overflow: auto;
    word-break: break-all;
`

export const ColumnHead = styled(Cell)`
    ${shared.transition200ms}
    justify-content: center;
    gap: 5px;
    font-size: 16px;
    cursor: default;
    &:hover {
        color: rgba(0, 0, 0, 0.7)
    }
`

export const SortSymbol = styled.div`
    ${shared.transition200ms}
    ${shared.hoverInvert}
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Arrow = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
`

export const ArrowDesc = styled(AiOutlineArrowDown)`
    ${Arrow}
`

export const ArrowAsc = styled(AiOutlineArrowUp)`
    ${Arrow}
`

//ARROWS REVERSED 