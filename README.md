# Website Summarizer Beast Mode 🚀

A powerful Chrome extension that uses Google's Gemini AI to generate intelligent summaries of any webpage. Get quick insights from articles, blog posts, and web content in seconds with multiple summary formats.

## ✨ Features

- **AI-Powered Summarization**: Leverages Google's Gemini 2.5 Flash model for accurate and concise summaries
- **Multiple Summary Types**:
  - **Brief**: Quick 2-3 sentence overview
  - **Detailed**: Comprehensive summary with key points
  - **Bullet Points**: Organized bullet-point format
- **Smart Text Extraction**: Automatically extracts meaningful content from web pages
- **One-Click Copy**: Easily copy summaries to clipboard
- **Secure Storage**: API keys are stored securely in Chrome's sync storage
- **User-Friendly Interface**: Clean and intuitive popup interface
- **Auto-Setup**: Automatically prompts for API key on first installation

## 📋 Prerequisites

- Google Chrome browser (or any Chromium-based browser)
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## 🚀 Installation

### Method 1: Load Unpacked Extension (Development)

1. **Download or Clone** this repository to your local machine

2. **Open Chrome Extensions Page**:
   - Navigate to `chrome://extensions/` in your Chrome browser
   - Or go to `Menu` → `Extensions` → `Manage Extensions`

3. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**:
   - Click "Load unpacked"
   - Select the folder containing the extension files
   - The extension should now appear in your extensions list

5. **Set Up API Key**:
   - The options page will automatically open on first install
   - Enter your Gemini API key and click "Save Settings"
   - If it doesn't open automatically, right-click the extension icon → `Options`

## 🔑 Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Paste it in the extension's options page

**Note**: Keep your API key secure and never share it publicly.

## 📖 Usage

1. **Navigate** to any webpage you want to summarize
2. **Click** the extension icon in your Chrome toolbar
3. **Select** your preferred summary type:
   - Brief (2-3 sentences)
   - Detailed (comprehensive)
   - Bullet Points (organized list)
4. **Click** "Summarize" and wait for the AI to process the content
5. **Copy** the summary using the "Copy" button if needed

### Tips for Best Results

- Works best with articles, blog posts, and content-rich pages
- The extension extracts text from `<article>` tags or all `<p>` paragraphs
- Content is limited to 20,000 characters for optimal performance
- Reload the page if the content script isn't available

## 📁 Project Structure

```
website-summarizer-chrome-extension/
├── manifest.json          # Extension configuration
├── popup.html             # Main popup interface
├── popup.js               # Popup logic and API integration
├── content.js             # Content script for text extraction
├── background.js          # Background service worker
├── options.html           # Settings/options page
├── options.js             # Options page logic
├── icon.png               # Extension icon
└── README.md              # This file
```

## 🔧 Technical Details

- **Manifest Version**: 3
- **API Used**: Google Gemini 2.5 Flash (`gemini-2.5-flash:generateContent`)
- **Storage**: Chrome Sync Storage (for API key)
- **Permissions**:
  - `activeTab`: Access to current tab content
  - `tabs`: Query active tabs
  - `scripting`: Inject content scripts
  - `storage`: Store API key securely
  - `host_permissions`: Access all URLs for content extraction

## 🛠️ How It Works

1. **Content Extraction**: The `content.js` script runs on all web pages and extracts text content
2. **User Interaction**: User selects summary type and clicks "Summarize" in the popup
3. **Text Processing**: The extension retrieves extracted text from the content script
4. **API Call**: Text is sent to Google's Gemini API with appropriate prompts
5. **Display**: The generated summary is displayed in the popup interface

## 🐛 Troubleshooting

### "No API key set" Error
- Go to extension options and add your Gemini API key
- Right-click extension icon → `Options`

### "Content script not available" Error
- Reload the webpage you're trying to summarize
- The content script needs to be injected on page load

### "Couldn't extract text from this page" Error
- The page might not have extractable content
- Try a different webpage with more text content

### API Errors
- Verify your API key is correct
- Check if you have API quota remaining
- Ensure your API key has proper permissions

## 🔒 Privacy & Security

- **API Key Storage**: Your API key is stored locally in Chrome's sync storage
- **Data Transmission**: Page content is sent to Google's Gemini API for processing
- **No Data Collection**: The extension doesn't collect or store any personal data
- **Open Source**: You can review all code to ensure privacy

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📝 License

This project is open source and available for personal and commercial use.

## 🙏 Acknowledgments

- Powered by [Google Gemini AI](https://ai.google.dev/)
- Built with Chrome Extension Manifest V3

## 📧 Support

If you encounter any issues or have questions:
1. Check the Troubleshooting section above
2. Review the code comments
3. Open an issue on the repository

---

**Made with ❤️ for efficient web browsing**

