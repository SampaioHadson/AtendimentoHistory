import React , {Component} from 'react'
import {FaTrash} from 'react-icons/fa'
import {FaExternalLinkAlt} from 'react-icons/fa'
import pessoas from '../../jsonTestes/pessoasJson'


  

 export  default class  Card extends Component {

  state = {
    identification: '',
    time: '',
    hour: '',
    canais: '',
    programas: '',
    user: '',
    menssagens: ''
  }

  componentDidMount(){
    this.handleSetUserCard()
    console.log(this.props.menssagens)
    this.handleSetInformations()
  }

  handleSetUserCard = () =>{
      const pessoa = 
      pessoas.filter(({Id}) => Id == this.props.pessoaId)
      .map((v, k) => {return v})
  
      if(pessoa[0].Nome){
        this.setState({identification: pessoa[0].Nome, user: pessoa[0]})
        return
      }
      if(pessoa[0].NomeUsual){
        this.setState({identification: pessoa[0].NomeUsual, user: pessoa[0]})
        return
      }
      if(pessoa[0].CpfCnpj){
        this.setState({identification: pessoa[0].CpfCnpj, user: pessoa[0]})
        return
      }
      if(pessoa[0].Telefone){
        this.setState({identification: pessoa[0].Telefone, user: pessoa[0]})
        return
      }
      if(pessoa[0].Email){
        this.setState({identification: pessoa[0].Email, user: pessoa[0]})
        return
      }
  }

  handleSetInformations = () => {
 
    const thisMenssagens = 
    this.props.menssagens.filter(({Atendimento_Id}) => Atendimento_Id == this.props.atendimentoId)
    .map((v,k) => {return v})

    const menssagemInicial = thisMenssagens[0]
   
    //SET DATA TIME
    let data = ''
    let hora = ''
    if(menssagemInicial){
       data = menssagemInicial.Data
       hora = menssagemInicial.Time  
    }

    //SET PROGRAMAS
    let programas = []
    thisMenssagens.map((v,k) => {
      if(v.Programa.Programa){
          let addPrograma = true
          programas.map((v2, k2) =>{
              if(v.Programa.Programa === v2){ addPrograma = false}
          })
      if(addPrograma){programas.push(v.Programa.Programa)}
      }
    })

  
    //SET CANAIS
    let canais = []
    thisMenssagens.map((v,k) => {
      if(v.Canal.Nome){
        let addChanel = true
        canais.map((v2, k2) =>{
          if(v.Canal.Nome === v2){ addChanel = false}
        })
        if(addChanel){canais.push(v.Canal.Nome)}
      }
    })


    this.setState({hour: hora, date: data, programas: programas.join(', '), canais: canais.join(', '), menssagens: thisMenssagens}) 
  }

  render(){
      return(
        <div className='card'>
          <div className='card-content'>
            <p className='card-identification'>{this.state.identification}</p> 
            <p className='card-time'>{this.state.hour}</p>
            <p className='card-time'>{this.state.date}</p><br/>
            <p className='card-description'>{`CANAIS: ${this.state.canais}`}</p>
            <p className='card-description'>{`PROGRAMAS: ${this.state.programas}`}</p>
          </div>
          <div className='card-options'>
              <FaExternalLinkAlt 
                className='card-options-icon'
                size='20px'
                onClick={() => {
                    this.handleSetInformations()
                    this.props.handleLoadPagAtendimentosForCard(this.state.user, this.state.menssagens, this.props.atendimentoId)
                  }
                }
              />
              <FaTrash className='card-options-icon' size='20px'
                onClick={()=> console.log(this.props.menssagens)}
              />
          </div>
        </div>  
      )
  }
}
