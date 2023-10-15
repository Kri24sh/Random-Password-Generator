import React, { useCallback, useEffect, useState ,useRef} from 'react'

const App = () => {
    
    let [len , setlen] = useState(6);
    const [numallow ,setnumallow] = useState(true);
    const [charallow ,setcharallow] = useState(false);
    const [pass , setpass] = useState("");   

    const passwordRef = useRef(null);

    const passgen = useCallback(()=>{
      let password = "";
      let uplwchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const num  = "0123456789";
      const symbol = "!@#$%^&*()?><}}][";

      if(numallow) {uplwchar += num}
      if(charallow){uplwchar += symbol}

      for (let i = 1; i <= len; i++) {
        let charr = Math.floor((Math.random()*uplwchar.length)+1);
          password += uplwchar.charAt(charr);
      }

      setpass(password);

    } , [len , numallow , charallow , setpass])

    
    const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 999);
      window.navigator.clipboard.writeText(pass)
    }, [pass])



      useEffect(()=>{
        passgen();
      } ,[len , numallow , charallow ,passgen])

        

  return (
    <>

    <div className="w-full flex-wrap gap-4 h-screen p-10 bg-slate-900 flex flex-col overflow-hidden items-center justify-center">
      <div className=' text-white text-4xl overflow-hidden'>RANDOM PASSWORD GENRATOR</div>
      <div className='py-6 px-6 w-3/4 h-70 font-bold text-xl bg-gray-700 flex overflow-hidden flex-col rounded-xl'>
        <input type="text"  ref={passwordRef} placeholder='Random Password' value={pass} className='p-2 text-black h-9 rounded-lg w-full border-none' id='dis' readOnly/>
        <button className=" w-full bg-gray-600 rounded-xl my-3" onClick={copyPasswordToClipboard}>
          COPY
        </button>
        
        <div className=' flex justify-evenly flex-shrink flex-wrap   flex-row'>
          <button className=' rounded-full h-8 w-8 flex flex-wrap justify-center overflow-hidden  items-center bg-gray-600' >-</button>
        <input type="range" className=' w-2/4 cursor-pointer' min={6} max={100} value={len} id='ma' onChange={(e)=>setlen(e.target.value)}/>
        <button className=' rounded-full h-8 w-8  bg-gray-600'>+</button>
        <label className=''>Password length : {len}</label>
        </div>

        <div className=' flex flex-row gap-9 overflow-hidden px-5 py-3 '>
          <label>Characters used :</label>
          
          <div>
          <input type="checkbox" id='numbers' className='mx-2' defaultChecked ={numallow} onChange={  ()=>setnumallow((prev)=>!prev) } />
          <label htmlFor="numbers">Numbers</label>          
          </div>


          <div>
          <input type="checkbox" id='Symbols' className='mx-2' defaultChecked ={charallow} onChange={ ()=>setcharallow((prev)=>!prev) }/>
          <label htmlFor="Symbols">Symbols</label>
          </div>

        </div>
        

      </div>      
    </div>


    </>
  )
}

export default App
