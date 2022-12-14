import { Field, Form } from "formik";
import styled from "styled-components";
import shared from "../../styles/shared";

export const Home = styled.div`
    width: 100%;
    height: 100%;
    flex: 1 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    font: normal 16px 'Rubik';
`

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding: 20px 20px;
    background: rgb(255, 255, 255);
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
`

export const SectionHeader = styled.div`
    text-align: center;
    font: bold 30px 'Ubuntu';
    color: rgba(0, 0, 0, 0.75);
`

export const SectionMain = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
`

export const StyledForm = styled(Form)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
`

export const FormMain = styled.div`
    width: 100%;
    display: flex;
`

export const FormField = styled(Field)`
    width: 80%;
    padding: 15px 15px;
    outline: 0;
    border: solid 1px rgba(0, 0, 0, 0.3);
    font: normal 16px 'Roboto';
    ${shared.transition200ms}

    &:focus {
        border: solid 1px rgba(0, 0, 0, 0.3);
    }
`

export const Button = styled.button`
    font: normal 16px 'Rubik';
    align-self: flex-end;
    padding: 10px;
    color: rgba(0, 0, 0);
    ${shared.plainButton}
    ${shared.transition200ms}
    ${shared.hoverInvert}
`

export const FormButton = styled(Button)`
    align-self: auto;
    width: 20%;
    color: rgb(255, 255, 255);
    background: rgb(102, 140, 211);
`

export const FormMessage = styled.div<{error?: boolean}>`
    font: normal 16px 'Roboto';
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    color: ${({ error = false }) => !error?
        `rgb(0, 0, 0)`
        :
        `rgb(252, 73, 73)`};
`