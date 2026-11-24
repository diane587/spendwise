import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { loadData, saveData } from '../utils/storage';
import { currencies } from '../utils/theme';

const Ctx = createContext();
export const useApp = () => useContext(Ctx);

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState(currencies[0]);
  const [userName, setUserName] = useState('Guest User');
  const [loaded, setLoaded] = useState(false);

  // Load once on startup
  useEffect(() => {
    (async () => {
      const d = await loadData();
      if (d) {
        setTransactions(d.transactions || []);
        if (d.currency) setCurrency(d.currency);
        if (d.userName) setUserName(d.userName);
      }
      setLoaded(true);
    })();
  }, []);

  // Save whenever anything changes
  useEffect(() => {
    if (loaded) saveData({ transactions, currency, userName });
  }, [transactions, currency, userName, loaded]);

  const addTransaction = (t) => setTransactions((prev) => [t, ...prev]);
  const deleteTransaction = (id) => setTransactions((prev) => prev.filter((t) => t.id !== id));
  const clearAll = () => setTransactions([]);

  const income = transactions.filter((t) => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === 'Expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expenses;

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Ctx.Provider value={{
      transactions, income, expenses, balance, currency, setCurrency,
      userName, setUserName, addTransaction, deleteTransaction, clearAll,
    }}>
      {children}
    </Ctx.Provider>
  );
}
