# SpendWise – Personal Expense Tracker

A React Native (Expo) app to record income and expenses, track your balance and review history. Data is stored locally with AsyncStorage.

## Setup

1. Install Node.js (LTS) and the **Expo Go** app on your phone.
2. Clone the repo and install dependencies:
   ```
   git clone https://github.com/diane587/SpendWise.git
   cd SpendWise
   npm install
   ```
3. Start the dev server: `npx expo start`
4. Scan the QR code with Expo Go (phone and computer on the same Wi-Fi).

## Technologies

React Native, Expo, React Navigation (stack + bottom tabs), Context API, React Hooks, FlatList, AsyncStorage, Expo Vector Icons.

## Project Structure

- `App.js` – entry point (provider + navigation)
- `src/navigation` – stack and tab navigators
- `src/context` – global state (transactions, currency, user) and AsyncStorage persistence
- `src/screens` – Welcome, Dashboard, AddTransaction, History, Profile
- `src/components` – reusable UI (AppButton, SummaryCard, FilterTabs, TransactionItem)
- `src/utils` – theme/formatting, storage helpers, validation

## Features

- Add transactions with validation; delete with confirmation
- Balance, income and expenses calculated automatically
- Filter history by All / Income / Expense
- Currency selection and profile name
- Data persists after closing the app

## Screenshots and Screen Recording

[View screenshots and demo video](https://drive.google.com/drive/folders/1MtHrj0va9UmyWx3Zdg1tFPtFGE8f4dnW?usp=drive_link)
