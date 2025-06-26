import { GameMechanicOption } from '../config';

interface ComingSoonProps {
  state: {
    mechanic: GameMechanicOption | null;
  };
}

export default function ComingSoonPage({ props }: { props: ComingSoonProps }) {
  if (!props) {
    console.error('ComingSoonPage: props is undefined');
    return null;
  }

  const { state } = props;
  const mechanic = state.mechanic;

  if (!mechanic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Mechanic Not Found</h1>
          <p className="text-gray-600">The requested game mechanic could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <a 
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span>←</span>
                <span>Back to Home</span>
              </a>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                {mechanic.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${mechanic.color} rounded-full text-white text-3xl mb-8`}>
            {mechanic.icon}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Coming Soon
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The {mechanic.title} creator is currently under development. 
            We're working hard to bring you this powerful game mechanic generator.
          </p>

          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              What to expect:
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mechanic.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Want to be notified when it's ready?
            </h3>
            <p className="text-blue-700 mb-4">
              For now, you can explore our fully-featured Battle Pass creator to see what's possible.
            </p>
            <a 
              href="/mechanics/battle_pass"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Battle Pass Creator
            </a>
          </div>

          <div className="text-center">
            <p className="text-gray-500">
              Estimated completion: Q2 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 