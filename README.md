# 🌟 Motivision

Motivision is a minimalist browser extension that transforms your new tab page into a source of daily inspiration. It seamlessly blends stunning landscape photography from Unsplash with thought-provoking quotes from Quotable, creating a tranquil and motivating start to your browsing sessions.

## ✨ Features

- 🖼️ **Breathtaking Scenery:** Each new tab unveils a captivating landscape image, sourced from Unsplash's extensive library.
- 💡 **Inspiring Quotes:** The Center stage is a carefully selected quote offering daily wisdom and motivation.
- 🧘 **Clean & Focused:** A clutter-free design promotes a sense of calm and focus, helping you begin your online journey with intention.

## 📸 Screenshots

![Screenshot 1](/screenshot1.png)  
![Screenshot 2](/screenshot2.png)  


## 🛠️ Installation

**Chrome Web Store** :

[![Available in the Chrome Web Store](https://developer.chrome.com/static/docs/webstore/branding/image/mPGKYBIR2uCP0ApchDXE.png)](https://chrome.google.com/webstore/detail/motivision/dkddhdionmphjmhmdoichopengpioaae)

**Firefox Addon** :

[![Available in the Firefox Add-ons Store](https://blog.mozilla.org/addons/files/2015/11/get-the-addon.png)](https://addons.mozilla.org/en-US/firefox/addon/motivision/)

## 🚀 Usage

After installation, open a new tab to experience the harmonious blend of imagery and insightful quotes.

## 🤝 Contributing

We welcome contributions from the community!  
- 🐛 **Bug Reports:** If you encounter any issues, please report them by opening an issue.  
- 🌟 **Feature Requests:** Have an idea for a new feature? Feel free to suggest it by opening an issue.  
- 🛠️ **Code Contributions:** To contribute code, fork the repository, make your changes, and submit a pull request.  

## 🧑‍💻 Development

Motivision leverages Vercel for secure API key management.

### 📂 Clone the Repository

`git clone [https://github.com/kxvinthxngxvel/Motivision](https://github.com/kxvinthxngxvel/Motivision)`
`cd Motivision`


### 📦 Install Dependencies

`npm install`


### 🔑 Set Up Environment Variables

1. Create a `.env.local` file in the project's root directory.  
2. Populate it with the following environment variables, substituting the placeholders with your actual API keys from Unsplash and Quotable:

`UNSPLASH_ACCESS_KEY=your_unsplash_access_key`

### 🖥️ Run the Development Server

`npm run dev`

### 🏗️ Build and Deploy

#### 📦 Build the Extension

`npm run build`

#### ☁️ Deploy to Vercel (Optional)

If utilizing Vercel for hosting, ensure you have a Vercel account and the Vercel CLI installed.

1. Link your local project to a Vercel project:

`vercel link`

2. Deploy the project:

`vercel deploy`

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
