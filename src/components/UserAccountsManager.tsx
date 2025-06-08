
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { CreditCard, Plus, Eye, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  transaction_type: string;
  method: string;
  status: string;
  reference_number: string;
  created_at: string;
  account_id: string;
}

const UserAccountsManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserAccounts();
    }
  }, [user]);

  const fetchUserAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('user_accounts')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAccounts(data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les comptes",
        variant: "destructive"
      });
    }
  };

  const fetchAccountTransactions = async (accountId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('financial_transactions')
        .select('*')
        .eq('account_id', accountId)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setTransactions(data || []);
      setSelectedAccount(accountId);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger l'historique des transactions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createNewAccount = async () => {
    try {
      const { error } = await supabase
        .from('user_accounts')
        .insert({
          user_id: user?.id,
          account_type: 'courant',
          balance: 0,
          currency: 'EUR',
          is_active: true
        });

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Nouveau compte créé avec succès"
      });
      
      fetchUserAccounts();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le compte",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600';
      case 'withdrawal':
        return 'text-red-600';
      case 'transfer':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Comptes de l'utilisateur */}
      <Card className="card-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Mes Comptes</span>
            </CardTitle>
            <Button onClick={createNewAccount} size="sm" className="banking-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau compte
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <Card key={account.id} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-muted-foreground">
                        {account.account_number}
                      </span>
                      <Badge variant={account.is_active ? "default" : "secondary"}>
                        {account.is_active ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground capitalize">
                        Compte {account.account_type}
                      </p>
                      <p className="text-2xl font-bold">
                        {account.balance.toLocaleString('fr-FR', { 
                          minimumFractionDigits: 2 
                        })} {account.currency}
                      </p>
                    </div>
                    
                    <Button 
                      onClick={() => fetchAccountTransactions(account.id)}
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      disabled={loading && selectedAccount === account.id}
                    >
                      <History className="w-4 h-4 mr-2" />
                      {loading && selectedAccount === account.id ? 'Chargement...' : 'Voir l\'historique'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historique des transactions */}
      {selectedAccount && (
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <History className="w-5 h-5" />
              <span>Historique des Transactions</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Compte: {accounts.find(acc => acc.id === selectedAccount)?.account_number}
            </p>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucune transaction trouvée</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg hover:bg-secondary/40 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="space-y-1">
                          <p className="font-medium capitalize">
                            {transaction.transaction_type} - {transaction.method}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Réf: {transaction.reference_number || 'N/A'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(transaction.created_at).toLocaleString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <p className={`font-semibold text-lg ${getTransactionTypeColor(transaction.transaction_type)}`}>
                        {transaction.transaction_type === 'withdrawal' ? '-' : '+'}
                        {Math.abs(transaction.amount).toLocaleString('fr-FR', { 
                          minimumFractionDigits: 2 
                        })} €
                      </p>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserAccountsManager;
