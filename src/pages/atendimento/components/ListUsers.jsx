import React,{Component} from 'react'


export default class ListUsers extends Component{

    state ={
        userSelected: false,
        userOption: '',
        filterText: '',
        atributo: '',
        filterOption: '',
        users: '',
        usersFiltred: '',
        filterClicable: true
    }

    componentDidMount(){
        this.setState({
            users: this.props.users,
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
        this.setState({filterOption: e.target.value})
    }

    handleAtributo = (e) =>{  
        this.setState({atributo: e.target.value})
    }

    handleFilterText = (e) =>{
        this.setState({filterText: e.target.value})
    }

    
    handleFilterUsersByAtributes = (value) =>{
         
        const atributo = this.state.atributo   
        const option = this.state.filterOption
        console.log(this.state)
       
        if(!atributo){return}
        if(!option){return}
        if(!value){return}

       let usersFiltred;

       if(option && (atributo !== '') && (value !== '')){
            switch(parseInt(atributo)){
                case 0:{
                    if(parseInt(option) === 0){
                        
                         usersFiltred = this.state.users
                        .filter(({CpfCnpj})=> CpfCnpj.toLowerCase() === value.toLowerCase())
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
                       .filter(({Nome})=> Nome.toLowerCase() === value.toLowerCase())
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
                       .filter(({NomeUsual})=> NomeUsual.toLowerCase() === value.toLowerCase())
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
                       .filter(({Telefone})=> Telefone.toLowerCase() === value.toLowerCase())
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
                       .filter(({Email})=> Email.toLowerCase() === value.toLowerCase())
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
                    <div className='search-clientes-area-search'
                        
                    >
                            <select className='message-select'
                                style={{width: '20%'}}
                                onChange={this.handleAtributo}
                                onKeyPress={(e) => {
                                    console.log(e.which)
                                    if(e.which === 13 && !this.state.filterClicable) {
                                        e.preventDefault()
                                        this.handleFilterUsersByAtributes(this.state.filterText)
                                        this.setState({filterClicable: true})
                                        return
                                    }
                                    console.log('PODE')          
                                    this.setState({filterClicable: false})
                                }}
                            >
                                    <option value="" className='message-select-option'>Atributo</option>
                                    <option value={0} className='message-select-option'>CPF/CNPJ</option>
                                    <option value={1} className='message-select-option'>Nome</option>
                                    <option value={2} className='message-select-option'>NomeUsual</option>
                                    <option value={3} className='message-select-option'>Telefone</option>
                                    <option value={4} className='message-select-option'>E-mail</option>
                            </select>
                            <select className='message-select'
                                style={{width: '20%'}}
                                onChange={this.handleFilterOption}   
                                onKeyPress={(e) => {
                                    console.log(e.which)
                                    if(e.which === 13 && !this.state.filterClicable) {
                                        e.preventDefault()
                                        this.handleFilterUsersByAtributes(this.state.filterText)

                                        this.setState({filterClicable: true})
                                        return
                                    }
                                    console.log('PODE')          
                                    this.setState({filterClicable: false})
                                }}
                            >
                                    <option value="" className='message-select-option' >Filtro</option>
                                    <option value={0} className='message-select-option'>Igual a</option>
                                    <option value={1} className='message-select-option'>Contém</option>
                            </select>
                            <div className='input-container-atendimento' style={{width:'25%', marginBottom:'20px'}}>
                                <input type="text" 
                                className='input-form-atendimento' 
                                name='FilterText' id='FilterText' required
                                value={this.state.filterText}
                                onChange={this.handleFilterText}
                                onKeyPress={(e) => {
                                    console.log(e.which)
                                    if(e.which === 13) {
                                        this.handleFilterUsersByAtributes(e.target.value)
                                        return
                                    }
                                }}
                                />
                                <label htmlFor="FilterText" className='label-form-atendimento'>Digite aqui!</label>
                            </div>
                            <button className='search-user-btn'
                                onClick={() => this.handleFilterUsersByAtributes(this.state.filterText, null, null) }
                            >Pesquisa</button>

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