
import { Button } from '@/components/ui/button';
import { LayoutDashboard, CreditCard, ArrowLeftRight, History, Settings, Wallet } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'accounts', label: 'Comptes', icon: CreditCard },
    { id: 'transfers', label: 'Virements', icon: ArrowLeftRight },
    { id: 'deposits', label: 'Retraits/Dépôts', icon: Wallet },
    { id: 'history', label: 'Historique', icon: History },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 banking-gradient rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">BanqueDigitale</h1>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(item.id)}
                  className={activeTab === item.id ? "banking-gradient" : ""}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Items */}
        <div className="md:hidden pb-4">
          <div className="grid grid-cols-3 gap-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col h-auto py-2 ${activeTab === item.id ? "banking-gradient" : ""}`}
                >
                  <IconComponent className="w-4 h-4 mb-1" />
                  <span className="text-xs">{item.label.split('/')[0]}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
