import React from 'react'

export default function(props){
    return(
        <div className='message-row'>            
            <div className={`message-container-${props.message.Tipo_Menssagem}`}>
                <p className='message-content'>{props.message.Menssagem}</p>
                <p className='message-information'>
                    {`${props.message.Programa.Programa ?  `${props.message.Programa.Programa} - ` : ''} 
                    ${props.message.Canal.Nome}
                    ${props.message.Time}
                    ${props.message.Data}`}
                </p>
            </div>
        </div>
    )
}