
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpRight, ArrowDownLeft, CreditCard, Search, Download, Filter } from 'lucide-react';
import { useState } from 'react';

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const transactions = [
    {
      id: '1',
      date: '2024-06-07',
      time: '14:30',
      type: 'credit',
      category: 'salary',
      description: 'Virement reçu - Salaire Entreprise XYZ',
      amount: 3200.00,
      account: 'Compte Courant',
      balance: 15420.50,
      reference: 'SAL-062024'
    },
    {
      id: '2',
      date: '2024-06-06',
      time: '09:15',
      type: 'debit',
      category: 'utilities',
      description: 'Prélèvement EDF',
      amount: -120.50,
      account: 'Compte Courant',
      balance: 12220.50,
      reference: 'EDF-062024'
    },
    {
      id: '3',
      date: '2024-06-05',
      time: '16:45',
      type: 'credit',
      category: 'interest',
      description: 'Intérêts Livret A',
      amount: 15.20,
      account: 'Livret A',
      balance: 8950.00,
      reference: 'INT-062024'
    },
    {
      id: '4',
      date: '2024-06-05',
      time: '11:22',
      type: 'debit',
      category: 'shopping',
      description: 'Achat en ligne - Amazon',
      amount: -89.99,
      account: 'Compte Courant',
      balance: 12341.00,
      reference: 'AMZ-987654321'
    },
    {
      id: '5',
      date: '2024-06-04',
      time: '19:30',
      type: 'debit',
      category: 'restaurant',
      description: 'Restaurant Le Bernardin',
      amount: -65.80,
      account: 'Compte Courant',
      balance: 12430.99,
      reference: 'CB-*2841'
    },
    {
      id: '6',
      date: '2024-06-03',
      time: '08:00',
      type: 'debit',
      category: 'transfer',
      description: 'Virement vers Sophie Bernard',
      amount: -300.00,
      account: 'Compte Courant',
      balance: 12496.79,
      reference: 'VIR-SB-001'
    },
    {
      id: '7',
      date: '2024-06-02',
      time: '12:15',
      type: 'debit',
      category: 'fuel',
      description: 'Station Total - Carburant',
      amount: -75.40,
      account: 'Compte Courant',
      balance: 12796.79,
      reference: 'CB-*2841'
    },
    {
      id: '8',
      date: '2024-06-01',
      time: '10:00',
      type: 'credit',
      category: 'refund',
      description: 'Remboursement SNCF',
      amount: 45.60,
      account: 'Compte Courant',
      balance: 12872.19,
      reference: 'RMB-SNCF'
    }
  ];

  const accounts = ['all', 'Compte Courant', 'Livret A', 'Compte Entreprise'];
  const transactionTypes = ['all', 'credit', 'debit'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'salary':
        return '💼';
      case 'utilities':
        return '⚡';
      case 'interest':
        return '📈';
      case 'shopping':
        return '🛒';
      case 'restaurant':
        return '🍽️';
      case 'transfer':
        return '↔️';
      case 'fuel':
        return '⛽';
      case 'refund':
        return '↩️';
      default:
        return '💳';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'salary':
        return 'Salaire';
      case 'utilities':
        return 'Factures';
      case 'interest':
        return 'Intérêts';
      case 'shopping':
        return 'Achats';
      case 'restaurant':
        return 'Restaurant';
      case 'transfer':
        return 'Virement';
      case 'fuel':
        return 'Carburant';
      case 'refund':
        return 'Remboursement';
      default:
        return 'Autre';
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAccount = selectedAccount === 'all' || transaction.account === selectedAccount;
    const matchesType = selectedType === 'all' || transaction.type === selectedType;
    
    return matchesSearch && matchesAccount && matchesType;
  });

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Historique</h1>
          <p className="text-muted-foreground mt-1">Consultez l'historique de toutes vos transactions</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Exporter</span>
        </Button>
      </div>

      {/* Filters */}
      <Card className="card-shadow animate-slide-up">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les comptes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les comptes</SelectItem>
                {accounts.slice(1).map((account) => (
                  <SelectItem key={account} value={account}>{account}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type de transaction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="credit">Crédits</SelectItem>
                <SelectItem value="debit">Débits</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Plus de filtres</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="card-shadow animate-slide-up" style={{ animationDelay: '200ms' }}>
        <CardHeader>
          <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {filteredTransactions.map((transaction, index) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                    transaction.type === 'credit' ? 'bg-accent/20' : 'bg-destructive/20'
                  }`}>
                    {getCategoryIcon(transaction.category)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-foreground">{transaction.description}</p>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        {getCategoryName(transaction.category)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                      <span>{transaction.account}</span>
                      <span>•</span>
                      <span>{transaction.date} à {transaction.time}</span>
                      <span>•</span>
                      <span className="font-mono">{transaction.reference}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-lg font-semibold ${
                    transaction.type === 'credit' ? 'text-accent' : 'text-destructive'
                  }`}>
                    {transaction.type === 'credit' ? '+' : ''}{transaction.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Solde: {transaction.balance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucune transaction trouvée avec ces critères</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-accent">+3,260.80 €</p>
            <p className="text-sm text-muted-foreground">Total crédits ce mois</p>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">-651.69 €</p>
            <p className="text-sm text-muted-foreground">Total débits ce mois</p>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">+2,609.11 €</p>
            <p className="text-sm text-muted-foreground">Solde net ce mois</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;
