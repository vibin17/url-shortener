import { API_URL } from "../../http"
import { StyledLink } from "./ClickableLinkStyle"

type props = {
    link: string
    fontSize?: number
    short?: boolean
}

const ClickableLink = ({ link, fontSize = 14, short = false }: props) => {
    return !short? (
        <StyledLink 
            fontSize={fontSize}
            short={false}
            href={link}
        >
            {
                    link
            }
        </StyledLink>
    )
    :
    (
        <StyledLink 
            fontSize={fontSize}
            short={true}
            onClick={(event) => { 
                event.preventDefault()
                navigator.clipboard.writeText((event.target as HTMLAnchorElement).textContent || '')
            }}
        >
            {
                `${API_URL}/s/${link}` 
            }
        </StyledLink>
    )
}

export default ClickableLink