import React,{Component} from 'react'
import Message from './components/Menssagens'
import './Atendimento.css'
import ListUser from './components/ListUsers'

//ICONS
import {FaTrash, FaSave, FaTimes} from 'react-icons/fa'

//JSON TESTE
import canais from '../../jsonTestes/canaisJson'
import programas from '../../jsonTestes/programasJson'
import pessoas from '../../jsonTestes/pessoasJson'

export default class Atendimento extends Component{


    state = {
        userId: '',
        cpfCnpj: '',
        nome: '',
        nomeUsual: '',
        telefone:  '',
        email: '',
        createble: false,
        messages: '',
        programaMenssagem:'',
        canalMenssagem: '',
        tipoMenssagem: '',
        conteudoMenssagem: '',
        usersFiltre:'',
        showUserList: false,
        modify: false,
        solicitacaoMessage: '',
        respostaMessage: '',
        solicitacaoCanal:'',
        respostaCanal:'',
        solicitacaoPrograma:'',
        respostaPrograma:'',
        idAtendimento: ''
    }



    componentDidMount(){
        this.handleMountAtendimento()
    }

    handleMountAtendimento = () =>{
        if(this.props.user){
           this.setState({
               idAtendimento: this.props.idAtendimento,
                userId: this.props.user.Id,
                cpfCnpj: this.props.user.CpfCnpj,
                nome: this.props.user.Nome,
                nomeUsual: this.props.user.NomeUsual,
                telefone:  this.props.user.Telefone,
                email: this.props.user.Email,
                messages: this.props.messages,
                createble: true,
            })
        }
    }


    handleCpfCnpj = (e) =>{
        if(this.state.createble){return}
        this.setState({...this, cpfCnpj: e.target.value})
    }
    handleNome = (e) =>{
        if(this.state.createble){return}
        if(this.state.modify){return}
        this.setState({...this, nome: e.target.value})
    }
    handleNomeUsual = (e) =>{
        if(this.state.createble){return}
        if(this.state.modify){return}
        this.setState({...this, nomeUsual: e.target.value})
    }
    handleTelefone = (e) =>{
        if(this.state.createble){return}
        if(this.state.modify){return}
        this.setState({...this, telefone: e.target.value})
    }
    handleEmail = (e) =>{
        if(this.state.createble){return}
        if(this.state.modify){return}
        this.setState({...this, email: e.target.value})
    }


    //BUSCAR CLIENTE POR CPF/CNPJ
    handleSearchUserByCpfCpnj = (number) =>{
        const pessoasVector = 
        pessoas.filter(({CpfCnpj}) => CpfCnpj === number)
        .map((v,k) =>{ return v })

        if(pessoasVector.length > 1 || !pessoasVector[0]){
            this.setState({
                cpfCnpj: this.state.cpfCnpj,
                userId: '',
                nome: '',
                nomeUsual: '',
                telefone: '',
                email: '',
                modify: false
            })
            return
        }

        const {Id, CpfCnpj, Nome, NomeUsual, Telefone, Email} = pessoasVector[0]
        this.setState({
            userId: Id,
            cpfCnpj: CpfCnpj,
            nome: Nome,
            nomeUsual: NomeUsual,
            telefone: Telefone,
            email: Email,
            modify: true
        })
        
        console.log(pessoasVector)
    }

    handlePrepareSendMessage = (idPrograma, IdCanal, tipoMenssagem, conteudoMenssagem, IdAtendimento) =>{

        idPrograma = idPrograma || this.state.programaMenssagem
        IdCanal = IdCanal || this.state.canalMenssagem
        conteudoMenssagem = conteudoMenssagem ||  this.state.conteudoMenssagem
        IdAtendimento = IdAtendimento || this.state.idAtendimento
        if(tipoMenssagem !== 0 && tipoMenssagem !== 1){ tipoMenssagem = this.state.tipoMenssagem}

        console.log('this.state.idAtendimento')
        console.log(IdAtendimento)
        console.log('this.state.idAtendimento')

        let programaVector = ''
        if(idPrograma){
            programaVector = programas.filter(({Id})=> Id === parseInt(idPrograma))
                .map((v, k)=>{return v})
        } 

        const canalVector = canais.filter(({Id})=> Id === parseInt(IdCanal))
            .map((v, k)=>{return v})

        let canal = '', programa = ''

        if(canalVector[0]){canal = canalVector[0]}
        if(programaVector[0]){programa = programaVector[0]}
        
        const dataSend ={
            Id: '',
            Atendimento_Id: IdAtendimento ,
            Data:'26/06/2020',
            Canal: canal,
            Time:'18:30',
            Atendente_Id: 1,
            Programa: programa,
            Tipo_Menssagem: tipoMenssagem,
            Menssagem: conteudoMenssagem
        }

        this.props.handleAddMessage(dataSend)
    }

    //PROCURAR CLIENTE POR OUTROS ATRIBUTOS
    handleShowUserSearch = () =>{
        if(this.state.createble) return
        if(this.state.showUserList){
            this.setState({showUserList: false})
            return
        }
        this.setState({showUserList: true})
    }

