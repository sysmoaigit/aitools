import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { AITool, ToolCategory } from '../lib/types';

const CATEGORIES: ToolCategory[] = [
  'Chat & Assistant', 'Code & Development', 'Image & Design',
  'Video & Audio', 'Writing & Content', 'Data & Analytics',
  'Automation', 'Business & Productivity', 'Education',
];

export default function HomeScreen({ navigation }: any) {
  const [tools, setTools] = useState<AITool[]>([]);
  const [category, setCategory] = useState<ToolCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTools = useCallback(async () => {
    let query = supabase.from('tools').select('*');
    if (category) query = query.eq('category', category);
    const { data } = await query.order('rating', { ascending: false }).limit(50);
    setTools((data || []) as AITool[]);
    setLoading(false);
    setRefreshing(false);
  }, [category]);

  useEffect(() => { fetchTools(); }, [fetchTools]);

  const onRefresh = () => { setRefreshing(true); fetchTools(); };

  const renderTool = ({ item }: { item: AITool }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ToolDetail', { tool: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.toolName}>{item.name}</Text>
        <Text style={[
          styles.pricing,
          { color: item.pricing === 'Free' ? '#4ADE80' : item.pricing === 'Freemium' ? '#FACC15' : '#F87171' }
        ]}>
          {item.pricing}
        </Text>
      </View>
      <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Category Pills */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[null as any, ...CATEGORIES]}
        style={styles.categoryList}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.pill, (!item && !category) || item === category ? styles.pillActive : null]}
            onPress={() => { setCategory(item); setLoading(true); }}
          >
            <Text style={[styles.pillText, (!item && !category) || item === category ? styles.pillTextActive : null]}>
              {item || 'All'}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(_, i) => i.toString()}
      />

      {/* Tool List */}
      {loading ? (
        <ActivityIndicator size="large" color="#38BDF8" style={{ marginTop: 60 }} />
      ) : (
        <FlatList
          data={tools}
          renderItem={renderTool}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38BDF8" />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  categoryList: { maxHeight: 52, marginVertical: 8 },
  pill: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#1E293B', marginRight: 8, height: 36,
  },
  pillActive: { backgroundColor: '#38BDF8' },
  pillText: { color: '#94A3B8', fontSize: 13, fontWeight: '600' },
  pillTextActive: { color: '#0F172A' },
  card: {
    backgroundColor: '#1E293B', borderRadius: 12, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: '#334155',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  toolName: { color: '#F8FAFC', fontSize: 17, fontWeight: '700', flex: 1 },
  pricing: { fontSize: 12, fontWeight: '700', marginLeft: 8 },
  description: { color: '#94A3B8', fontSize: 14, marginTop: 8, lineHeight: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  rating: { color: '#FBBF24', fontSize: 13, fontWeight: '600' },
  category: { color: '#64748B', fontSize: 12 },
});
