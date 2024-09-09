import { Button } from '@/components/ui/button'
import { BarChart2, CheckCircle, CreditCard, Users } from 'lucide-react'

export default function Home() {
  return (
    <main>
    {/* Hero section */}
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Simplify Your Hostel Management with QUA2
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Streamline bookings, check-ins, and finances all in one powerful platform. Boost your efficiency and enhance guest experiences.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button>Get Started</Button>
            <a href="#features" className="text-sm font-semibold leading-6 ">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Features section */}
    <div id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Comprehensive Solution</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to manage your hostel
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            QUA2 provides a complete suite of tools designed specifically for hostel management, helping you save time and increase revenue.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {[
              {
                name: 'Real-time Availability',
                description: 'Instantly update and view room availability across all your channels.',
                icon: CheckCircle,
              },
              {
                name: 'Seamless Check-ins',
                description: 'Streamline the check-in process for a smooth guest experience.',
                icon: Users,
              },
              {
                name: 'Financial Management',
                description: 'Easily track payments, generate invoices, and manage your finances.',
                icon: CreditCard,
              },
              {
                name: 'Insightful Analytics',
                description: 'Gain valuable insights with comprehensive reporting and analytics.',
                icon: BarChart2,
              },
            ].map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>

    {/* Testimonial section */}
    <div id="testimonials" className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-400">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Loved by hostel owners worldwide
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Sarah Thompson',
                role: 'Owner, Backpackers Paradise',
                quote: "QUA2 has revolutionized how we manage our hostel. It's intuitive, powerful, and has significantly improved our efficiency.",
              },
              {
                name: 'Michael Chen',
                role: 'Manager, Urban Oasis Hostel',
                quote: "The real-time availability feature has been a game-changer for us. We've seen a 30% increase in bookings since using QUA2.",
              },
              {
                name: 'Emma Rodriguez',
                role: 'Founder, Sunshine Hostels',
                quote: "The financial management tools in QUA2 have made it so much easier to keep track of our finances and make informed decisions.",
              },
            ].map((testimonial) => (
              <figure key={testimonial.name} className="rounded-2xl bg-gray-800 p-8 text-sm leading-6">
                <blockquote className="text-gray-300">
                  <p>{`"${testimonial.quote}"`}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-gray-400">{testimonial.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Pricing section */}
    <div id="pricing" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the plan that&apos;s right for your hostel. All plans include our core features.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Lifetime membership</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Get full access to all of QUA2&apos;s features and future updates. Perfect for growing hostels.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What&apos;s included</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {[
                'Real-time availability management',
                'Seamless check-in and check-out',
                'Financial tracking and reporting',
                'Analytics and insights dashboard',
                'Multi-channel integration',
                '24/7 customer support',
              ].map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckCircle className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Pay once, use forever</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">$349</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                </p>
                <Button className="mt-10 w-full">Get access</Button>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  )
}