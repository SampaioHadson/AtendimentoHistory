import React,{Component} from 'react'
import './Login.css'
import BackgroundLogin from '../../images/background_login.png'
import {Link } from "react-router-dom";

export default class Login extends Component{

    state = {
        login: '',
        password: '',
        userError: false
    }

    handleLogin = (e) =>{
        this.setState({...this, login: e.target.value})
    }

    handlePassword = (e) =>{
        this.setState({...this, password: e.target.value})
    }

     handleAuthenticationUser = (e) =>{
        //ENVIO DE DADOS PARA AUTENTICAÇÃO DO USER
        if(this.state.login !== 'admin'){   
            this.setState({...this, userError:true})
            e.preventDefault()
            return
        }
        if(this.state.password !== 'admin'){
            this.setState({...this, userError:true})
            e.preventDefault()
            return
        }
        console.log('form')
    }

    render(){
        return(
            <div className='container-login'>
                <div className='background-area'>
                    <img className='background-img' src={BackgroundLogin} alt=""/>
                    <div className='title-system-area'>
                        <p className='title'>INTERACTION HISTORY</p>
                        <p className='subtitle'>Seu software de registro para interações com usuários!</p>
                    </div>
                </div>
                <div className='area-autentication'>
                    <form className='form-autentication'>
                        
                        {this.state.userError && 
                        <div className="user-error-container" 
                        onClick={() =>{this.setState({...this, userError: false})}}>
                        <p className='user-error-p'>Usuário ou senha inválidos!</p>
                        </div>
                        }
                        
                        
                        <div className="input-container">
                            <input type="text" className="input-form" value={this.state.login} onChange={this.handleLogin} name="name" id='name' required />
                            <label htmlFor="name" className="label-form">Name</label>
                        </div>

                        <div className="input-container">
                            <input type="password" className="input-form" value={this.state.password} onChange={this.handlePassword} name="password"  id='password' required />
                            <label htmlFor="password" className="label-form">Password</label>
                        </div>

                        <Link to='/home'  onClick={this.handleAuthenticationUser}>
                        <button className='button-form'>ENVIAR</button>
                        </Link>
                
                    </form>
                    
                </div>
            </div>
        )
    }
}