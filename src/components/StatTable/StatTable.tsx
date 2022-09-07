import { useMemo } from "react"
import { LinkResponse } from "../../models/models"
import ClickableLink from "../ClickableLink/ClickableLink"
import { Cell, ColumnHead, Row, Table } from "./StatTableStyle"

type props = {
    links: LinkResponse[]
}

const StatTable = ({ links }: props) => {
    const linksInfo = useMemo(() => {
        const result = links.map((link, index) => (
            <Row key={index}>
                <Cell>
                    <ClickableLink link={link.short} short/>

                </Cell>
                <Cell> 
                    <ClickableLink link={link.target}/>
                </Cell>
                <Cell align='center'>
                    {link.counter}
                </Cell>
            </Row>
        ))
        return result
    }, [links])
    return (
        <Table>
            <Row>
                <ColumnHead>
                    Сокращенная ссылка
                </ColumnHead>
                <ColumnHead>
                    Исходная ссылка
                </ColumnHead>
                <ColumnHead>
                    Переходов
                </ColumnHead>
            </Row>
            {linksInfo}
        </Table>
    )
}

export default StatTable