
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, CreditCard, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);

  const accounts = [
    {
      id: 1,
      name: 'Compte Courant',
      type: 'courant',
      balance: 15420.50,
      currency: '€',
      cardNumber: '**** **** **** 2841'
    },
    {
      id: 2,
      name: 'Livret A',
      type: 'epargne',
      balance: 8950.00,
      currency: '€',
      rate: '3%'
    },
    {
      id: 3,
      name: 'Compte Entreprise',
      type: 'professionnel',
      balance: 45280.75,
      currency: '€',
      cardNumber: '**** **** **** 1205'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'credit',
      description: 'Virement reçu - Salaire',
      amount: 3200.00,
      date: '2024-06-07',
      account: 'Compte Courant'
    },
    {
      id: 2,
      type: 'debit',
      description: 'Prélèvement EDF',
      amount: -120.50,
      date: '2024-06-06',
      account: 'Compte Courant'
    },
    {
      id: 3,
      type: 'credit',
      description: 'Intérêts Livret A',
      amount: 15.20,
      date: '2024-06-05',
      account: 'Livret A'
    },
    {
      id: 4,
      type: 'debit',
      description: 'Achat en ligne - Amazon',
      amount: -89.99,
      date: '2024-06-05',
      account: 'Compte Courant'
    }
  ];

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bonjour, Jean Dupont</h1>
          <p className="text-muted-foreground mt-1">Voici un aperçu de vos comptes</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowBalance(!showBalance)}
          className="flex items-center space-x-2"
        >
          {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showBalance ? 'Masquer' : 'Afficher'}</span>
        </Button>
      </div>

      {/* Total Balance Card */}
      <Card className="banking-gradient text-white card-shadow-lg animate-slide-up">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Solde total</p>
              <p className="text-3xl font-bold">
                {showBalance ? `${totalBalance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €` : '••••••••'}
              </p>
              <div className="flex items-center mt-2 text-white/90">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+2.5% ce mois</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm">Dernière mise à jour</p>
              <p className="text-sm text-white/90">Aujourd'hui 14:30</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accounts Grid */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Vos comptes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account, index) => (
            <Card key={account.id} className="card-shadow hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{account.name}</CardTitle>
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-foreground">
                    {showBalance ? `${account.balance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} ${account.currency}` : '••••••'}
                  </p>
                  {account.cardNumber && (
                    <p className="text-sm text-muted-foreground">{account.cardNumber}</p>
                  )}
                  {account.rate && (
                    <p className="text-sm text-accent font-medium">Taux: {account.rate}</p>
                  )}
                  <div className="pt-2">
                    <Button size="sm" variant="outline" className="w-full">
                      Voir détails
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="flex flex-col items-center space-y-2 h-auto py-4 banking-gradient">
              <ArrowUpRight className="w-6 h-6" />
              <span>Virement</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
              <ArrowDownLeft className="w-6 h-6" />
              <span>Dépôt</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
              <CreditCard className="w-6 h-6" />
              <span>Nouvelle carte</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
              <TrendingUp className="w-6 h-6" />
              <span>Investir</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="card-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transactions récentes</CardTitle>
            <Button variant="ghost" size="sm">Voir tout</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-accent/20' : 'bg-destructive/20'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowDownLeft className={`w-5 h-5 ${transaction.type === 'credit' ? 'text-accent' : 'text-destructive'}`} />
                    ) : (
                      <ArrowUpRight className={`w-5 h-5 ${transaction.type === 'credit' ? 'text-accent' : 'text-destructive'}`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.account} • {transaction.date}</p>
                  </div>
                </div>
                <p className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-accent' : 'text-destructive'
                }`}>
                  {transaction.type === 'credit' ? '+' : ''}{transaction.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
