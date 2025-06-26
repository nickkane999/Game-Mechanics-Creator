'use client';

import { GAME_MECHANICS } from "../lib/mechanics/config";
import { useHomePage } from "../app/hooks/useHomePage";

export default function Home() {
  const { state, handlers } = useHomePage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Game Mechanics Creator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Generate database schemas, SQL migrations, and TypeScript service functions 
            for popular video game mechanics. Build scalable game backends with customizable 
            field names and hardcoded functionality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAME_MECHANICS.map((mechanic) => (
            <div
              key={mechanic.id}
              className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${mechanic.color}`}></div>
              
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${mechanic.color} rounded-lg text-white text-2xl`}>
                    {mechanic.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {mechanic.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span 
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          mechanic.status === 'available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {mechanic.status === 'available' ? '✓ Available' : '⏳ Coming Soon'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {mechanic.description}
                </p>

                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {mechanic.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="text-green-600">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {mechanic.features.length > 3 && (
                      <li className="text-xs text-gray-500">
                        +{mechanic.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex space-x-3">
                  {mechanic.status === 'available' ? (
                    <a
                      href={mechanic.route}
                      className={`flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r ${mechanic.color} text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      Create Now
                    </a>
                  ) : (
                    <a
                      href={mechanic.route}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </a>
                  )}
                  
                  {mechanic.status === 'available' && (
                    <a
                      href={`${mechanic.route}?tab=preview`}
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Preview
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our tool generates production-ready database schemas and TypeScript code 
              tailored for your game's specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg text-blue-600 text-xl mb-4">
                ⚙️
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Customize
              </h3>
              <p className="text-gray-600 text-sm">
                Configure field names, data types, and game-specific parameters 
                to match your existing architecture.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg text-green-600 text-xl mb-4">
                🗃️
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Generate
              </h3>
              <p className="text-gray-600 text-sm">
                Get MySQL schemas, migration scripts, and TypeScript service 
                classes with full CRUD operations.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg text-purple-600 text-xl mb-4">
                🚀
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Deploy
              </h3>
              <p className="text-gray-600 text-sm">
                Copy the generated code directly into your project and start 
                building your game features immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
