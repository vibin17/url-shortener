import { Formik } from "formik"
import { useState } from "react"
import ApiService from "../../services/api-service"
import { StyledForm, FormHeader, FormMain, FormField, FormFooter, FormMessage, FormButton, FormInputBlock, FormInputError } from "./AuthPagesStyle"
import * as Yup from 'yup'


const SignUpValidationSchema = Yup.object().shape({
    username: Yup.string(),
    password: Yup.string(),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
})

const SignUpPage = () => {
    let [created, setCreated] = useState(false)
    let [error, setError] = useState('')
    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                passwordConfirm: ''
            }}
            validationSchema={SignUpValidationSchema}
            onSubmit={async ({username, password}) => {
                setCreated(false)
                setError('')
                try {
                    const response = await ApiService.SignUp({username, password})
                    console.log(response)
                    setCreated(true)

                } catch (exception) {
                    setError('Такой пользователь уже существует')
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
                        Регистрация 
                    </FormHeader>
                    <FormMain>
                        <FormInputBlock>
                            <FormField name='username' 
                                placeholder='Имя пользователя' 
                                required
                            />
                        </FormInputBlock>
                        <FormInputBlock>
                            <FormField type='password' 
                                name='password'
                                placeholder='Пароль' 
                                required
                            />
                        </FormInputBlock>
                        <FormInputBlock>
                            <FormField type='password'
                                error={
                                    (errors.passwordConfirm &&
                                    touched.passwordConfirm) ? 1 : 0
                                } 
                                name='passwordConfirm'
                                placeholder='Подтвердите пароль' 
                                required
                            />
                            {errors.passwordConfirm &&
                                touched.passwordConfirm && 
                            <FormInputError>
                                {errors.passwordConfirm}
                            </FormInputError>}
                        </FormInputBlock>
                    </FormMain>
                    <FormFooter>
                        {(created)  && 
                        <FormMessage>
                            Аккаунт создан
                        </FormMessage>}
                        {(error)  && 
                        <FormMessage error={true}>
                            {error}
                        </FormMessage>}
                        <FormButton type='submit' disabled={created}> 
                            Создать аккаунт 
                        </FormButton>
                    </FormFooter>
                </StyledForm>
            )}
        </Formik>
    )
}

export default SignUpPage