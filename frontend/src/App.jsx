import React from 'react'
import { useState } from 'react'


function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white">
          🏏 Cricket Live
        </h1>

        <p className="mt-4 text-xl text-slate-400">
          Tailwind CSS is working!
        </p>

        <button className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
          Live Matches
        </button>
      </div>
    </div>
  )
}

export default App
