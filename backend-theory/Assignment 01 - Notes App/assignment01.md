# Assignment 01 – Notes App

## Objective

Build a simple Notes App using browser `localStorage`, `sessionStorage`, and JSON.

## Source Tutorial

The assignment is based on the Backend Development tutorial:

**LocalStorage, SessionStorage and JSON**

The final task is to build a Notes App.

---

## Task 12 – Final Task: Build a Notes App

### Aim

The aim of this task is to create a Notes App that can store and manage notes using browser storage.

The application should demonstrate the use of:

- `localStorage`
- `sessionStorage`
- JSON
- JavaScript
- DOM manipulation

### Features

The Notes App should allow the user to:

1. Add a new note.
2. Display saved notes.
3. Store notes using browser storage.
4. Retrieve notes when the page is opened again.
5. Delete notes.
6. Use JSON to store structured note data.

### Working Principle

When the user creates a note, the note is represented as a JavaScript object.

Example:

```javascript
const note = {
  title: "My First Note",
  content: "This is my first note.",
};
```

Multiple notes can be stored in an array:

```javascript
const notes = [
  {
    title: "My First Note",
    content: "This is my first note.",
  },
];
```

Since browser storage stores data as strings, the JavaScript object/array is converted into JSON using:

```javascript
JSON.stringify(notes);
```

The JSON string can then be stored in `localStorage`.

To retrieve the data, the JSON string is converted back into a JavaScript object using:

```javascript
JSON.parse(savedNotes);
```

### Basic Storage Flow

```text
User creates note
       ↓
JavaScript object
       ↓
Notes array
       ↓
JSON.stringify()
       ↓
localStorage
       ↓
JSON.parse()
       ↓
Notes array
       ↓
Display notes
```

### Example

Store notes:

```javascript
localStorage.setItem("notes", JSON.stringify(notes));
```

Retrieve notes:

```javascript
const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
```

### Conclusion

The Notes App demonstrates how browser-side storage can be used to persist application data. JSON provides a convenient format for converting JavaScript objects and arrays into strings that can be stored in `localStorage` and later reconstructed using `JSON.parse()`.

The task also demonstrates practical use of JavaScript, DOM manipulation, JSON serialization/deserialization, and browser storage.
