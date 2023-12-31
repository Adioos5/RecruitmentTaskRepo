import { styled } from 'styled-components'

export function PostContainer(props) {
    return(
        <Borders>
            <h2>{props.title}</h2> 
            <br/>
            {props.body}
        </Borders>
    )
}

const Borders = styled.div`
    margin: 20px;
    padding: 20px;
    background-color: #cccccc;
    border-radius: 10px;
`