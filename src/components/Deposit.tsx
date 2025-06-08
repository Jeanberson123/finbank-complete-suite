
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownLeft, ArrowUpRight, Wallet, CreditCard, Banknote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Deposit = () => {
  const [activeTab, setActiveTab] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [method, setMethod] = useState('');
  const { toast } = useToast();

  const accounts = [
    { id: '1', name: 'Compte Courant Principal', balance: 15420.50 },
    { id: '2', name: 'Livret A', balance: 8950.00 },
    { id: '3', name: 'Compte Entreprise', balance: 45280.75 }
  ];

  const depositMethods = [
    { id: 'card', name: 'Carte bancaire', icon: CreditCard },
    { id: 'transfer', name: 'Virement externe', icon: ArrowDownLeft },
    { id: 'cash', name: 'Espèces (ATM)', icon: Banknote }
  ];

  const withdrawMethods = [
    { id: 'atm', name: 'Distributeur ATM', icon: Banknote },
    { id: 'transfer', name: 'Virement sortant', icon: ArrowUpRight },
    { id: 'card', name: 'Carte bancaire', icon: CreditCard }
  ];

  const handleTransaction = () => {
    if (!amount || !selectedAccount || !method) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    const transactionType = activeTab === 'deposit' ? 'Dépôt' : 'Retrait';
    
    toast({
      title: `${transactionType} effectué`,
      description: `${transactionType} de ${parseFloat(amount).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} € effectué avec succès`,
    });

    // Reset form
    setAmount('');
    setSelectedAccount('');
    setMethod('');
  };

  const recentTransactions = [
    {
      id: '1',
      type: 'deposit',
      amount: 500.00,
      method: 'Carte bancaire',
      date: '2024-06-07',
      status: 'completed'
    },
    {
      id: '2',
      type: 'withdraw',
      amount: 200.00,
      method: 'ATM',
      date: '2024-06-06',
      status: 'completed'
    },
    {
      id: '3',
      type: 'deposit',
      amount: 1500.00,
      method: 'Virement externe',
      date: '2024-06-05',
      status: 'pending'
    }
  ];

  const getTransactionIcon = (type: string) => {
    return type === 'deposit' ? ArrowDownLeft : ArrowUpRight;
  };

  const getTransactionColor = (type: string) => {
    return type === 'deposit' ? 'text-accent' : 'text-orange-600';
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Retraits & Dépôts</h1>
        <p className="text-muted-foreground mt-1">Gérez vos retraits et dépôts d'argent</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Selection */}
          <Card className="card-shadow animate-slide-up">
            <CardHeader>
              <div className="flex space-x-1 p-1 bg-secondary/20 rounded-lg">
                <button
                  onClick={() => setActiveTab('deposit')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'deposit'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <ArrowDownLeft className="w-4 h-4 inline mr-2" />
                  Dépôt
                </button>
                <button
                  onClick={() => setActiveTab('withdraw')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'withdraw'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4 inline mr-2" />
                  Retrait
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account">Compte</Label>
                  <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un compte" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} - {account.balance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Montant (€)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-right"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">Méthode de {activeTab === 'deposit' ? 'dépôt' : 'retrait'}</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une méthode" />
                  </SelectTrigger>
                  <SelectContent>
                    {(activeTab === 'deposit' ? depositMethods : withdrawMethods).map((methodOption) => {
                      const IconComponent = methodOption.icon;
                      return (
                        <SelectItem key={methodOption.id} value={methodOption.id}>
                          <div className="flex items-center space-x-2">
                            <IconComponent className="w-4 h-4" />
                            <span>{methodOption.name}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full banking-gradient mt-6" 
                onClick={handleTransaction}
                disabled={!amount || !selectedAccount || !method}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Effectuer le {activeTab === 'deposit' ? 'dépôt' : 'retrait'}
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="card-shadow animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle>Transactions récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => {
                  const IconComponent = getTransactionIcon(transaction.type);
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg hover:bg-secondary/40 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${transaction.type === 'deposit' ? 'bg-accent/20' : 'bg-orange-100'} rounded-full flex items-center justify-center`}>
                          <IconComponent className={`w-5 h-5 ${getTransactionColor(transaction.type)}`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {transaction.type === 'deposit' ? 'Dépôt' : 'Retrait'}
                          </p>
                          <p className="text-sm text-muted-foreground">{transaction.method}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                          {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.status === 'completed' ? 'Effectué' : 'En cours'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Summary */}
          <Card className="card-shadow animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle>Résumé des comptes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {accounts.map((account) => (
                <div key={account.id} className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{account.name}</p>
                  </div>
                  <p className="text-sm font-semibold">
                    {account.balance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="card-shadow animate-slide-up" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="space-y-2">
                <p>• Les dépôts par carte sont instantanés</p>
                <p>• Les virements externes peuvent prendre 1-3 jours ouvrés</p>
                <p>• Limite de retrait ATM: 1 000€/jour</p>
                <p>• Les transactions sont sécurisées par cryptage SSL</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
