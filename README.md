# Productivity Apps
A compact, focused productivity suite that combines three tools in one place: a Todo List, a Goal Progress tracker, and a Pomodoro Timer. Designed for students, makers, and anyone who wants a lightweight workflow for capturing tasks, tracking long-term goals, and powering focused work sessions.

**Tech stack**:  JavaScript, Redux, Redux, Tailwind CSS, Framer Motion
## Demo/Quick Intro
**Live Demo :** https://frontier101.github.io/productivity-apps/
In One Sentence: Capture a task --> link it to a goal --> use the Pomodoro timer to focus and track sessions.

![ToDo App](https://github.com/Frontier101/screenshots/blob/main/ToDo%20app.png?raw=true) 
![ToDo App](https://github.com/Frontier101/screenshots/blob/main/Goal%20progress.png?raw=true) 
![ToDo App](https://github.com/Frontier101/screenshots/blob/main/Pomodoro%20App.png?raw=true)
## Features (What's implemented)
### Todo List
- Custom check animation for completing todos.
- Delete a todo.
- Five sorting filters: **Categories**, **Time**, **Goal**, **Priority**, and **Status**.
- Add New Todo form (Name, Category, Priority, Related Goal).
- Category Settings: Add New Category, Clear All Categories, and view the current categories.
### Goal Progress
- Animated Progress Circle + numeric percentage for each goal (Framer Motion).
- Shows goal name, deadline (day + month), completed steps / total steps.
- Edit / Delete goal actions.
- Expandable goal view revealing: deadline year, days left, notes, and the list/count of related completed tasks (uses 'Unknown' for tasks added without a name).
- Goal sorted by deadline groups (This month, Next month, Next 3 months, ect.).
- Filters: **In Progress**, **Overdue**, **Achieved**.
- Add New Goal form (Name, Total Steps, Completed Tasks, Deadline, Notes).
### Pomodoro Timer
- Virtual stopwatch + digital timer and central Play/Pause.
- Named timers and pre-timer settings.
- Focus & Break modes with a small session indicator - completed sessions color the indicator (green for Focus, blue for Break).
- Click any timer to expand it full-screen and hide the timer list.
- Full-size timer view: stopwatch, sessions duration, separated Play/Pause + Reset, Focus/Break controls, metrics (Elapsed, Remaining, Estimated End), related Task, Edit / Delete buttons.
- Add New Timer form (Name, Number of Sessions, Focus duration, Break duration, Related Todo optional).
### Persistence, Validation & Reliability
- Persistent storage is implemented so users keep their todos, goals, and timers between sessions.
- Input validation and friendly error messages are enforced across forms (no empty names, sensible durations, duplicate-category handling).
### Mobile / UX Improvements
- On large screens ( >= 1024px) forms are visible inline.
- On smaller screens, forms are hidden behind a **Plus** button; clicking toggles the form (plus icon rotates 45deg -> becomes an X to cancel).
- Forms show as a clear model or full-width panel on mobile for a focused experience.
## Known limitations & roadmap (what's next)
- **Performance (planned)**: large lists are not yet virtualized. Virtualization (react-window / react-virtualized) is planned to keep the UI snappy with long lists.
- **Accessibility (planned)**: keyboard-first navigation, ARIA improvements, and a reduced-motion preference toggle will be added next.
## Installation & quick start
```bash
# clone
git clone <your-repo-url>
cd your-repo

# install
npm install

# run locally
npm start

# build
npm run build
```
## Usage / Quick flows
- Create a goal -> add total steps, already completed steps, deadline and notes;
- Create a todo -> set category, priority and optionally link to a goal.
- Add a Pomodoro Timer -> start sessions and monitor Elapsed/ Remaining/ Estimated End Time.
