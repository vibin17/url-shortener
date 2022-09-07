import styled from "styled-components";

export const Table = styled.div`
    width: 100%;
`

export const Row = styled.div`
    width: 100%;
    display: grid;
    grid: none / 30% 55% 15%;
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
    justify-content: center;
    font-size: 16px;
`
