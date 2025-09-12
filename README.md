# Gyanika Student App

This is a student learning dashboard application built with React and TypeScript. It provides an interactive interface for students to access lessons, quizzes, and announcements for different subjects and classes.

## Features

- User authentication and profile management
- Class selection (Class 5 and Class 6)
- Subject-wise lessons and quizzes for Math, English, and Science
- Interactive lesson and quiz navigation
- Announcements and news section
- Language selection support

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- Custom hooks for language support
- Modular component architecture

## Project Structure

- `components/` - React components including Dashboard, LessonModal, QuizModal, ProfileModal, etc.
- `hooks/` - Custom React hooks such as language selector
- `app/` - Main application entry and routing
- `public/` - Static assets
- `styles/` - Global and utility styles

## Usage

1. Clone the repository
2. Install dependencies using your preferred package manager (e.g., `npm install` or `pnpm install`)
3. Run the development server (`npm run dev` or `pnpm dev`)
4. Open the app in your browser at `http://localhost:3000`

## Dashboard Component

The `Dashboard` component is the main interface for students. It allows:

- Switching between tabs: Home, Lessons, Quizzes, Announcements
- Selecting class (5 or 6)
- Viewing subject cards with progress and scores
- Accessing lessons and quizzes for Math, English, and Science
- Viewing announcements and news
- Managing user profile and logout

## Lessons

- Math lessons for Class 5 include topics like numbers, geometry, fractions, etc.
- English lessons for Class 5 include stories and language topics.
- Science lessons for Class 6 include food, materials, and separation of substances.

## Testing

- Verify navigation between tabs and class selection
- Confirm lessons and quizzes display correctly for selected subjects and classes
- Test modals for profile, lessons, and quizzes open and close properly
- Check announcements display and update correctly
- Validate language selector functionality

## Deployment

This project is deployed on Vercel and automatically synced with [v0.app](https://v0.app).

## License

MIT License
