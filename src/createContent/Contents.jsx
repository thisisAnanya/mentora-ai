import { createContext, useState,useEffect } from "react";
// import react from '@vitejs/plugin-react'

import main from "../context/content";



export const Context = createContext()

 const ContextProvider = (props)=>{
    const [input,setInput] = useState("");
    const [recentPrompt, setRecentprompt] =useState("");
    const [prePrompts, setPrevPrompts] =useState([]);
     const [showResult, setShowResult] =useState(false);
     const [loading, setLoading] =useState(false);
     const [resultData,setResultData] =useState("");

     const delayPara =(index,nextWord)=>{
        setTimeout (function(){
            setResultData(prev => prev + nextWord);
        },75*index)
     }

     const newChat = () =>{

        setLoading(false)
        setShowResult(false)
     }

    const onSent = async(prompt)=>{
        // alert("onSent() triggered")
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        try{
        if (prompt !== undefined) {
            response = await main(prompt);
            setRecentprompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentprompt(input)
            response = await main(input)
        }
        
        let responseArray = response.split("**");
        let newResponse ="";
        for(let i=0; i < responseArray.length; i++)
        {
            if(i===0 || i%2 !== 1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+ responseArray[i]+ "</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("<br>")
        let newResponseArray = newResponse2.split(" ");
        for(let i=0; i < newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        // setResultData(newResonse2);
        }catch(err){
            console.error("Error in onSent:", err);
            setResultData("<p>Error fetching result</p>");
        }
        
        
        
        setLoading(false);
        setInput("");
    }
    
        
  

    const contextValue={
    prePrompts,
    setPrevPrompts,
    onSent,
    setRecentprompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat

    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider