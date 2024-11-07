export default function AdvertisingCard() {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="w-full overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg">
        <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="text-3xl md:text-5xl font-bold text-white text-center animate-pulse">
            Create Your Custom Stickers! ✨
          </div>
        </div>
        <div className="p-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-slide-in">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
                Turn Your Art Into Amazing Stickers
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🎨</span>
                  <p className="text-lg text-gray-600">
                    Upload any design - from doodles to digital art
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">✂️</span>
                  <p className="text-lg text-gray-600">
                    High-quality die-cut stickers with premium materials
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📦</span>
                  <p className="text-lg text-gray-600">
                    Fast shipping worldwide - Get your stickers in days
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center">
                  <span className="mr-2">📤</span> Upload Design
                </button>
                <button className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center">
                  <span className="mr-2">💡</span> Start Designing
                </button>
              </div>
            </div>

            <div className="relative h-64 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl p-6">
                <div className="w-full h-full flex items-center justify-center relative animate-float">
                  <div className="absolute w-32 h-32 bg-white rounded-full shadow-lg transform -rotate-12 top-1/4 left-1/4 flex items-center justify-center text-4xl animate-bounce-slow">
                    🌟
                  </div>
                  <div className="absolute w-24 h-24 bg-white rounded-full shadow-lg transform rotate-12 bottom-1/4 right-1/4 flex items-center justify-center text-4xl animate-bounce-delayed">
                    🎨
                  </div>
                  <div className="absolute w-28 h-28 bg-white rounded-full shadow-lg transform -rotate-6 top-1/3 right-1/3 flex items-center justify-center text-4xl animate-bounce">
                    ✨
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
