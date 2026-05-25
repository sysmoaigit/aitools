import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import { AITool } from '../lib/types';

export default function SearchScreen({ navigation }: any) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AITool[]>([]);
  const [searched, setSearched] = useState(false);

  const search = async (text: string) => {
    setQuery(text);
    if (text.length < 2) { setResults([]); setSearched(false); return; }
    const { data } = await supabase.from('tools').select('*')
      .or(`name.ilike.%${text}%,description.ilike.%${text}%,tags.cs.{${text}}`)
      .limit(30);
    setResults((data || []) as AITool[]);
    setSearched(true);
  };

  const renderResult = ({ item }: { item: AITool }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ToolDetail', { tool: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.toolName}>{item.name}</Text>
        <Text style={[styles.pricing, { color: item.pricing === 'Free' ? '#4ADE80' : '#FACC15' }]}>{item.pricing}</Text>
      </View>
      <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      <Text style={styles.rating}>⭐ {item.rating} · {item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search AI tools... (ChatGPT, coding, video...)"
        placeholderTextColor="#64748B"
        value={query}
        onChangeText={search}
        autoFocus
      />
      {searched && results.length === 0 && (
        <Text style={styles.empty}>No tools found for "{query}"</Text>
      )}
      <FlatList
        data={results}
        renderItem={renderResult}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  input: {
    backgroundColor: '#1E293B', color: '#F8FAFC', fontSize: 16,
    margin: 16, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#334155',
  },
  empty: { color: '#64748B', textAlign: 'center', marginTop: 20, fontSize: 15 },
  card: {
    backgroundColor: '#1E293B', borderRadius: 12, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: '#334155',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  toolName: { color: '#F8FAFC', fontSize: 17, fontWeight: '700', flex: 1 },
  pricing: { fontSize: 12, fontWeight: '700', marginLeft: 8 },
  description: { color: '#94A3B8', fontSize: 14, marginTop: 8, lineHeight: 20 },
  rating: { color: '#64748B', fontSize: 12, marginTop: 10 },
});
