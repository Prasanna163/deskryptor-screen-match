import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="bg-card/90 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">DS</span>
              </div>
              <span className="text-xl font-bold text-primary">DESkryptor</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'} 
                asChild
              >
                <Link to="/">Screening</Link>
              </Button>
              <Button 
                variant={isActive('/database-viewer') ? 'default' : 'ghost'} 
                asChild
              >
                <Link to="/database-viewer">Database</Link>
              </Button>
              <Button 
                variant={isActive('/about') ? 'default' : 'ghost'} 
                asChild
              >
                <Link to="/about">About</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            DESkryptor - Molecular Screening Platform for Deep Eutectic Solvents
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Advancing green chemistry research through computational screening
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;