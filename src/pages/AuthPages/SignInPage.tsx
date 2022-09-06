import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth-context"
import { Formik } from "formik"
import * as Yup from 'yup'
import { FormButton, FormHeader, FormMain, FormField, StyledForm, FormFooter, FormMessage } from "./AuthPagesStyle"
import ApiService from "../../services/api-service"
import { useNavigate } from "react-router-dom"

const SignInPage = () => {
    let context = useContext(AuthContext)
    let [error, setError] = useState(false)
    let navigate = useNavigate()
    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            onSubmit={async ({username, password}) => {
                try {
                    const response = await ApiService.SignIn({username, password})
                    context?.setValue({
                        isSignedIn: true, username
                    })
                    localStorage.setItem('access_token', response.data.access_token)
            //BAD//                    
                    localStorage.setItem('username', username)
                    localStorage.setItem('password', password)
                    navigate('/')

                } catch (exception) {
                    setError(true)
                    console.log(exception)
                }

            }}
        >
            {({
                values,
                errors,
                touched
            }) => (
                <StyledForm>
                    <FormHeader> 
                        Вход в аккаунт 
                    </FormHeader>
                    <FormMain>
                        <FormField name='username' 
                            placeholder='Имя пользователя' 
                            required
                        />
                        <FormField type='password' 
                            name='password'
                            placeholder='Пароль' 
                            required
                        />
                    </FormMain>
                    <FormFooter>
                        {error && <FormMessage error={true}>
                            Неправильный логин или пароль
                        </FormMessage>}
                        <FormButton type='submit'> 
                            Войти 
                        </FormButton>
                    </FormFooter>
                </StyledForm>
            )}
        </Formik>
    )
}

export default SignInPage