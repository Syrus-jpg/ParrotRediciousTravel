# 🦜 Parrot Redicious Travel

A playful AI-powered parrot postcard generator game built with Devvit + ChatGPT + Midjourney. Pick your favorite parrot, send them to exotic Reddit planets, and receive hilarious postcards based on trending posts — all with a cup of Holy Juice 🍷. (Redicious = Reddit + Ridicious)

---

## 📽️ Demo Video on Youtube

 **https://youtu.be/oEpA4Y18owkv

---

## 🚀 App Overview

**Parrot Redicious Travel** is a Reddit Devvit app designed as **an interactive, animated postcard generator powered** by LLM and diffusion APIs. The core mechanics include:

- Choose your parrot 🦜 (Cockatoo, Caique, Alexandrine)
- Give it a personality: **nerd🤓, romantic🌹, emo😢, crazy💃, free-associative🤔, chatterbox💬**
- Send it to travel across 8 different Reddit-themed planets 🌍
- Wait for AI-generated postcards with Midjourney-style images + ChatGPT comments
- Play with some redicious bug friends and earn medals
- Earn and use "Holy Juice" 🍷 to revive fainted parrots after overtravel
- Enjoy fun dialogues, video animations, and collect digital souvenirs

---

## 🧠 Tech Stack

- **Frontend**: React (with Vite), Typescript. Node.js
- **Backend APIs**: ChatGPT API (OpenAI), Midjourney API, Reddit API
- **Devvit**: Reddit's official framework for building web-based interactive apps on Reddit
- **Assets**: Custom-designed MP4 animations, PNG planets, and AI-generated graphics

---

## 🛠️ How to Use

1. Clone this repo

```bash
git clone <https://github.com/yourusername/parrot-redicious-travel.git>
cd parrot-redicious-travel
npm install

```

1. Run the app locally

```bash
npm run dev

```

1. Use `Devvit` to deploy the app to Reddit
    
    👉 Paste this into your Reddit app entry point:
    

```
// ⬇️ Fill in your Devvit entry component here
// TODO: Insert Devvit game logic

```

1. Visit the app on Reddit, interact with your parrot, and enjoy the adventure 🎉

---

## 📁 Project Structure

```
parrot_redicious_travel/
├── assets/
│   ├── images/             # Parrot and planet PNGs
│   └── videos/             # Background MP4 animations
├── public/                 # Public video assets
├── src/                    # Core app logic & components
│   ├── components/         # UI components
│   └── App.tsx             # Main app entry
├── index.html              # App HTML template
├── devvit.yaml             # Devvit config
├── package.json            # Dependencies & scripts
└── README.md               # You're reading it
```

---

## 🎮 Gameplay Flow

1. **Start Screen**: Choose a parrot
2. **Name Yourself + Your Parrot** 🧑‍🚀
3. **Pick a Personality** 💃
4. **Pick a Planet** (r/AskReddit, r/aww, r/funny…)
5. **AI Fetch + Image Generation**
6. **Parrot Returns With a Postcard** 🖼️
7. **You can only travel 3 times a day, If you insist on having your parrot travel for the fourth time or haven't logged in to reddit for a week, the parrot will be faint**
8. **Send Holy Juice to revive fainted parrots**
9. **Meet redicious bug parrots randomly, Collect Medals, History, and More**
10. **Save Some Other Parrots and Gain Their Postcard Gifts🎁**

---

## ✨ Features

- 🧠 Uses real Reddit post content
- 🎨 Midjourney-styled visuals
- 🎭 Personality-matching comments by ChatGPT
- ⏱️ Daily limits and Holy Juice economy
- 💌 Postcard history, medals, and hidden easter eggs

---

## 🔄 Changelog

### v1.0.0 (Initial Submission)

- Core logic + 8-step gameplay complete
- All animations + video integration
- Parrot personality system enabled
- Reddit + ChatGPT + MJ API integrated

---

## 📬 Contact

Made with love by Syrus (Danyue Xun)

Github: Syrus-jpg

"It is said that on the night of training AI, there was a certain wrong file. No one knew its true image, only a feather, an eye, and a string of garbled codes. It is a friend forgotten by AI and an unexpected easter egg in the universe!”

“If you enjoy it, drop some Holy Juice 🍷 for the parrots 🦜 !”