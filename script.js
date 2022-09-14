const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn= document.querySelector("button");
let synth= speechSynthesis;
isspeaking= true;
voices();
function voices(){
    for(let voice of synth.getVoices()){
       let selected=voice.name === "Google US English"? "selected":"";
        let option=`  <option value="${voice.name}" ${selected}>${voice.name} (${voice.lang} )</option>`;
     voiceList.insertAdjacentHTML("beforeend",option);
    }   
}
 
synth.addEventListener("voiceschanged",voices);
function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name=== voiceList.value){
            utternance.voice=voice;
        }
    }


synth.speak(utternance);

}
speechBtn.addEventListener("click",e =>{
    e.preventDefault();
    if(textarea.value != ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 90){
            if(isspeaking){
                synth.resume();
                isspeaking=false;
                speechBtn.innerText= "Pause Speech";
            }
            else{
                synth.pause();
                isspeaking=true;
                speechBtn.innerText= "Resume Speech";
            }
            setInterval(() =>{

                if(!synth.speaking && !isspeaking){
                    isspeaking=true;
                    speechBtn.innerText= "Convert To Speech";
                }
        
            });
        }else {
            speechBtn.innerText= "Resume To Speech";
        }   
        
    }    
});