
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Eye, CreditCard, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UserAccount {
  id: string;
  account_number: string;
  account_type: string;
  balance: number;
  currency: string;
  is_active: boolean;
  created_at: string;
}

interface Transaction {
  id: string;
  amount: number;
  type: string;
  description: string;
  created_at: string;
  account_id: string;
}

const UserAccountsManager = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    account_type: '',
    currency: 'HTG'
  });
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchAccounts();
    }
  }, [user]);

  useEffect(() => {
    if (selectedAccountId) {
      fetchTransactions(selectedAccountId);
    }
  }, [selectedAccountId]);

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('user_accounts')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAccounts(data || []);
      
      // Sélectionner automatiquement le premier compte s'il existe
      if (data && data.length > 0 && !selectedAccountId) {
        setSelectedAccountId(data[0].id);
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les comptes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async (accountId: string) => {
    try {
      const { data, error } = await supabase
        .from('financial_transactions')
        .select('*')
        .eq('account_id', accountId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les transactions",
        variant: "destructive"
      });
    }
  };

  const createAccount = async () => {
    if (!newAccount.account_type) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un type de compte",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_accounts')
        .insert({
          user_id: user?.id,
          account_type: newAccount.account_type,
          balance: 0,
          currency: newAccount.currency,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Compte créé avec succès"
      });

      setShowCreateForm(false);
      setNewAccount({ account_type: '', currency: 'HTG' });
      await fetchAccounts();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer le compte",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground mt-2">Chargement des comptes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mes Comptes</h1>
        <Button onClick={() => setShowCreateForm(true)} className="banking-gradient">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Compte
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Créer un nouveau compte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Type de compte</Label>
              <Select 
                value={newAccount.account_type} 
                onValueChange={(value) => setNewAccount({...newAccount, account_type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Compte Courant</SelectItem>
                  <SelectItem value="savings">Compte Épargne</SelectItem>
                  <SelectItem value="trading">Compte Trading</SelectItem>
                  <SelectItem value="moncash">Compte MonCash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Devise</Label>
              <Select 
                value={newAccount.currency} 
                onValueChange={(value) => setNewAccount({...newAccount, currency: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HTG">HTG (Gourde)</SelectItem>
                  <SelectItem value="USD">USD (Dollar)</SelectItem>
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={createAccount} className="banking-gradient">
                Créer le compte
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste des comptes */}
        <Card>
          <CardHeader>
            <CardTitle>Mes Comptes</CardTitle>
          </CardHeader>
          <CardContent>
            {accounts.length === 0 ? (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucun compte trouvé</p>
                <Button 
                  onClick={() => setShowCreateForm(true)} 
                  className="mt-4 banking-gradient"
                >
                  Créer votre premier compte
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-accent/50 ${
                      selectedAccountId === account.id ? 'border-primary bg-accent/30' : ''
                    }`}
                    onClick={() => setSelectedAccountId(account.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{account.account_type.toUpperCase()}</h3>
                          <Badge variant={account.is_active ? "default" : "secondary"}>
                            {account.is_active ? "Actif" : "Inactif"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">N° {account.account_number}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          {account.balance.toLocaleString()} {account.currency}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Historique des transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Historique des Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedAccountId ? (
              <div className="text-center py-8">
                <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Sélectionnez un compte pour voir les transactions</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8">
                <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucune transaction trouvée</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}
                        {transaction.amount.toLocaleString()}
                      </p>
                      <Badge variant={transaction.type === 'credit' ? "default" : "destructive"}>
                        {transaction.type === 'credit' ? 'Crédit' : 'Débit'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserAccountsManager;
