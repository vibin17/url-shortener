import { useMemo } from "react"
import { LinkResponse } from "../../models/models"
import ClickableLink from "../ClickableLink/ClickableLink"
import { SortSymbol, Cell, ColumnHead, Row, Table, ArrowDesc, ArrowAsc } from "./StatTableStyle"

export enum sortModes {
    ASC_SHORT = 'asc_short',
    ASC_TARGET = 'asc_target',
    ASC_COUNTER = 'asc_counter',
    DESC_SHORT = 'desc_short',
    DESC_TARGET = 'desc_target',
    DESC_COUNTER = 'desc_counter'
}

const sortGroups = [
    [sortModes.ASC_SHORT, sortModes.DESC_SHORT], // 0 - short
    [sortModes.ASC_TARGET, sortModes.DESC_TARGET], // 1 - target
    [sortModes.ASC_COUNTER, sortModes.DESC_COUNTER] // 2 - counter
]

type props = {
    links: LinkResponse[],
    sortMode: sortModes,
    setSortMode: (mode: sortModes) => void
}

const StatTable = ({ links, sortMode, setSortMode }: props) => {
    const toggleSort = (sortGroup: sortModes[]) => {
        if (sortMode === sortGroup[0]) {
            setSortMode(sortGroup[1])
            return
        }
        setSortMode(sortGroup[0])
    }
    const linksInfoRows = useMemo(() => {
        if (links.length === 0) {
            return [(
                <Row key={0}>
                    {[...Array(3)].map((v, index) => (
                        <Cell key={index} align="center">
                        -
                        </Cell>))}
                </Row>
            )]
        }
        let sortGroupIndex = 0 
        sortGroups.forEach((group, index) => {
            if (group.includes(sortMode)) {
                sortGroupIndex = index
            }
        })
        let ascendingSort = sortGroups[sortGroupIndex][0] === sortMode ////?

        links.sort((a, b) => {
            let factor = ascendingSort? 1 : -1
            if (sortGroupIndex === 0) {
                return factor * (a.short > b.short ? 1 : -1)
            }
            if (sortGroupIndex === 1) {
                return factor * (a.target > b.target ? 1 : -1)
            }
            if (sortGroupIndex === 2) {
                return factor * (a.counter - b.counter)
            }
            return 0;
        })
        const result = links.map((link, index) => (
            <Row key={index}>
                <Cell>
                    <ClickableLink link={link.short} short/>
                </Cell>
                <Cell> 
                    <ClickableLink link={link.target}/>
                </Cell>
                <Cell align="center">
                    {link.counter}
                </Cell>
            </Row>
        ))
        return result
    }, [links, sortMode])
    return (
        <Table>
            <Row>
                <ColumnHead onClick={() => {
                    toggleSort(sortGroups[0])
                }}>
                    Сокращенная ссылка
                    <SortSymbol>
                        {sortMode === sortModes.ASC_SHORT &&
                        <ArrowDesc/>
                        }
                        {sortMode === sortModes.DESC_SHORT &&
                        <ArrowAsc/>
                        }
                    </SortSymbol>
                </ColumnHead>
                <ColumnHead onClick={() => {
                    toggleSort(sortGroups[1])
                }}>
                    Исходная ссылка
                    <SortSymbol>
                        {sortMode === sortModes.ASC_TARGET &&
                        <ArrowDesc/>
                        }
                        {sortMode === sortModes.DESC_TARGET &&
                        <ArrowAsc/>
                        }
                    </SortSymbol>
                </ColumnHead>
                <ColumnHead onClick={() => {
                    toggleSort(sortGroups[2])
                }}>
                    Переходы
                    <SortSymbol>
                        {sortMode === sortModes.ASC_COUNTER &&
                        <ArrowDesc/>
                        }
                        {sortMode === sortModes.DESC_COUNTER &&
                        <ArrowAsc/>
                        }
                    </SortSymbol>
                </ColumnHead>
            </Row>
            {linksInfoRows}
        </Table>
    )
}

export default StatTable