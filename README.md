
---

# 🚦 Smart Traffic Light Simulator — TOC Project

A web-based **Traffic Signal Simulation System** built using **React, Vite, and Tailwind CSS**.
This project demonstrates key **Theory of Computation (TOC)** principles such as **Finite State Machines (FSM)**, **State Transitions**, **Interrupt Handling**, and **Process Synchronization** through an interactive and visually dynamic traffic signal controller.

The simulator supports normal traffic cycles, pedestrian signals, and emergency overrides with state saving and restoration.

---

## ✨ Features

* 🟢 **Automatic Traffic Cycle**
  North–South and East–West signals follow an FSM-based timed cycle.

* 🚶 **Pedestrian Mode**
  Interrupts normal flow, activates a pedestrian crossing state, then resumes traffic.

* 🚨 **Emergency Override**
  Saves the current phase and timer, switches to emergency mode instantly, and resumes exactly where it stopped.

* ⏱️ **Real-Time Timer**
  Each phase runs on a countdown timer controlled by a custom hook.

* 🔁 **Finite State Machine Implementation**
  Entire system modeled with deterministic transitions.

* 🔔 **Smart Notifications**
  Users receive alerts for events like pedestrian trigger, emergency override, or errors.

* 🎛️ **Intuitive UI Controls**
  Start Simulation
  Reset System
  Trigger Pedestrian Event
  Trigger Emergency Event

---

## 🛠️ Tech Stack

### **Frontend**

* ⚛️ **React** – UI structure and state handling
* ⚡ **Vite** – High-speed development server
* 🎨 **Tailwind CSS** – Modern, fast styling
* 🔄 **Custom React Hook (`useSimulator`)** – Traffic logic + FSM

---

## 📦 Installation & Setup

Follow these steps to run the project locally.

### ✔️ Prerequisites

Ensure you have installed:

* **Node.js** (v16 or above)
* **npm** or **yarn**

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Nishitha-1516/smart-traffic-intersection-controller
cd smart-traffic-intersection-controller
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Run the Development Server

```bash
npm run dev
```

App will run on:

```
http://localhost:5173/
```

---

## 📁 Project Structure

```
smart-traffic-intersection-controller/
│
├── src/
│   ├── components/
│   │   ├── ControlPanel.jsx
│   │   ├── Dashboard.jsx
│   │   ├── NotificationPopup.jsx
│   │   ├── TrafficIntersection.jsx
│   │   └── TrafficLight.jsx
│   ├── hooks/
│   │   └── useSimulator.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── state_transition.png     ← FSM Diagram
├── package.json
├── vite.config.mjs
└── tailwind.config.js
```

### 🔍 Core Logic Explained

The main logic lives inside **`useSimulator.js`**.

### 🎛️ Finite States

```
NS_GREEN
NS_YELLOW
EW_GREEN
EW_YELLOW
PEDESTRIAN
EMERGENCY
```

### 🔄 Transitions

```
NS_GREEN → NS_YELLOW  
NS_YELLOW → EW_GREEN  
EW_GREEN → EW_YELLOW  
EW_YELLOW → NS_GREEN  

PEDESTRIAN → NS_GREEN  
EMERGENCY → previous_saved_state
```

### 🚨 Emergency Handling

Emergency:

* Saves current phase
* Saves remaining time
* Switches instantly to EMERGENCY state
* Restores saved state after completion

### 🚶 Pedestrian Logic

* Interrupts next cycle
* Runs 5 seconds
* Returns to NS_GREEN

---
