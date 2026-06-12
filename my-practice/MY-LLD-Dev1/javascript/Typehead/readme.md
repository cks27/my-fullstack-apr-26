# Typeahead Search

## Problem Statement

Build a Typeahead Search component that displays relevant search suggestions as the user types into an input field.

The component should fetch matching results from an API and render them in a dropdown below the search box. Suggestions should update dynamically based on the latest query entered by the user.

---

## Requirements

### Core Features

* Create a search input field.
* Fetch suggestions from an API whenever the user enters text.
* Display the fetched suggestions in a dropdown list.
* Clear suggestions when the input is empty.
* Handle loading and error states appropriately.

### Performance Optimizations

* Implement debouncing to avoid making an API request on every keystroke.
* Prevent stale API responses from overriding newer search results.
* Cache previously fetched queries to reduce unnecessary network requests.

### User Experience

* Show a loading indicator while data is being fetched.
* Display a message when no results are found.
* Ensure the dropdown updates smoothly while the user types.

---

## Bonus Features

* Highlight the matching portion of each suggestion.
* Support keyboard navigation:

  * Arrow Up
  * Arrow Down
  * Enter
  * Escape
* Close the dropdown when the user clicks outside the component.
* Limit the number of visible suggestions.

---

## Example

### User Input

```text
s
sa
sam
sams
```

### Suggestions

```text
Samsung Galaxy S24
Samsung Galaxy A55
Samsung Smart TV
Samsung Watch
```

As the user continues typing, the displayed suggestions should always correspond to the latest query. Older API responses should be ignored or cancelled if they arrive after newer requests.

---

## Expected Learning Outcomes

By completing this challenge, you will gain experience with:

* DOM Manipulation
* Event Handling
* Debouncing
* Fetch API
* Async/Await
* AbortController
* Caching
* State Management
* Handling Race Conditions
* Building Responsive User Interfaces
