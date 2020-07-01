import React,{Component} from 'react'


export default class ListUsers extends Component{

    state ={
        userSelected: false,
        userOption: '',
        filterText: '',
        atributo: '',
        filterOption: '',
        users: '',
        usersFiltred: ''
    }

    componentDidMount(){
        this.setState({
            users: this.props.users,
            usersFiltred: this.props.users
        })
    }

    handleSelectUser = (user) =>{
        this.setState({userSelected: true, userOption: user})
    }
    
    handleSendUser = () =>{
        this.props.handleSetUserBySearch(this.state.userOption)
        this.props.handleShowUserSearch()
    }

    handleFilterOption = (e) =>{
        if(this.state.filterText){
            this.handleFilterUsersByAtributes(this.state.filterText, null, e.target.value)
        }
        this.setState({filterOption: e.target.value})
    }

    handleAtributo = (e) =>{  
        if(this.state.filterText){
            this.handleFilterUsersByAtributes(this.state.filterText, e.target.value, null)
        }
        this.setState({atributo: e.target.value})
    }

    handleFilterText = (e) =>{
        this.handleFilterUsersByAtributes(e.target.value)      
    }

    
    handleFilterUsersByAtributes = (value, atributo, option) =>{
         
       if(!atributo){
         atributo = this.state.atributo
       }
       
       if(!option){
           option = this.state.filterOption
       }

       let usersFiltred;

       if(option && (atributo !== '') && (value !== '')){
            switch(parseInt(atributo)){
                case 0:{
                    if(parseInt(option) === 0){
                         usersFiltred = this.state.users
                        .filter(({CpfCnpj})=> CpfCnpj.toLowerCase()
                            .indexOf(value.toLowerCase())>-1)
                            .map((v) =>{return v}) 
                        break
                    }
                    usersFiltred = this.state.users
                    .filter(({CpfCnpj})=> CpfCnpj.toLowerCase()
                            .includes(value.toLowerCase()))
                            .map((v) =>{return v}) 
                    break
                }
                case 1:{
                    if(parseInt(option) === 0){
                        usersFiltred = this.state.users
                       .filter(({Nome})=> Nome.toLowerCase()
                           .indexOf(value.toLowerCase())>-1)
                           .map((v) =>{return v}) 
                       break
                   }
                   usersFiltred = this.state.users
                   .filter(({Nome})=> Nome.toLowerCase()
                           .includes(value.toLowerCase()))
                           .map((v) =>{return v}) 
                   break
                }
                case 2:{
                    if(parseInt(option) === 0){
                        usersFiltred = this.state.users
                       .filter(({NomeUsual})=> NomeUsual.toLowerCase()
                           .indexOf(value.toLowerCase())>-1)
                           .map((v) =>{return v}) 
                       break
                   }
                   usersFiltred = this.state.users
                   .filter(({NomeUsual})=> NomeUsual.toLowerCase()
                           .includes(value.toLowerCase()))
                           .map((v) =>{return v}) 
                   break
                }
                case 3:{
                    if(parseInt(option) === 0){
                        usersFiltred = this.state.users
                       .filter(({Telefone})=> Telefone.toLowerCase()
                           .indexOf(value.toLowerCase())>-1)
                           .map((v) =>{return v}) 
                       break
                   }
                   usersFiltred = this.state.users
                   .filter(({Telefone})=> Telefone.toLowerCase()
                           .includes(value.toLowerCase()))
                           .map((v) =>{return v}) 
                   break
                }
                case 4:{
                    if(parseInt(option) === 0){
                        usersFiltred = this.state.users
                       .filter(({Email})=> Email.toLowerCase()
                           .indexOf(value.toLowerCase())>-1)
                           .map((v) =>{return v}) 
                       break
                   }
                   usersFiltred = this.state.users
                   .filter(({Email})=> Email.toLowerCase()
                           .includes(value.toLowerCase()))
                           .map((v) =>{return v}) 
                   break
                }
            }
            this.setState({usersFiltred: usersFiltred, filterText: value }) 
       }else{
           this.setState({usersFiltred: this.state.users, filterText: value})
       }
    }

