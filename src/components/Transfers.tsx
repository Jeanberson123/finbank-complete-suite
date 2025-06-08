
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftRight, Send, History, Plus } from 'lucide-react';
import { useState } from 'react';

const Transfers = () => {
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [reference, setReference] = useState('');

  const accounts = [
    { id: '1', name: 'Compte Courant Principal', balance: 15420.50 },
    { id: '2', name: 'Livret A', balance: 8950.00 },
    { id: '3', name: 'Compte Entreprise', balance: 45280.75 }
  ];

  const recentBeneficiaries = [
    { id: '1', name: 'Marie Dubois', iban: 'FR76 1234 5678 9012 3456 7890 456' },
    { id: '2', name: 'Jean Martin', iban: 'FR76 9876 5432 1098 7654 3210 789' },
    { id: '3', name: 'Sophie Bernard', iban: 'FR76 5555 4444 3333 2222 1111 000' }
  ];

  const recentTransfers = [
    {
      id: '1',
      date: '2024-06-07',
      amount: 500.00,
      beneficiary: 'Marie Dubois',
      reference: 'Remboursement dîner',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-06-05',
      amount: 1200.00,
      beneficiary: 'Jean Martin',
      reference: 'Loyer juin',
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-06-03',
      amount: 300.00,
      beneficiary: 'Sophie Bernard',
      reference: 'Cadeau anniversaire',
      status: 'pending'
    }
  ];

  const handleTransfer = () => {
    console.log('Transfer initiated:', { amount, fromAccount, toAccount, beneficiary, reference });
    // Ici on ajouterait la logique de transfert
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-accent';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Effectué';
      case 'pending':
        return 'En cours';
      case 'failed':
        return 'Échoué';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Virements</h1>
        <p className="text-muted-foreground mt-1">Effectuez des virements entre vos comptes ou vers des bénéficiaires</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transfer Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-shadow animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Nouveau virement</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromAccount">Compte débiteur</Label>
                  <Select value={fromAccount} onValueChange={setFromAccount}>
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
                <Label htmlFor="beneficiary">Bénéficiaire</Label>
                <Select value={beneficiary} onValueChange={setBeneficiary}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un bénéficiaire ou compte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Virement interne</SelectItem>
                    {accounts.map((account) => (
                      <SelectItem key={`internal-${account.id}`} value={`internal-${account.id}`}>
                        📱 {account.name}
                      </SelectItem>
                    ))}
                    {recentBeneficiaries.map((ben) => (
                      <SelectItem key={ben.id} value={ben.id}>
                        👤 {ben.name} - {ben.iban}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference">Référence (optionnel)</Label>
                <Input
                  id="reference"
                  placeholder="Objet du virement"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>

              <div className="flex space-x-2 pt-4">
                <Button className="flex-1 banking-gradient" onClick={handleTransfer}>
                  <Send className="w-4 h-4 mr-2" />
                  Effectuer le virement
                </Button>
                <Button variant="outline">
                  Programmer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transfers */}
          <Card className="card-shadow animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <History className="w-5 h-5" />
                  <span>Virements récents</span>
                </CardTitle>
                <Button variant="ghost" size="sm">Voir tout</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransfers.map((transfer) => (
                  <div key={transfer.id} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg hover:bg-secondary/40 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <ArrowLeftRight className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{transfer.beneficiary}</p>
                        <p className="text-sm text-muted-foreground">{transfer.reference}</p>
                        <p className="text-xs text-muted-foreground">{transfer.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        -{transfer.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                      </p>
                      <p className={`text-sm ${getStatusColor(transfer.status)}`}>
                        {getStatusText(transfer.status)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="card-shadow animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau bénéficiaire
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                Virement programmé
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <History className="w-4 h-4 mr-2" />
                Historique complet
              </Button>
            </CardContent>
          </Card>

          {/* Beneficiaries */}
          <Card className="card-shadow animate-slide-up" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle>Bénéficiaires favoris</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentBeneficiaries.slice(0, 3).map((beneficiary) => (
                  <div key={beneficiary.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-accent font-medium text-sm">
                        {beneficiary.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{beneficiary.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{beneficiary.iban}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transfers;
