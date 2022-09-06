import { Formik, FormikHelpers, FormikValues } from "formik";
import { useContext, useEffect, useState } from "react"
import StatTable from "../../components/StatTable/StatTable";
import { AuthContext } from "../../context/auth-context"
import { API_URL } from "../../http";
import { LinkResponse } from "../../models/models";
import ApiService from "../../services/api-service";
import { FormMessage, Home, FormMain, FormField, StyledForm, Section, SectionHeader, SectionMain, FormButton, ShortLink } from "./HomePageStyle";

const HomePage = () => {
    let context = useContext(AuthContext)
    let [shortLink, setShortLink] = useState('')
    let [linkCopied, setLinkCopied] = useState(false)
    let [error, setError] = useState('')
    let [stats, setStats] = useState<LinkResponse[]>([])
    useEffect(() => {
        (async () => {
            if (context?.value.isSignedIn) {
                const response = await ApiService.Statistics()
                setStats(response.data)
            }
        })()
    }, [context?.value])
    return (
        <Home>
            {!context?.value.isSignedIn?
            <>
                Войдите, чтобы начать пользоваться сервисом
            </>
            :
            <>
                <Section>
                    <SectionHeader>
                        Вставьте ссылку, которую хотите сократить
                    </SectionHeader>
                    <SectionMain>
                        <Formik 
                            initialValues={{url: ''}}
                            onSubmit={async ({url: link}) => {
                                try {
                                    const result = await ApiService.Squeeze({link})
                                    setShortLink(result.data.short)
                                    setError('')
                                    setLinkCopied(false)
                                    console.log(result)
                                }
                                catch (exception) {
                                    setShortLink('')
                                    setError('Неверный формат ссылки')
                                    setLinkCopied(false)
                                    console.log(exception)
                                }
                            }}
                        >
                            <StyledForm>
                                <FormMain>
                                    <FormField name='url'
                                        placeholder='Ваша ссылка'
                                        required
                                    > 
                                    </FormField>
                                    <FormButton type='submit'>
                                        Сократить URL
                                    </FormButton>
                                </FormMain>
                                {shortLink && <FormMessage> 
                                    Ваша ссылка: 
                                    <br/>
                                    <ShortLink href={`${API_URL}/s/${shortLink}`}
                                        onClick={(event) => {
                                            event.preventDefault()
                                            navigator.clipboard.writeText((event.target as HTMLAnchorElement).getAttribute('href') || '').then(() => {
                                                setLinkCopied(true)
                                            }, () => {
                                                setLinkCopied(false)
                                            })
                                        }}>
                                        {`${API_URL}/s/${shortLink}`}
                                    </ShortLink>
                                    {linkCopied && <>
                                        Ссылка скопирована!
                                    </>}
                                </FormMessage>}
                                {error && <FormMessage error={true}> 
                                    {error}
                                </FormMessage>}
                            </StyledForm>
                        </Formik>
                    </SectionMain>
                </Section>
                <Section>
                    <SectionHeader>
                        Статистика по созданным ссылкам
                    </SectionHeader>
                    <SectionMain>
                        <StatTable links={stats}/>
                    </SectionMain>
                </Section>
            </>}
        </Home>
    )
}

export default HomePage