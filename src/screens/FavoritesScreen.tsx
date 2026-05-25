import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { AITool } from '../lib/types';

export default function FavoritesScreen({ navigation }: any) {
  const [favorites, setFavorites] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data: favs } = await supabase.from('favorites').select('tool_id');
      if (favs && favs.length > 0) {
        const ids = favs.map((f: any) => f.tool_id);
        const { data: tools } = await supabase.from('tools').select('*').in('id', ids);
        setFavorites((tools || []) as AITool[]);
      }
      setLoading(false);
    };
    fetchFavorites();
  }, []);

  const removeFavorite = async (toolId: string) => {
    await supabase.from('favorites').delete().eq('tool_id', toolId);
    setFavorites(favorites.filter((t) => t.id !== toolId));
  };

  if (favorites.length === 0 && !loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>⭐</Text>
        <Text style={styles.emptyText}>No favorites yet</Text>
        <Text style={styles.emptySub}>Tap the star on any tool to save it here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ToolDetail', { tool: item })}
            onLongPress={() => {
              Alert.alert('Remove Favorite', `Remove ${item.name} from favorites?`, [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Remove', style: 'destructive', onPress: () => removeFavorite(item.id) },
              ]);
            }}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
            <Text style={styles.rating}>⭐ {item.rating} · {item.category}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  emptyContainer: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center' },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { color: '#F8FAFC', fontSize: 20, fontWeight: '700' },
  emptySub: { color: '#64748B', fontSize: 14, marginTop: 8 },
  card: {
    backgroundColor: '#1E293B', borderRadius: 12, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: '#334155',
  },
  name: { color: '#F8FAFC', fontSize: 17, fontWeight: '700' },
  desc: { color: '#94A3B8', fontSize: 14, marginTop: 8, lineHeight: 20 },
  rating: { color: '#64748B', fontSize: 12, marginTop: 10 },
});
