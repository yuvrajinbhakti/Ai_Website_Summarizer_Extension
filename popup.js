document.getElementById("summarize").addEventListener("click", ()=>{
    const resultDiv = document.getElementById("result");
    const summaryType = document.getElementById("summary-type").value;

    resultDiv.innerHTML = '<div class="loader"></div>'

    //get the user's api key 
    chrome.storage.sync.get(['geminiApiKey'],({geminiApiKey})=>{
        if(!geminiApiKey){
            resultDiv.textContent = "No API key set. Click the gear icon to add one."
            return;
        }

        // ask content script (content.js) for the page text
        chrome.tabs.query({active:true,currentWindow:true},([tab])=>{
            if (!tab || !tab?.id) {
                result.textContent = "No active tab.";
                return;
              }
            chrome.tabs.sendMessage(
                tab.id,
                {type: 'GET_ARTICLE_TEXT'},
                async (response) => {
                   
                    if (chrome.runtime.lastError) {
                      result.textContent = "Content script not available. Reload the page.";
                      return;
                    }
            
                    if (!response || !response.text || !response.text.trim()) {
                      result.textContent = "Coudn't extract text from this page.";
                      return;
                    }
            
                    // result.textContent = response.text.slice(0, 300) + "...";

                    //send text to gemini
                    try{
                        const summary = await getGeminiSummary(response.text,summaryType,geminiApiKey);
                        resultDiv.textContent = summary;
                    } catch(error){
                        resultDiv.textContent = "Gemini error " + error.message;
                    }
                  }
            );
        });
    })
});

async function getGeminiSummary(rawText, type, apiKey){
    const max = 20000;
    const text = rawText.length > max ? rawText.slice(0,max) + "..." : rawText;

    const promptMap = {
        brief: `Summarize in 2-3 sentences:\n\n${text}`,
        detailed: `Provide a detailed summary with key points:\n\n${text}`,
        bullet: `Summarize in bullet points (start each line with "- "):\n\n${text}`,
    };

    // async function getModelForGenerate(apiKey){
    //     const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    //     const data = await resp.json();
    //     return data.models?.find(m =>
    //       m.supportedGenerationMethods?.includes("generateContent")
    //     )?.name;
    //   }
      
    //   // Then use it:
    //   const modelName = await getModelForGenerate(apiKey);
    //   if (!modelName) throw new Error("No supported model found");
    //   console.log("this is value of modelName", modelName); //models/gemini-2.5-flash

    const prompt = promptMap[type] || promptMap.brief;

    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ],
            generationConfig: {
              temperature: 0.2,
            }
          })
        }
      );
      

    if(!res.ok){
        const {error} = await res.json();
        throw new Error(error.message || "API request failed");
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No summary." ;

}