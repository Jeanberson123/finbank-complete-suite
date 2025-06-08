
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import Accounts from '@/components/Accounts';
import Transfers from '@/components/Transfers';
import Deposit from '@/components/Deposit';
import History from '@/components/History';
import Settings from '@/components/Settings';
import AuthForm from '@/components/AuthForm';
import UserAccountsManager from '@/components/UserAccountsManager';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 banking-gradient rounded-lg animate-pulse mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'accounts':
        return <UserAccountsManager />;
      case 'transfers':
        return <Transfers />;
      case 'deposits':
        return <Deposit />;
      case 'history':
        return <History />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5">
      <div className="flex items-center justify-between p-4 bg-card border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 banking-gradient rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">BD</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Connecté en tant que</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
        <Button onClick={signOut} variant="outline" size="sm">
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
      </div>
      
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto max-w-7xl">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
