import { ReactNode } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { data: session } = useSession()

  return (
    <div>
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="site-title">
            Car Management
          </Link>
          <nav className="nav-menu">
            {session ? (
              <>
                <Link href="/">My Cars</Link>
                <Link href="/cars/new">New Car</Link>
                <button onClick={() => signOut()} className="btn btn-secondary">
                  Log out
                </button>
              </>
            ) : (
              <button onClick={() => signIn()} className="btn">
                Log in
              </button>
            )}
          </nav>
        </div>
      </header>
      <main className="main-content container">
        {children}
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Car Management App</p>
        </div>
      </footer>
    </div>
  )
}