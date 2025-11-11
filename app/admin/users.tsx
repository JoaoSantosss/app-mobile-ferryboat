import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';

type User = {
  id: string;
  name: string;
  email: string;
  active: boolean;
};

const PAGE_SIZE = 10;

const MOCK_USERS: User[] = Array.from({ length: 57 }).map((_, i) => ({
  id: String(i + 1),
  name: `Usuário ${i + 1}`,
  email: `user${i + 1}@example.com`,
  active: i % 3 !== 0,
}));

export default function AdminUsersScreen() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return users.slice(start, start + PAGE_SIZE);
  }, [page, users]);

  function toggleActive(userId: string) {
    setUsers(prev => prev.map(u => (u.id === userId ? { ...u, active: !u.active } : u)));
  }

  function editUser(userId: string) {
    // Placeholder for edit flow (could navigate to edit form)
    console.log('Edit user', userId);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Gerenciamento de Usuários</ThemedText>

      <View style={styles.tableHeader}>
        <Text style={[styles.th, styles.colId]}>ID</Text>
        <Text style={[styles.th, styles.colName]}>Nome</Text>
        <Text style={[styles.th, styles.colEmail]}>E-mail</Text>
        <Text style={[styles.th, styles.colStatus]}>Status</Text>
        <Text style={[styles.th, styles.colActions]}>Ações</Text>
      </View>

      <FlatList
        data={pageItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.td, styles.colId]}>{item.id}</Text>
            <Text style={[styles.td, styles.colName]}>{item.name}</Text>
            <Text style={[styles.td, styles.colEmail]} numberOfLines={1}>{item.email}</Text>
            <Text style={[styles.td, styles.colStatus, { color: item.active ? '#16a34a' : '#dc2626' }]}>
              {item.active ? 'Ativo' : 'Inativo'}
            </Text>
            <View style={[styles.td, styles.colActions, styles.actions]}>
              <TouchableOpacity onPress={() => editUser(item.id)} style={[styles.btn, styles.btnOutline]}>
                <Text style={styles.btnText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleActive(item.id)} style={[styles.btn, styles.btnPrimary]}>
                <Text style={styles.btnAltText}>{item.active ? 'Desativar' : 'Ativar'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<ThemedText>Nenhum usuário encontrado.</ThemedText>}
      />

      <View style={styles.pagination}>
        <TouchableOpacity disabled={page === 1} onPress={() => setPage(p => Math.max(1, p - 1))} style={[styles.pageBtn, page === 1 && styles.pageBtnDisabled]}>
          <Text style={styles.pageBtnText}>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.pageInfo}>{page} / {totalPages}</Text>
        <TouchableOpacity disabled={page === totalPages} onPress={() => setPage(p => Math.min(totalPages, p + 1))} style={[styles.pageBtn, page === totalPages && styles.pageBtnDisabled]}>
          <Text style={styles.pageBtnText}>Próxima</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  title: {
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
  },
  th: {
    fontWeight: '600',
  },
  td: {
    color: '#374151',
  },
  colId: { width: 48 },
  colName: { flex: 1, paddingRight: 8 },
  colEmail: { flex: 1.2, paddingRight: 8 },
  colStatus: { width: 80 },
  colActions: { width: 180 },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  btnOutline: {
    backgroundColor: 'transparent',
  },
  btnPrimary: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  btnText: {
    color: '#111827',
    fontWeight: '600',
  },
  btnAltText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingTop: 12,
  },
  pageBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  pageBtnDisabled: {
    opacity: 0.4,
  },
  pageBtnText: {
    fontWeight: '600',
  },
  pageInfo: {
    fontWeight: '600',
  },
});


