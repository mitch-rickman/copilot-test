# Todo MVC - React & Tailwind CSS

A beautiful and responsive Todo MVC application built with React and styled with Tailwind CSS.

## Features

- ✨ **Modern UI**: Clean, responsive design with smooth animations
- 📱 **Mobile-friendly**: Works great on all screen sizes
- 🎯 **Filter todos**: View all, active, or completed todos
- ✏️ **Edit in place**: Double-click to edit todos
- 📊 **Progress tracking**: See completion percentage and stats
- 💾 **Local storage**: Your todos persist between sessions
- ⚡ **Fast**: Built with Vite for optimal performance

## Technologies Used

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons
- **Local Storage** - Client-side data persistence

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
  ├── components/
  │   ├── TodoInput.jsx      # Todo input form
  │   ├── TodoItem.jsx       # Individual todo item
  │   ├── FilterButtons.jsx  # Filter controls
  │   └── Stats.jsx          # Progress statistics
  ├── App.jsx                # Main application component
  ├── main.jsx              # Application entry point
  └── index.css             # Global styles and Tailwind directives
```

## Usage

- **Add todos**: Type in the input field and press Enter or click the plus icon
- **Mark complete**: Click the circle next to a todo
- **Edit todos**: Double-click on the todo text to edit
- **Delete todos**: Hover over a todo and click the X icon
- **Filter todos**: Use the filter buttons to show all, active, or completed todos
- **Clear completed**: Click "Clear completed" to remove all finished todos
- **Mark all**: Use "Mark all as complete/active" to toggle all todos at once

## Keyboard Shortcuts

- **Enter**: Save when editing a todo
- **Escape**: Cancel editing
- **Tab**: Navigate between elements

Enjoy staying organized! 🎉
