document.getElementById("summarize").addEventListener("click", ()=>{
    const result = document.getElementById("result");
    result.textContent="Extracting text... ";

    chrome.tabs.query({active:true,currentWindow:true},([tab])=>{
        if (!tab || !tab?.id) {
            result.textContent = "No active tab.";
            return;
          }
        chrome.tabs.sendMessage(
            tab.id,
            {type: 'GET_ARTICLE_TEXT'},
            (response) => {
               
                if (chrome.runtime.lastError) {
                  result.textContent = "Content script not available. Reload the page.";
                  return;
                }
        
                if (!response || !response.text || !response.text.trim()) {
                  result.textContent = "No article text found.";
                  return;
                }
        
                result.textContent = response.text.slice(0, 300) + "...";
              }
        );
    });
});