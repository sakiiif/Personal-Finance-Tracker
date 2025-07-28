import Link from 'next/link';

export default function Home() {
  // Slider data
  const sliderData = [
    {
      image: '/admin6.avif',
      title: 'Manage Users',
      description: 'Efficiently manage your users with roles and permissions.',
    },
    {
      image: '/admin2.avif',
      title: 'Analyze Data',
      description: 'Track and analyze your data with real-time reports.',
    },
    {
      image: 'admin3.avif',
      title: 'Dashboard Insights',
      description: 'Gain insights into your dashboard for better decision-making.',
    },
    {
      image: '/admin5.avif',
      title: 'Settings Customization',
      description: 'Personalize your admin settings to suit your needs.',
    },
    {
      image: 'admin7.avif',
      title: 'Security',
      description: 'Ensure the security of your data and user privacy.',
    },
  ];



  return (
    <div>

      <header className="bg-white  p-4 flex justify-between shadow-md items-center z-50 px-4 md:px-10 xl:px-16 2xl:px-48">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            className="h-12"
          />
        </div>

        {/* Sign In / Sign Up Buttons with Links */}
        <div className="flex space-x-4">
          <Link
            href="/sign-in"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-lg font-semibold"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300 text-lg font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </header>
    <div className="min-h-screen flex flex-col px-4 md:px-10 xl:px-16 2xl:px-44">
     

      {/* Content Section */}
      <main className="flex-grow p-8">
        {/* Big Image Section */}
        <section className="mb-12 relative">
          <img
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" // Admin-themed image from Unsplash
            alt="Welcome"
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
          {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
              Welcome to Admin Dashboard
            </h1>
          </div>
        </section>

        {/* Slider Section */}
        <section className="mb-12">
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-6">Featured Content</h2>
            <div className="flex overflow-x-auto space-x-6 p-4">
              {sliderData.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 h-48 md:w-80 md:h-64 bg-white rounded-lg shadow-md flex items-center justify-center relative"
                >
                  <img
                    src={item.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-xl font-bold">
                    <div>
                      <h3 className="text-2xl">{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Content Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
              title: 'User Management',
              description:
                'Efficiently manage users, roles, and permissions with our intuitive admin tools.',
              icon: '👤',
            },
            {
              title: 'Analytics',
              description:
                'Track and analyze your data with real-time dashboards and reports.',
              icon: '📊',
            },
            {
              title: 'Settings',
              description:
                'Customize your dashboard and configure settings to suit your needs.',
              icon: '⚙️',
            }].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Section */}
    </div>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} Admin Dashboard. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
