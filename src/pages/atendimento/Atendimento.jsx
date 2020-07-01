import React,{Component} from 'react'
import Message from './components/Menssagens'
import './Atendimento.css'
import ListUser from './components/ListUsers'

//JSON TESTE
import canais from '../../jsonTestes/canaisJson'
import programas from '../../jsonTestes/programasJson'
import pessoas from '../../jsonTestes/pessoasJson'

export default class Atendimento extends Component{


    state = {
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
        modify: false
    }



    componentDidMount(){
        this.handleMountAtendimento()
    }

    handleMountAtendimento = () =>{
        if(this.props.user){
           this.setState({
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
            cpfCnpj: CpfCnpj,
            nome: Nome,
            nomeUsual: NomeUsual,
            telefone: Telefone,
            email: Email,
            modify: true
        })
        
        console.log(pessoasVector)
    }

    handlePrepareSendMessage = () =>{
        let programaVector = ''
        if(this.state.programaMenssagem){
         programaVector = programas.filter(({Id})=> Id === parseInt(this.state.programaMenssagem))
        .map((v, k)=>{return v})
        }
        const canalVector = canais.filter(({Id})=> Id === parseInt(this.state.canalMenssagem))
        .map((v, k)=>{return v})

        let canal = '', programa = ''
        if(canalVector[0]){canal = canalVector[0]}
        if(programaVector[0]){programa = programaVector[0]}
        
        const dataSend ={
            Id: '',
            Atendimento_Id:this.props.idAtendimento,
            Data:'26/06/2020',
            Canal: canal,
            Time:'18:30',
            Atendente_Id: 1,
            Programa: programa,
            Tipo_Menssagem: this.state.tipoMenssagem,
            Menssagem: this.state.conteudoMenssagem
        }

        this.props.handleAddMessage(dataSend)
    }

    //PROCURAR CLIENTE POR OUTROS ATRIBUTOS
    handleShowUserSearch = () =>{
        if(this.state.showUserList){
            this.setState({showUserList: false})
            return
        }
        this.setState({showUserList: true})
    }

    handleSetUserBySearch = (user) =>{
        this.setState({
            cpfCnpj: user.CpfCnpj,
            nome: user.Nome,
            nomeUsual: user.NomeUsual,
            telefone:  user.Telefone,
            email: user.Email,
            createble: false,
            modify: true
        })
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
                        .filter(({Atendimento_Id})=> Atendimento_Id == this.props.idAtendimento)      
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
                    <div className='row-line'>
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
                                 )
                             })}                             
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
                            if(this.props.idAtendimento){
                                this.handlePrepareSendMessage()
                            }
                             console.log(this.props.idAtendimento)
                            }
                        }
                        >
                            ENVIAR MENSSAGEM
                        </button>
                    </div>
                  
                </div>
            </div>
        )
    }
}