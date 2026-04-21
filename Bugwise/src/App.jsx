
import React, { useState } from 'react'
import "./App.css"
import Navbar from "./components/Navbar" 
import Editor from '@monaco-editor/react';
import Select, { useStateManager } from 'react-select';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown'
import {CircleLoader } from "react-spinners";




const App = () => {
 const options = [
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'swift', label: 'Swift' },
];

const [selectedOption, setselectedOption] = useState(options[0])
 
const darkStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#18181b", // zinc-900
    borderColor: state.isFocused ? "#6366f1" : "#3f3f46",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#6366f1",
      width:"100%"
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#18181b",
    width:"100%"
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "#27272a"
      : state.isSelected
      ? "#3f3f46"
      : "#18181b",
    color: "#fafafa",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fafafa",
    width:"100%" 
  }),
  placeholder: (base) => ({
    ...base,
    color: "#a1a1aa",
    width:"100%"
  }),
  input: (base) => ({
    ...base,
    color: "#fafafa",
    width:"100%"
  }),
};
const [code, setCode] = useState("");
const [loading, setLoading] = useState(false);
const [response, setResponse] = useState("");
const ai = new GoogleGenAI({ apiKey:"AIzaSyA8ybyeDwm3vLmINxJOWAYUdbZLlkJOvy4"});
async function reviewcode() {
  setResponse("");
  setLoading(true);
  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:`You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
I’m sharing a piece of code written in ${selectedOption.value}.
Your job is to deeply review this code and provide the following:

1️⃣ A quality rating: Better, Good, Normal, or Bad.
2️⃣ Detailed suggestions for improvement, including best practices and advanced alternatives.
3️⃣ A clear explanation of what the code does, step by step.
4️⃣ A list of any potential bugs or logical errors, if found.
5️⃣ Identification of syntax errors or runtime errors, if present.
6️⃣ Solutions and recommendations on how to fix each identified issue.

Analyze it like a senior developer reviewing a pull request.
Code: ${code} 
`,
  });
   const text = result.text();
   setResponse(text);
   setLoading(false);
}


  return (
    
    <>
    <Navbar/>
    <div className='main flex  justify-between to-black-500' style={{height:"calc(100vh - 90px)"}}>
    <div className='left h-[87%] w-[50%]'>
      <div className="tabs mt-5 !px-5 !mb-3 w-full flex items-center gap-[10px]">

       <Select
        value={selectedOption}
        onChange={(e)=>{setselectedOption(e)}}
        options={options}
        styles={darkStyles}
        
      /> 
     
      <button className='btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800'>Fix Code</button>
      <button onClick={()=>{
        if(code==" "){
          alert("Please enter code first")
        }
        else{
          reviewcode()
        }
      }} className='btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800'>Review</button>

      </div>
    
    <Editor height="100%" theme='vs-dark' language={selectedOption.value} value={code} onChange={(e)=>{setCode(e)}} />
    </div>
    <div className='right overflow-scroll !p-[10px] bg-zinc-900 w-[50%] h-[101%]'>
    <div className="toptab border-b-[1px] border-t-[1px] border-[#27272a] flex items-center justify-between h-[60px]">
     <p className='font-[700] text-[17px]'>Response</p>
    </div>
    {loading && <CircleLoader color='#67e8f9'/>}
    <Markdown>{response}</Markdown>
    </div>
    </div>
    </>
  )
}
export default App
