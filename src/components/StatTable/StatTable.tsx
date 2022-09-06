import { useMemo } from "react"
import { API_URL } from "../../http"
import { LinkResponse } from "../../models/models"
import { Cell, ColumnHead, Link, Table } from "./StatTableStyle"

type props = {
    links: LinkResponse[]
}

const StatTable = ({ links }: props) => {
    const linksInfo = useMemo(() => {
        const result = links.map((link, index) => (
            <>
                <Cell key={index}>
                    <Link href={`${API_URL}/s/${link.short}`}> 
                        {`${API_URL}/s/${link.short}`} 
                    </Link>
                </Cell>
                <Cell key={index}> 
                    <Link href={link.target}>
                        {link.target}
                    </Link>
                </Cell>
                <Cell key={index} align='center'>
                    {link.counter}
                </Cell>
            </>
        ))
        return result
    }, [links])
    return (
        <Table> 
            <ColumnHead>
                Сокращенная ссылка
            </ColumnHead>
            <ColumnHead>
                Исходная ссылка
            </ColumnHead>
            <ColumnHead>
                Переходов
            </ColumnHead>
            {linksInfo}
        </Table>
    )
}

export default StatTable