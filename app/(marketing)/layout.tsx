import Header from '@/components/marketing/Header'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
     <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="">
        <div className="container mx-auto px-4 py-6 text-center">
          © 2024 QUA2. All rights reserved.
        </div>
      </footer>
    </div>
  )
}