    render(){
        return(
            <div className='search-clientes-container'>
                <div className='search-cliente-back' onClick={() => this.props.handleShowUserSearch()}/>
                <div className='search-cliente-front'>
                    <div className='search-clientes-area-search'>
                        <select className='message-select'
                            onChange={this.handleAtributo}        
                        >
                                <option value="" className='message-select-option'>Atributo</option>
                                <option value={0} className='message-select-option'>CPF/CNPJ</option>
                                <option value={1} className='message-select-option'>Nome</option>
                                <option value={2} className='message-select-option'>NomeUsual</option>
                                <option value={3} className='message-select-option'>Telefone</option>
                                <option value={4} className='message-select-option'>E-mail</option>
                        </select>
                        <select className='message-select'
                            onChange={this.handleFilterOption}   
                        >
                                <option value="" className='message-select-option'>Filtro</option>
                                <option value={0} className='message-select-option'>Igual a</option>
                                <option value={1} className='message-select-option'>Contém</option>
                        </select>
                        <div className='input-container-atendimento' style={{width:'30%'}}>
                            <input type="text" 
                            className='input-form-atendimento' 
                            name='FilterText' id='FilterText' required
                            value={this.state.filterText}
                            onChange={this.handleFilterText}
                            />
                            <label htmlFor="FilterText" className='label-form-atendimento'>Digite aqui!</label>
                        </div>
                    </div>
                    <div className='search-clientes-area'>
                        <table className='table-container'>
                            <tbody>    
                                <tr className='table-tbody-one'>
                                    <td className='table-td-one'>CPF/CPNJ</td>
                                    <td className='table-td-one'>NOME</td>
                                    <td className='table-td-one'>NOME USUAL</td>
                                    <td className='table-td-one'>EMAIL</td>
                                    <td className='table-td-one'>TELEFONE</td>
                                </tr>                                                           
                            </tbody>

                            {this.state.usersFiltred && this.state.usersFiltred.map((v,k)=>{
                                if(k % 2 !== 0){
                                    return(  
                                        <tbody 
                                                key={k}  
                                                onClick={()=> this.handleSelectUser(v)}
                                            >
                                            <tr className='table-tbody-one'>                           
                                                <td className='table-td-one'>{v.CpfCnpj}</td>
                                                <td className='table-td-one'>{v.Nome}</td>
                                                <td className='table-td-one'>{v.NomeUsual}</td>
                                                <td className='table-td-one'>{v.Email}</td>
                                                <td className='table-td-one'>{v.Telefone}</td>                                               
                                            </tr>
                                        </tbody>    
                                    ) 
                                }
                                return(  
                                    <tbody 
                                        key={k}  
                                        onClick={()=> this.handleSelectUser(v)}
                                        >
                                        <tr className='table-tbody-two'>                           
                                            <td className='table-td-two'>{v.CpfCnpj}</td>
                                            <td className='table-td-two'>{v.Nome}</td>
                                            <td className='table-td-two'>{v.NomeUsual}</td>
                                            <td className='table-td-two'>{v.Email}</td>
                                            <td className='table-td-two'>{v.Telefone}</td>                                               
                                        </tr>
                                    </tbody>    
                                )                       
                            
                            })}
                        </table>    
                    </div>
                </div>
                <div className='search-clientes-confirm-area'>
                    {this.state.userSelected ? 
                        <button className='serach-clientes-button'
                        onClick={this.handleSendUser}
                        >CONFIRMAR</button>
                        :
                        <button className='serach-clientes-button-disable'>CONFIRMAR</button>
                    }

                    <button className='serach-clientes-button'onClick={() => this.props.handleShowUserSearch()}>SAIR</button>
                </div>
            </div>
        
        )
    }
}