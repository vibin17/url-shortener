import { useContext } from "react"
import { AuthContext, defaultContextValue } from "../../context/auth-context"
import ApiService from "../../services/api-service"
import { Container } from "../../styles/container"
import { StyledHeader, LinkButton, Logo, TextBlock, Button } from "./HeaderStyle"

const Header = () => {
    let context = useContext(AuthContext)

    return (
        <StyledHeader>
            <Container style={{
                justifyContent: "space-between"
            }}>
                {!context?.value.isSignedIn? 
                <>
                    <LinkButton to='/signin'>
                        Войти
                    </LinkButton>
                    <Logo to='/'>
                        URL Shortener
                    </Logo>
                    <LinkButton to='/signup'>
                        Создать аккаунт
                    </LinkButton>
                </>
                :
                <>
                    <TextBlock>
                       {context?.value.username}
                    </TextBlock>
                    <Logo to='/'>
                        URL Shortener
                    </Logo>
                    <Button onClick={() => {
                        context?.setValue(defaultContextValue)
                        localStorage.removeItem('access_token')
                        window.location.reload()
                    }}>
                        Выйти
                    </Button>
                </>
                }
            </Container>
        </StyledHeader>
    )
}

export default Header