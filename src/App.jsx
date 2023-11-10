import { useState , useCallback , useEffect , useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed){
      str += "0123456789" 
    }
    if(charAllowed){
      str += "~`!@#$%^&*()_<>?|"
    }

    for (let i = 0; i < length; i++) {
      let position = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(position)
    }

    setPassword(pass)
  } , [length,numAllowed,charAllowed,setPassword])

  const copyToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  } , [password])

  useEffect(() => {
    passwordGenerator()
  } , [length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto rounded-lg shadow-md py-4 px-4 my-8 text-black-400 bg-gray-600'>
        <h1 className='text-white text-center my-3'><b>Password Generator</b></h1>
        <div className='flex shadow overflow-hidden rounded-lg mb-4'>
          <input 
          type="text" 
          value={password} 
          className='outline-none px-3 py-1 w-full' 
          placeholder='Password' 
          readOnly 
          ref={passwordRef}/>
          <button 
          onClick={copyToClipBoard}
          className='outline-none text-white bg-blue-700 px-4 py-0.5 shrink-0'>
            COPY</button>
        </div>
        <div className="flex text-sm gap-x-6">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            max={100}
            min={8}
            value={length} 
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}/>
            <label><b>Length: {length}</b></label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            id='numberInput' 
            defaultChecked={numAllowed}
            onChange={()=>{setnumAllowed((prev)=>!prev)}}
            />
            <label htmlFor='numberInput'><b>Number</b></label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            id='characterInput' 
            defaultChecked={charAllowed}
            onChange={()=>{setcharAllowed((prev)=>!prev)}}/>
            <label htmlFor='characterInput'><b>Character</b></label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