    handleSetUserBySearch = (user) =>{
        this.setState({
            userId: user.Id,
            cpfCnpj: user.CpfCnpj,
            nome: user.Nome,
            nomeUsual: user.NomeUsual,
            telefone:  user.Telefone,
            email: user.Email,
            createble: false,
            modify: true
        })
    }

    
    handlePrepareSendAtendimento = () =>{
        const newAtendimento = {
            Id: '',
            Status: 0,
            Solicitante_Id: this.state.userId
        }

       const id = this.props.handleCreateAtendimento(newAtendimento)
       this.setState({idAtendimento: id, createble: true})

       this.handlePrepareSendMessage(
           this.state.solicitacaoPrograma,
           this.state.solicitacaoCanal,
           0,
           this.state.solicitacaoMessage,
           id
       )

       if(this.state.respostaCanal && this.state.respostaMessage){
        this.handlePrepareSendMessage(
            this.state.respostaPrograma,
            this.state.respostaCanal,
            1,
            this.state.respostaMessage,
            id
        )
       }
    }


    handleDefineMessagesToCreateOrEdit = () =>{
        if(this.state.createble){
            return(
                <div>
                    < div className='row-line'>
                        <select className='message-select'
                            onChange ={(event)=> {
                                this.setState({tipoMenssagem: event.target.value})
                            }}
                            value = {this.state.tipoMenssagem}
                            >
                                <option value="" className='message-select-option'>Mensagem</option>
                                <option value={0} className='message-select-option'>Solicitação</option>
                                <option value={1} className='message-select-option'>Resposta</option>
                            </select>
                            
                            
                            <select className='message-select'
                                onChange ={(event)=> {
                                    this.setState({canalMenssagem: event.target.value})
                                    console.log(event.target.value)
                                }}
                                value = {this.state.canalMenssagem.Nome}
                                >
                                <option value=''>Canal</option>
                                {canais.map((v,k) =>{
                                    return(
                                    <option key={k} value={v.Id}>{v.Nome}</option>
                                    )
                                })}
                            </select>

                            <select className='message-select' 
                            onChange ={(event)=> {
                                this.setState({programaMenssagem: event.target.value})
                            }}
                            value = {this.state.programaMenssagem.Programa}
                            >
                                <option value=''>Programas</option>  
                                {programas.map((v,k)=>{
                                    return(
                                        <option key={k} value={v.Id}
                                        onClick={()=> console.log("AA")}
                                        >{v.Programa}</option>
                                    )})}                             
                            </select>

                        </div>
                        <div className='input-message-area'>
                        
                            <textarea 
                                classsName='message-input' 
                                name="message" 
                                id="message" 
                                cols="100" 
                                rows="8"
                                onChange={(e) => this.setState({conteudoMenssagem: e.target.value})}
                            />
                            <button 
                                className='message-input-btn' 
                                onClick={() =>{ 
                                    if(this.state.idAtendimento){
                                        this.handlePrepareSendMessage()
                                    }
                                    console.log(this.state.idAtendimento)}}
                            >
                                ENVIAR MENSSAGEM
                            </button>
                        </div>
                        <div className='btn-options-atendimento-area'>
                            <button className='btn-options-atendimento-save'
                                onClick={() => console.log(this.props.messages)}
                            >PENDENTE</button> 
                            <button className='btn-options-atendimento-save'>EXCLUIR <FaTrash size='20' style={{marginBottom:'-4px'}}/></button>
                            <button className='btn-options-atendimento-save'
                                onClick={this.props.handleShowAtendimento}
                            >SAIR <FaTimes size='20' style={{marginBottom:'-4px'}}/></button>
                        </div>   
                </div>
            )
        }

        return(
            <div>
                <div className='row-line'>
                    
                    <p className='p-tipo-message'> Solicitação</p>

                    <select className='message-select'
                        onChange ={(event)=> {
                            this.setState({solicitacaoCanal: event.target.value})
                            console.log(event.target.value)
                        }}
                        value = {this.state.solicitacaoCanal}
                        >
                        <option value=''>Canal</option>
                        {canais.map((v,k) =>{
                            return(
                            <option key={k} value={v.Id}>{v.Nome}</option>
                            )
                        })}
                    </select>

                    <select className='message-select' 
                    onChange ={(event)=> {
                        this.setState({solicitacaoPrograma: event.target.value})
                    }}
                    value = {this.state.solicitacaoPrograma}
                    >
                        <option value=''>Programas</option>  
                        {programas.map((v,k)=>{
                            return(
                                <option key={k} value={v.Id}
                                onClick={()=> console.log("AA")}
                                >{v.Programa}</option>
                            )})}                             
                    </select>

                </div>
                <div className='input-message-area'>
                
                    <textarea
                        style={{width:'100%'}} 
                        classsName='message-input' 
                        name="message" 
                        id="message" 
                        cols="100" 
                        rows="8"
                        onChange={(e) => this.setState({solicitacaoMessage: e.target.value})}
                    />

                </div>

                <div className='row-line'>
                    
                    <p className='p-tipo-message'> Resposta </p>

                    <select className='message-select'
                        onChange ={(event)=> {
                            this.setState({respostaCanal: event.target.value})
                            console.log(event.target.value)
                        }}
                        value = {this.state.respostaCanal}
                        >
                        <option value=''>Canal</option>
                        {canais.map((v,k) =>{
                            return(
                            <option key={k} value={v.Id}>{v.Nome}</option>
                            )
                        })}
                    </select>

                    <select className='message-select' 
                    onChange ={(event)=> {
                        this.setState({respostaPrograma: event.target.value})
                    }}
                    value = {this.state.respostaPrograma}
                    >
                        <option value=''>Programas</option>  
                        {programas.map((v,k)=>{
                            return(
                                <option key={k} value={v.Id}
                                onClick={()=> console.log("AA")}
                                >{v.Programa}</option>
                            )})}                             
                    </select>

                </div>
                <div className='input-message-area'>
                
                    <textarea
                        style={{width:'100%'}} 
                        classsName='message-input' 
                        name="message" 
                        id="message" 
                        cols="100" 
                        rows="8"
                        onChange={(e) => this.setState({respostaMessage: e.target.value})}
                    />

                </div>
                <div className='btn-options-atendimento-area'> 
                    <button className='btn-options-atendimento-save'>PENDENTE</button>             
                    <button className='btn-options-atendimento-save'
                        onClick={this.handlePrepareSendAtendimento}
                    >SALVAR <FaSave size='20' style={{marginBottom:'-4px'}}/></button>                    
                    <button className='btn-options-atendimento-save'
                        onClick={this.props.handleShowAtendimento}
                    >SAIR <FaTimes size='20' style={{marginBottom:'-4px'}}/></button>
                </div>                               
            </div>        
        )

    }

