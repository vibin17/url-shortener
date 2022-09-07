import { Formik } from "formik";
import { useContext, useEffect, useRef, useState } from "react"
import ClickableLink from "../../components/ClickableLink/ClickableLink";
import StatTable, { sortModes } from "../../components/StatTable/StatTable";
import { AuthContext } from "../../context/auth-context"
import { LinkResponse } from "../../models/models";
import ApiService from "../../services/api-service";
import { FormMessage, Home, FormMain, FormField, StyledForm, Section, SectionHeader, SectionMain, FormButton } from "./HomePageStyle";


const HomePage = () => {
    let context = useContext(AuthContext)
    let [shortenedLink, setShortenedLink] = useState('')
    let [error, setError] = useState('')
    let [linksData, setLinksData] = useState<LinkResponse[]>([])
    let [fetching, setFetching] = useState(false)
    let [page, setPage] = useState(1)
    let [sortMode, setSortMode] = useState<sortModes>(sortModes.DESC_COUNTER)
    let allLinksCovered = useRef(false)
    const itemsOnPage = 8
    const scrollHandler = ({ target }: Event) => {
        let elem = (target as Document).documentElement
        let checkScroll = elem.scrollHeight - (elem.scrollTop + window.innerHeight);
        if (checkScroll < 100 && !allLinksCovered.current) {
            setFetching(true)
        }
    }
    useEffect(() => {
        (async () => {
            if (context?.value.isSignedIn) {
                document.addEventListener('scroll', scrollHandler)
                setFetching(true)
            }
        })()
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [context?.value.isSignedIn])
    useEffect(() => {
        (async () => {
            if (fetching) {
                try {
                    const response = await ApiService.GetStatistics({
                        order: sortMode,
                        limit: itemsOnPage,
                        offset: (page - 1) * itemsOnPage
                    })
                    console.log(response)
                    console.log(response.data.length)
                    setLinksData([...linksData, ...response.data])
                    setPage(page + 1)
                    if (response.data.length < itemsOnPage) {
                        allLinksCovered.current = true
                    }
                } catch (exception) {
                    console.log(exception)
                } finally {
                    setFetching(false)
                }
            }
        })()
    }, [fetching])
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
                                    setShortenedLink(result.data.short)
                                    setError('')
                                    console.log(result)
                                }
                                catch (exception) {
                                    setShortenedLink('')
                                    setError('Неверный формат ссылки')
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
                                {shortenedLink && <FormMessage> 
                                    Ваша ссылка: 
                                    <br/>
                                    <ClickableLink link={shortenedLink} short fontSize={20}/>
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
                        <StatTable 
                            links={linksData}
                            sortMode={sortMode}
                            setSortMode={setSortMode}/>
                    </SectionMain>
                </Section>
            </>}
        </Home>
    )
}

export default HomePage