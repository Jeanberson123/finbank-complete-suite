
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import Accounts from '@/components/Accounts';
import Transfers from '@/components/Transfers';
import Deposit from '@/components/Deposit';
import History from '@/components/History';
import Settings from '@/components/Settings';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'accounts':
        return <Accounts />;
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
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto max-w-7xl">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