    render(){
        return(
            <div>
                <div className='container-atendimento' onClick={this.props.handleShowAtendimento}>
                        
                </div>
                <div className='work-area-atendimento'>
                    
                    <div className='row-line'>
                        <div className='input-container-atendimento'>
                            <input type="text" 
                            className='input-form-atendimento' 
                            name='CPF' id='CPF' required
                            value={this.state.cpfCnpj}
                            onChange={this.handleCpfCnpj}
                            onBlur={(e) => this.handleSearchUserByCpfCpnj(e.target.value)}
                            />
                            <label htmlFor="CPF" className='label-form-atendimento'>CPF/CNPJ</label>
                        </div>
                        <div className='input-container-atendimento'>
                            <input type="text" 
                            className='input-form-atendimento' 
                            name='Nome' id='Nome' required
                            value={this.state.nome}
                            onChange={this.handleNome}
                            />
                            <label htmlFor="Nome" className='label-form-atendimento'>Nome</label>
                        </div>
                    </div>
                    <div className='row-line'>
                        <div className='input-container-atendimento'>
                            <input type="text" 
                            className='input-form-atendimento' 
                            name='Nome usual' 
                            id='Nome usual' required
                            value={this.state.nomeUsual}
                            onChange={this.handleNomeUsual}
                            />
                            <label htmlFor="Nome usual" className='label-form-atendimento'>Nome usual</label>
                        </div>
                        <div className='input-container-atendimento'>
                            <input type="text" 
                            className='input-form-atendimento' 
                            name='Telefone' 
                            id='Telefone' required
                            value={this.state.telefone}
                            onChange={this.handleTelefone}
                            />
                            <label htmlFor="Telefone" className='label-form-atendimento'>Telefone</label>
                        </div>
                    </div>
                    <div className='row-line'>  
                        <div className='input-container-atendimento'>
                            <input type="text" 
                            className='input-form-atendimento' 
                            name='E-mail' 
                            id='E-mail' required
                            value={this.state.email}
                            onChange={this.handleEmail}
                            />
                            <label htmlFor="E-mail" className='label-form-atendimento'>E-mail</label>
                        </div>
                        <button 
                        onClick={this.handleShowUserSearch}
                        className='bnt-source-cliente'
                        >BUSCAR CLIENTE</button>
                    </div>
                    
                    <div>
                        {this.state.showUserList &&
                            <ListUser
                                users={pessoas}
                                handleShowUserSearch = {this.handleShowUserSearch}
                                handleSetUserBySearch = {this.handleSetUserBySearch}
                            />
                        }
                    </div>
                    

                    <div className='chat-area'>
                        {this.props.messages &&                     
                        this.props.messages
                        .filter(({Atendimento_Id})=> Atendimento_Id == this.state.idAtendimento)      
                        .map((v, k)=>{
                            return(
                                <Message 
                                    key={k}
                                    message = {v}
                                />
                            )
                          })
                        }
                    </div>
                    
                    {this.handleDefineMessagesToCreateOrEdit()}
                  
                </div>
            </div>
        )
    }
}