import { Field, Form } from "formik";
import styled from "styled-components";
import shared from "../../styles/shared";


export const StyledForm = styled(Form)`
    width: 35%;
    padding: 30px 10px 10px 10px;
    background: rgb(255, 255, 255);
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    //box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
`

export const FormMain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 100%;
`

export const FormHeader = styled.div`
    font: normal 22px 'Rubik';
`

export const FormFooter = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
`

export const FormInputBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
`

export const FormField = styled(Field)<{error?: boolean}>`
    width: 100%;
    padding: 10px 10px;
    outline: 0;
    border: 0;
    border-radius: 5px 5px 0 0;
    background: ${({ error = false }) => !error? 
        `transparent`
        :
        `rgba(255, 80, 124, 0.2)`};
    border-bottom: solid 1px rgba(0, 0, 0, 0.3);
    font: normal 16px 'Roboto';
    ${shared.transition200ms}

    &:focus {
        border-bottom: solid 1px rgb(0, 0, 0);;
    }
`

export const FormInputError = styled.div`
    width: 100%;
    text-align: left;
    font: normal 12px 'Ubuntu';
    color: rgb(252, 73, 73);
`

export const FormButton = styled.button`
    ${shared.plainButton}
    ${shared.transition200ms}
    ${shared.hoverInvert}
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    font: normal 18px 'Rubik';
    color: rgb(255, 255, 255);
    background: rgb(97, 107, 255);
    ${props => props.disabled && `
        cursor: disabled;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.2);
    `}
`

export const FormMessage = styled.div<{error?: boolean}>`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    font: normal 14px 'Roboto';
    text-align: ${({ error = false }) => !error? 
        `center`
        :
        `left`};
    background: ${({ error = false }) => !error? 
        `transparent`
        :
        `rgba(255, 22, 80, 0.4)`};
`