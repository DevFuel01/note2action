# Note2Action 🚀

Transform unstructured notes into clear, actionable tasks using AI.

Note2Action is a full-stack AI productivity web application that leverages Google Gemini to automatically extract actionable tasks from meeting notes, class notes, brainstorming sessions, or any unstructured text.

![Note2Action](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

- **AI-Powered Task Extraction**: Uses Google Gemini to intelligently identify actionable items
- **Smart Prioritization**: Automatically classifies tasks as high, medium, or low priority
- **Deadline Detection**: Extracts mentioned deadlines and timeframes
- **Clean, Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **Real-time Processing**: Fast conversion with loading states and error handling
- **Dark Mode Support**: Automatically adapts to system preferences
- **Production Ready**: Optimized for deployment on Vercel or similar platforms

## 🎯 Core Functionality

1. **Paste Notes**: Enter any unstructured text (meeting notes, ideas, etc.)
2. **AI Processing**: Google Gemini analyzes and extracts actionable tasks
3. **View Results**: Tasks displayed with priority levels and deadlines
4. **Take Action**: Clear, organized task list ready for execution

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **AI**: Google Gemini API (gemini-1.5-flash model)
- **Deployment**: Vercel-ready configuration

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

## 🚀 Getting Started

### 1. Install Node.js

If you don't have Node.js installed:

1. Visit [nodejs.org](https://nodejs.org/)
2. Download and install the LTS version
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### 2. Install Dependencies

Navigate to the project directory and install dependencies:

```bash
cd Note2Action
npm install
```

This will install all required packages including:
- Next.js
- React
- TypeScript
- Tailwind CSS
- Google Generative AI SDK

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   copy .env.local.example .env.local
   ```

2. Open `.env.local` and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

**How to get a Gemini API Key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in `.env.local`

### 4. Run the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📖 Usage

### Example Input

```
Meeting notes from project sync:
- Need to finalize the project proposal by Friday (urgent)
- Schedule a follow-up meeting with the team next week
- Review the budget when you have time
- Sarah mentioned we should update the documentation
```

### Expected Output

The AI will extract tasks like:
- **Finalize project proposal** (High Priority, Deadline: Friday)
- **Schedule follow-up meeting** (Medium Priority, Deadline: next week)
- **Review budget** (Low Priority)
- **Update documentation** (Medium Priority)

## 🎨 UI Features

- **Gradient Background**: Modern blue-to-purple gradient design
- **Smooth Animations**: Fade-in and slide-up effects for better UX
- **Color-Coded Priorities**:
  - 🔴 High: Red badges for urgent tasks
  - 🟡 Medium: Yellow badges for moderate urgency
  - 🟢 Low: Green badges for flexible tasks
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode**: Automatic dark theme support

## 🏗️ Project Structure

```
Note2Action/
├── app/
│   ├── api/
│   │   └── convert/
│   │       └── route.ts          # Gemini API integration
│   ├── components/
│   │   └── TaskCard.tsx          # Task display component
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main homepage
├── types/
│   └── index.ts                  # TypeScript type definitions
├── .env.local.example            # Environment variable template
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variable:
   - Name: `GEMINI_API_KEY`
   - Value: Your Gemini API key
6. Click "Deploy"

Your app will be live in minutes!

### Alternative Deployment Options

- **Netlify**: Similar process to Vercel
- **Railway**: Great for full-stack apps
- **Self-hosted**: Run `npm run build` then `npm start`

## 🔧 Configuration

### Customizing the AI Prompt

Edit `app/api/convert/route.ts` to modify how the AI extracts tasks. The current prompt is optimized for:
- Identifying actionable items
- Ignoring commentary
- Detecting urgency and deadlines
- Returning structured JSON

### Styling Customization

- **Colors**: Edit `tailwind.config.ts` to change the color scheme
- **Animations**: Modify animation timings in `tailwind.config.ts`
- **Layout**: Update `app/page.tsx` for UI changes

## 🐛 Troubleshooting

### "API key not configured" error
- Ensure `.env.local` exists in the project root
- Verify `GEMINI_API_KEY` is set correctly
- Restart the development server after adding the key

### "No actionable items detected"
- Try adding more specific action-oriented language
- Include clear tasks like "need to", "should", "must"
- Add urgency indicators like "urgent", "ASAP", "by Friday"

### Tasks not displaying
- Check browser console for errors
- Verify the API response in Network tab
- Ensure JSON parsing is successful

## 🤝 Contributing

This is a hackathon/portfolio project, but suggestions are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Google Gemini**: For powerful AI capabilities
- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For beautiful, utility-first styling

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the [Google Gemini API documentation](https://ai.google.dev/docs)
3. Check [Next.js documentation](https://nextjs.org/docs)

---

**Built with ❤️ using Next.js, TypeScript, and Google Gemini**

*Transform your notes. Boost your productivity. Take action.*
