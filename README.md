# Swimlane -Enhanced Drag and Drop UI App

## Overview

The Swimlane Drag and Drop App is a web-based application that allows users to organize and manage blocks within customizable lanes. Users can define rules to control block movement between lanes and visualize changes in a dynamic interface. The app is built with React, Chakra UI, and `react-dnd` for drag-and-drop functionality.

## Features

- **Drag and Drop**: Move blocks between lanes with support for touch and desktop interactions.
- **Customizable Lanes**: Add and manage multiple lanes for organizing blocks.
- **Block Management**: Add, move, and delete blocks within lanes.
- **Rules Engine**: Define rules to control block movement between lanes (e.g., allow or deny actions).
- **Responsive Design**: Adaptable UI for both mobile and desktop devices.

## Technologies

- **React**: JavaScript library for building user interfaces.
- **Redux toolkit**: For managing complex state of application
- **Chakra UI**: Component library for building accessible and responsive UIs.
- **react-dnd**: Library for drag-and-drop functionality.
- **react-dnd-html5-backend**: HTML5 backend for desktop drag-and-drop.
- **react-dnd-touch-backend**: Backend for touch devices.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/shriharijadhav/swimlane_ui_app.git
    cd swimlane-app
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    ```

    The app will be available at `Localhost` in your browser.

## Usage

1. **Adding Blocks**: Enter a name for the block, select a lane, and click the "Add Block" button.
2. **Moving Blocks**: Drag blocks between lanes to reorganize them.
3. **Deleting Blocks**: Click the delete button on a block to remove it from the lane.
4. **Managing Rules**: Define rules to control block movement:
    - Select the source and destination lanes.
    - Choose the action (allow or deny) for the movement.
    - Click the "Add Rule" button to apply the rule.

## File Structure

- `src/`: Contains all the source code for the application.
  - `components/`: Contains reusable UI components like `Lane`, `MovableItem`, and `MoveBlockModal`.
  - `App.js`: Main component that integrates all functionalities.
  - `index.js`: Entry point for the React application.

## Contributing

1. **Fork the repository**
2. **Create a feature branch**

    ```bash
    git checkout -b feature/your-feature
    ```

3. **Commit your changes**

    ```bash
    git commit -am 'Add new feature'
    ```

4. **Push to the branch**

    ```bash
    git push origin feature/your-feature
    ```

5. **Create a pull request**


## Acknowledgments

- **Chakra UI** for the beautiful and accessible components.
- **React DnD** for the drag-and-drop functionality.

