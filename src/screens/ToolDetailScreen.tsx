import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Alert, Share,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { AITool } from '../lib/types';

export default function ToolDetailScreen({ route, navigation }: any) {
  const { tool } = route.params as { tool: AITool };
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: tool.name });
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    const { data } = await supabase.from('favorites').select('id').eq('tool_id', tool.id);
    setIsFavorite(data && data.length > 0);
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      await supabase.from('favorites').delete().eq('tool_id', tool.id);
      setIsFavorite(false);
    } else {
      await supabase.from('favorites').insert({ tool_id: tool.id, device_id: 'default' });
      setIsFavorite(true);
    }
  };

  const openWebsite = () => {
    if (tool.website) {
      Linking.openURL(tool.website).catch(() =>
        Alert.alert('Error', 'Could not open website')
      );
    }
  };

  const openAffiliate = () => {
    const url = tool.affiliate_url || tool.website;
    if (url) {
      Linking.openURL(url).catch(() =>
        Alert.alert('Error', 'Could not open link')
      );
    }
  };

  const handleShare = () => {
    Share.share({
      message: `Check out ${tool.name} on SYSmoAI Tools!\n${tool.description}\n${tool.website || ''}`,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{tool.name}</Text>
          <Text style={styles.category}>{tool.category}</Text>
        </View>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favBtn}>
          <Text style={{ fontSize: 28 }}>{isFavorite ? '⭐' : '☆'}</Text>
        </TouchableOpacity>
      </View>

      {/* Rating & Pricing */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Text style={styles.metaValue}>⭐ {tool.rating}</Text>
          <Text style={styles.metaLabel}>Rating</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={[styles.metaValue, {
            color: tool.pricing === 'Free' ? '#4ADE80' : tool.pricing === 'Freemium' ? '#FACC15' : '#F87171'
          }]}>{tool.pricing}</Text>
          <Text style={styles.metaLabel}>Pricing</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.description}>{tool.description}</Text>

      {/* Best For */}
      {tool.best_for && tool.best_for.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Best For</Text>
          <View style={styles.tagRow}>
            {tool.best_for.map((bf, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>{bf}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Tags */}
      {tool.tags && tool.tags.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Tags</Text>
          <View style={styles.tagRow}>
            {tool.tags.map((tag, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Actions */}
      <TouchableOpacity style={styles.primaryBtn} onPress={openWebsite}>
        <Text style={styles.primaryBtnText}>🌐 Visit Website</Text>
      </TouchableOpacity>

      {tool.affiliate_url && (
        <TouchableOpacity style={styles.affiliateBtn} onPress={openAffiliate}>
          <Text style={styles.affiliateBtnText}>🔥 Try Now (Affiliate)</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
        <Text style={styles.shareBtnText}>📤 Share This Tool</Text>
      </TouchableOpacity>

      {/* Disclaimer */}
      <Text style={styles.disclaimer}>
        SYSmoAI Tools helps you discover AI tools. Some links are affiliate links — we may earn a commission at no cost to you. Tools are independently rated by the community.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  name: { color: '#F8FAFC', fontSize: 24, fontWeight: '800' },
  category: { color: '#64748B', fontSize: 14, marginTop: 4 },
  favBtn: { padding: 8 },
  metaRow: { flexDirection: 'row', marginBottom: 20, gap: 16 },
  metaItem: {
    backgroundColor: '#1E293B', borderRadius: 12, padding: 14,
    flex: 1, alignItems: 'center',
  },
  metaValue: { color: '#F8FAFC', fontSize: 18, fontWeight: '700' },
  metaLabel: { color: '#64748B', fontSize: 12, marginTop: 4 },
  sectionTitle: { color: '#94A3B8', fontSize: 13, fontWeight: '700', marginTop: 20, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  description: { color: '#CBD5E1', fontSize: 16, lineHeight: 24 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#1E293B', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  tagText: { color: '#38BDF8', fontSize: 13 },
  primaryBtn: {
    backgroundColor: '#38BDF8', borderRadius: 14, padding: 18,
    alignItems: 'center', marginTop: 24,
  },
  primaryBtnText: { color: '#0F172A', fontSize: 17, fontWeight: '700' },
  affiliateBtn: {
    backgroundColor: '#1E293B', borderRadius: 14, padding: 18,
    alignItems: 'center', marginTop: 12, borderWidth: 1, borderColor: '#F59E0B',
  },
  affiliateBtnText: { color: '#F59E0B', fontSize: 17, fontWeight: '700' },
  shareBtn: {
    borderRadius: 14, padding: 18, alignItems: 'center', marginTop: 12,
  },
  shareBtnText: { color: '#64748B', fontSize: 15 },
  disclaimer: { color: '#475569', fontSize: 12, textAlign: 'center', marginTop: 24, lineHeight: 18 },
});
