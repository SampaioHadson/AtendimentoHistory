import React, { useEffect, useState, useRef} from 'react'
import canais from '../../../jsonTestes/canaisJson'

const Auto = () =>{

  const [display, setDisplay] = useState(false)
  const [option, setOptions] = useState([])
  const [search, setSearch] = useState("")
  const wrapperRef = useRef(null)

  useEffect(()=>{
    const pokemon = canais
    setOptions(pokemon)
  },[])


  useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside)
    return(()=> {
      document.removeEventListener('mousedown', handleClickOutside)
    })
  }, [])

 const handleClickOutside = (event) =>{
    const {current: wrap} = wrapperRef
    if(wrap && !wrap.contains(event.target)){ 
      setDisplay(false)
    }
    
  }


  const setPokeDex = (poke) =>{
    setSearch(poke)
    setDisplay(false) 
  }


  const setPokeDexWithEnter = (e, poke) =>{
    const optionFiltered = option.filter(({name})=> 
    name.indexOf(poke.toLowerCase())>-1)
    
    console.log(optionFiltered.length)
    if(e.key === 'Enter'){
      if(optionFiltered.length > 1 || optionFiltered.length == 0){ setSearch('');setDisplay(false) }
      if(optionFiltered.length == 1){
        console.log("AQIO VEIO")
      setPokeDex(poke)
      }
    }
  }

  const testeChato = (e) =>{
    const optionFiltered = option.filter(({name})=> 
    name.indexOf(e.target.value.toLowerCase())>-1)
    console.log(optionFiltered.length)
    //if(e.key != ''){
      console.log("---")
      console.log(e.key)
      console.log("--")
   //if(optionFiltered.length > 1 || optionFiltered.length == 0){ setSearch('')}
    if(optionFiltered.length == 1){setSearch(optionFiltered[0].name)}
  }


  return(
    <div ref={wrapperRef} className= 'input-container-home' >
        <input id='auto' 
        className='input-form-home'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onFocus={() => {setDisplay(true)}}
        onBlur={testeChato} 
        onKeyPress={(e) => setPokeDexWithEnter(e, e.target.value)} 
        name= 'auto'
        required
        autoComplete='off'
        />
         <label htmlFor="auto" className='label-form-home' >Poke</label>
        {display && (
          <div className='autoContainer'>
            {option.filter(({name})=> 
            name.indexOf(search.toLowerCase())> -1)
            .map((v,i)=>{
                return <div 
                onClick={() => setPokeDex(v.name)}
                onKeyPress={(e) => setPokeDexWithEnter(e, v.name)} 
                className='option-input-auto' 
                key={i}
                tabIndex = "0"
                >
                  <span className='span-option'>{v.name}</span>
                </div>
            })}
          </div>
        )}
    </div>
  )
}

export default Auto;