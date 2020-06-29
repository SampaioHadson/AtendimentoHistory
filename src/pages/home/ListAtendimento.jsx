import React from 'react'
import Card from './CardAtendimento'
import {FaPlus} from  'react-icons/fa'

export default function Board(props){


    function creatableCard(){
        return(
            <div className='card'>
                <button 
                className='create-atendimento-btn'  
                onClick={props.handleShowAtendimento}>
                    Criar novo atendimento  
                    <FaPlus  style={{marginBottom: '-5px'}}size='20px'/>
                </button>
            </div>
        )
    }


    return(
        <div className='list'>
            <div className={`list-header-${props.titleCss}`}>
                <label className='list-title'>{props.titleList}</label>
            </div>
            <div className='list-content' >
                {props.creatable && creatableCard()}
                {props.Atendimentos && 
                    props.Atendimentos.map((v, k)=>(
                        <Card key={k}
                            atendimentoId={v.Id}
                            pessoaId={v.Solicitante_Id}
                            menssagens={props.menssagens}
                            handleLoadPagAtendimentosForCard = {props.handleLoadPagAtendimentosForCard}
                        
                        />
                     ))}
            </div>
        </div>
    )
}