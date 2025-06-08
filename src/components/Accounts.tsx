
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Plus, MoreVertical, Lock, Unlock } from 'lucide-react';
import { useState } from 'react';

const Accounts = () => {
  const [accounts] = useState([
    {
      id: 1,
      name: 'Compte Courant Principal',
      type: 'Compte Courant',
      balance: 15420.50,
      iban: 'FR76 1234 5678 9012 3456 7890 123',
      cardNumber: '4532 1234 5678 2841',
      expiryDate: '12/27',
      status: 'active',
      dailyLimit: 1000,
      isBlocked: false
    },
    {
      id: 2,
      name: 'Livret A',
      type: 'Compte Épargne',
      balance: 8950.00,
      iban: 'FR76 1234 5678 9012 3456 7890 124',
      rate: '3%',
      status: 'active',
      isBlocked: false
    },
    {
      id: 3,
      name: 'Compte Entreprise',
      type: 'Compte Professionnel',
      balance: 45280.75,
      iban: 'FR76 1234 5678 9012 3456 7890 125',
      cardNumber: '4532 1234 5678 1205',
      expiryDate: '09/26',
      status: 'active',
      dailyLimit: 5000,
      isBlocked: false
    }
  ]);

  const getAccountIcon = (type: string) => {
    return <CreditCard className="w-6 h-6" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-accent';
      case 'blocked':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mes Comptes</h1>
          <p className="text-muted-foreground mt-1">Gérez vos comptes et cartes bancaires</p>
        </div>
        <Button className="banking-gradient">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau compte
        </Button>
      </div>

      {/* Accounts List */}
      <div className="space-y-4">
        {accounts.map((account, index) => (
          <Card key={account.id} className="card-shadow hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 banking-gradient rounded-xl flex items-center justify-center">
                    {getAccountIcon(account.type)}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{account.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{account.type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Balance */}
              <div className="bg-secondary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Solde disponible</p>
                <p className="text-2xl font-bold text-foreground">
                  {account.balance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                </p>
                {account.rate && (
                  <p className="text-sm text-accent font-medium mt-1">Taux d'intérêt: {account.rate}</p>
                )}
              </div>

              {/* Account Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">IBAN</p>
                  <p className="font-mono text-sm">{account.iban}</p>
                </div>
                {account.cardNumber && (
                  <div>
                    <p className="text-sm text-muted-foreground">Numéro de carte</p>
                    <p className="font-mono text-sm">{account.cardNumber}</p>
                  </div>
                )}
                {account.expiryDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">Date d'expiration</p>
                    <p className="text-sm">{account.expiryDate}</p>
                  </div>
                )}
                {account.dailyLimit && (
                  <div>
                    <p className="text-sm text-muted-foreground">Limite quotidienne</p>
                    <p className="text-sm">{account.dailyLimit.toLocaleString('fr-FR')} €</p>
                  </div>
                )}
              </div>

              {/* Status and Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${account.status === 'active' ? 'bg-accent' : 'bg-destructive'}`}></div>
                  <span className={`text-sm font-medium ${getStatusColor(account.status)}`}>
                    {account.status === 'active' ? 'Actif' : 'Bloqué'}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Voir détails
                  </Button>
                  {account.cardNumber && (
                    <Button variant="outline" size="sm">
                      {account.isBlocked ? (
                        <>
                          <Unlock className="w-4 h-4 mr-1" />
                          Débloquer
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-1" />
                          Bloquer
                        </>
                      )}
                    </Button>
                  )}
                  <Button size="sm" className="banking-gradient">
                    Gérer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Account Card */}
      <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer card-shadow">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Ouvrir un nouveau compte</h3>
          <p className="text-muted-foreground mb-4">Compte courant, livret d'épargne ou compte professionnel</p>
          <Button className="banking-gradient">
            Commencer
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Accounts;
