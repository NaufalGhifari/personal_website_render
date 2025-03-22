const Pricing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Pricing</h1>
        <p className="text-xl text-gray-600 mb-4">
          Guess what? It's all FREE! 🎉
        </p>
        <p className="text-lg text-gray-700 mb-6">
          No hidden fees, no subscriptions, just pure awesomeness at no cost!
        </p>
        <a href="/pharmacy/" className="text-blue-500 hover:text-blue-700 underline">
          Explore for Free
        </a>
      </div>
    </div>
  );
};

export default Pricing;
