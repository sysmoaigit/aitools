import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * AdMob Banner Component
 * 
 * ⚠️ BLOCKED: AdMob requires Google AdMob account + App ID.
 * Steps:
 *   1. Create Google AdMob account at https://admob.google.com
 *   2. Create app → get App ID + Banner Ad Unit ID
 *   3. Add IDs to app.json under expo.plugins['react-native-google-mobile-ads']
 *   4. Run: npx expo prebuild --clean && npx expo run:ios/android
 * 
 * Once AdMob is set up, replace this stub with:
 *   import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
 *   <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE} />
 */

export default function AdBanner() {
  return null; // Replace with real AdMob <BannerAd /> once configured
}

const styles = StyleSheet.create({});
