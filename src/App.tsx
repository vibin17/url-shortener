import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';
import { AuthContext, AuthContextValue, defaultContextValue } from './context/auth-context';
import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import { Container } from './styles/container';
import Footer from './components/Footer/Footer';
import ApiService from './services/api-service';
// http://79.143.31.216/register?username=uuuser123&password=123456

const StyledApp = styled.div`
  background-color: rgb(242, 242, 242);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Main = styled.main`
  padding: 30px 0;
  flex: 1 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

function App() {
  let [authState, setAuthState] = useState<AuthContextValue>(defaultContextValue)
  useEffect(() => {
    //BAD
    (async () => {
      const username = localStorage.getItem('username')
      const password = localStorage.getItem('password')
      if (username && password) {
        try {
          const response = await ApiService.SignIn({
            username, password
          })
          setAuthState({
            isSignedIn: true, username
          })
          localStorage.setItem('access_token', response.data.access_token)
        }
        catch {
          setAuthState(defaultContextValue)
          localStorage.removeItem('access_token')
          localStorage.removeItem('username')
          localStorage.removeItem('password')
        }
      }
    })()
  }, [])

  return (
    <BrowserRouter>
      <StyledApp>
        <AuthContext.Provider value={{value: authState, setValue: setAuthState}}>
          <Header/>
          <Main>
            <Container>
              <AppRoutes/>
            </Container>
          </Main>
          <Footer/>
        </AuthContext.Provider>
      </StyledApp>
    </BrowserRouter>
  );
}

export default App;
