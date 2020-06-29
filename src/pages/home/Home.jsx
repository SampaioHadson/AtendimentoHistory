import React, { Component } from "react"
import './Home.css'
import Teste from './teste'
import List from './ListAtendimento'
import Atendimento from '../atendimento/Atendimento'
//JSON TESTES
import atendimentos from '../../jsonTestes/atendimentosJson'
import menssagens from '../../jsonTestes/menssagensJson'
import atendimento from "../../jsonTestes/atendimentosJson"
import { MenuList } from "@material-ui/core"

export default class Home extends Component{


    state = {
        showAtendimento: false,
        atendimentos: '',
        atendimentosNovos: '',
        atendimentosPendentes: '',
        atendimentosConcluidos: '',
        menssagens: '',
        userAtendimento: '',
        idAtendimento: '',
        menssagensAtendimento: '',
        creatableAtendimento: ''
        
    }

    componentDidMount(){
        this.setState({
            ...this,
            atendimentosNovos: this.defineListAtendimentos(0),
            atendimentosPendentes: this.defineListAtendimentos(1),
            atendimentosConcluidos: this.defineListAtendimentos(2),
            menssagens: menssagens
        })
        console.log(this.state.atendimentosNovos)
    }
    

    handleShowAtendimento = () =>{
        if(this.state.showAtendimento){
            this.setState({
                ...this, 
                showAtendimento: false,
                userAtendimento: '',
                idAtendimento: '',
                menssagensAtendimento: '',
                creatableAtendimento: false,
            })
            return
        }
        this.setState({...this, showAtendimento: true})
    }

    handleSourceAtendimentos = (e) =>{
        e.preventDefault()
        console.log("PESQUISA BARRA SUPERIOR ACiONADA")
    }


    defineListAtendimentos = (status) =>{
        let newAtendimentos =
        atendimentos.filter(({Status})=> Status === status)
        .map((v, k) => {return v})
        console.log(newAtendimentos)
        return newAtendimentos
    }

    //ESSE MÉTODO CRIA O USER PARA A PAG DE ATENDIMENTO
    showPageAtendimento = () =>{
        return(
            <Atendimento
                    user = {this.state.userAtendimento}
                    idAtendimento = {this.state.idAtendimento}
                    messages = {this.state.menssagens}
                    creatableAtendimento = {this.state.creatableAtendimento}
                    handleShowAtendimento = {this.handleShowAtendimento}
                    handleAddMessage = {this.handleAddMessage}
            />
        )
    }

    //ESSE MÉTODO CARREGA OS DADOS DE UM CARD PARA A PAG DE ATENDIMENTO
    //É PASSADO PARA O CARD ATRAVÉS DE PROPS

    handleLoadPagAtendimentosForCard = (user, menssagens, atendimentoId) =>{
        this.setState({
            userAtendimento: user,
            idAtendimento: atendimentoId,
            menssagensAtendimento: menssagens,
            creatableAtendimento: true,
            showAtendimento: true
        })
    }

    //SET MESSAGE JSON TESTE
    handleAddMessage = (message) =>{

        const {Id} = this.state.menssagens[this.state.menssagens.length - 1]
        console.log(Id)
        let messageReady = message;
        messageReady.Id = Id + 1;

        let menssagens = this.state.menssagens
        menssagens.push(messageReady)
        console.log(menssagens)
       this.setState({menssagens: menssagens})
    }

    render(){
        return(
            <div className='container-home'>
                {this.state.showAtendimento && 
                    this.showPageAtendimento()
                }
                <div className="navbar-home">
                    
                </div>
                <div className='work-area'>
                    <div className='work-area-header'>
                        <div className='title-area-home'>
                            <p className='title-function'>ATENDIMENTO DE USUÁRIOS</p>
                        </div>
                        <div className='source-area'>
                            <form onSubmit={this.handleSourceAtendimentos}  >
                                <div className="input-container-home">
                                    <input type="text" className='input-form-home' name='source' id='source' required/>
                                    <label htmlFor="source" className='label-form-home' >Pesquisar algo</label>
                                </div>
                            </form>
                            <Teste/>
                        </div>
                    </div>
                    <div className='work-area-activities'>
                
                    <List 
                        titleCss={'atendendo'}
                        titleList={'Atendendo'}
                        creatable={true}
                        handleShowAtendimento = {this.handleShowAtendimento}
                        //JSON TESTE
                        Atendimentos = {this.state.atendimentosNovos}
                        menssagens =  {this.state.menssagens}
                        handleLoadPagAtendimentosForCard = {this.handleLoadPagAtendimentosForCard}
                        
                    />

                    <List 
                        titleCss={'pendente'} 
                        titleList={'Pendentes'}
                        Atendimentos = {this.state.atendimentosPendentes}
                        menssagens =  {this.state.menssagens}
                        handleLoadPagAtendimentosForCard = {this.handleLoadPagAtendimentosForCard}
                    />

                    <List 
                        titleCss={'concluido'} 
                        titleList={'Concluídos'}
                        Atendimentos = {this.state.atendimentosConcluidos}
                        menssagens =  {this.state.menssagens}
                        handleLoadPagAtendimentosForCard = {this.handleLoadPagAtendimentosForCard}
                    />
                      
                    </div>
                </div>
            </div>
        )
    }
}
