/**
 * Wave 12 — Food & Sports Nutrition Products
 * Fruits, vegetables, grains, protein, dairy, sports nutrition products, meals + easter eggs
 * Run: node scripts/generate-wave12-food.mjs
 */

import { writeFileSync, appendFileSync, readFileSync } from 'fs'
import { join } from 'path'

const BASE = '/Users/malte/Desktop/Drops /ramtt-charts.worktrees/agents-sports-icon-collection-expansion/components/icons'

const COPYRIGHT = `// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.
`

const ICONS = [

  // ═══════════════════════════════════════════════════════════════════════════
  // FRUITS (7)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Banana',
    category: 'food',
    tags: ['banana', 'fruit', 'potassium', 'quick', 'energy', 'pre-race', 'classic'],
    // THE endurance sport fruit — curved crescent
    line: `<path d="M5 6c1-2 4-3 7-2s5 3 6 6c1 4 0 7-2 9-1 1-3 1-4 0-2-3-4-7-4-10 0-1-.5-2-1.5-2.5S6 5.5 5 6z"/><path d="M12 4l1-2.5"/>`,
    solid: `<path d="M5 6c1-2 4-3 7-2s5 3 6 6c1 4 0 7-2 9-1 1-3 1-4 0-2-3-4-7-4-10 0-1-.5-2-1.5-2.5S6 5.5 5 6z"/><path d="M12 4l1-2.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M5 6c1-2 4-3 7-2s5 3 6 6c1 4 0 7-2 9-1 1-3 1-4 0-2-3-4-7-4-10 0-1-.5-2-1.5-2.5S6 5.5 5 6z"/>`,
  },
  {
    name: 'Orange',
    category: 'food',
    tags: ['orange', 'fruit', 'citrus', 'vitamin', 'c', 'slice', 'aid-station'],
    // Orange slice — wedge with segments
    line: `<circle cx="12" cy="12" r="8"/><path d="M12 4v16"/><path d="M5.75 7.75l12.5 8.5"/><path d="M5.75 16.25l12.5-8.5"/><circle cx="12" cy="12" r="2"/>`,
    solid: `<path fillRule="evenodd" d="M12 3.25a8.75 8.75 0 100 17.5 8.75 8.75 0 000-17.5zM12 10a2 2 0 100 4 2 2 0 000-4z"/>`,
    duoBg: `<circle cx="12" cy="12" r="8"/>`,
  },
  {
    name: 'Avocado',
    category: 'food',
    tags: ['avocado', 'fat', 'healthy', 'superfood', 'millennial', 'omega'],
    // Avocado half with pit
    line: `<path d="M12 2c-4 0-7 3-8 7s0 8 2 10c1.5 1.5 3.5 2 6 2s4.5-.5 6-2c2-2 3-6 2-10s-4-7-8-7z"/><circle cx="12" cy="13" r="3.5"/>`,
    solid: `<path d="M12 2c-4 0-7 3-8 7s0 8 2 10c1.5 1.5 3.5 2 6 2s4.5-.5 6-2c2-2 3-6 2-10s-4-7-8-7z" fill="currentColor"/><circle cx="12" cy="13" r="3.5" fill="white" opacity="0.5"/>`,
    duoBg: `<path d="M12 2c-4 0-7 3-8 7s0 8 2 10c1.5 1.5 3.5 2 6 2s4.5-.5 6-2c2-2 3-6 2-10s-4-7-8-7z"/>`,
  },
  {
    name: 'Berries',
    category: 'food',
    tags: ['berries', 'blueberry', 'antioxidant', 'fruit', 'smoothie', 'bowl'],
    // Cluster of berries on a stem
    line: `<circle cx="9" cy="12" r="3"/><circle cx="15" cy="12" r="3"/><circle cx="12" cy="8" r="3"/><path d="M12 5V2"/><path d="M10 3h4"/>`,
    solid: `<circle cx="9" cy="12" r="3.5"/><circle cx="15" cy="12" r="3.5"/><circle cx="12" cy="8" r="3.5"/><path d="M12 5V2M10 3h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<circle cx="9" cy="12" r="3"/><circle cx="15" cy="12" r="3"/><circle cx="12" cy="8" r="3"/>`,
  },
  {
    name: 'Watermelon',
    category: 'food',
    tags: ['watermelon', 'hydration', 'summer', 'slice', 'fruit', 'refreshing'],
    // Watermelon slice — half-moon with seeds
    line: `<path d="M3 14a9 9 0 0118 0H3z"/><path d="M3 14h18"/><circle cx="8" cy="11" r="0.75" fill="currentColor" stroke="none"/><circle cx="12" cy="9" r="0.75" fill="currentColor" stroke="none"/><circle cx="16" cy="11" r="0.75" fill="currentColor" stroke="none"/><circle cx="10" cy="12" r="0.75" fill="currentColor" stroke="none"/><circle cx="14" cy="12" r="0.75" fill="currentColor" stroke="none"/>`,
    solid: `<path d="M3 14a9 9 0 0118 0H3z" fill="currentColor"/><circle cx="8" cy="11" r="1" fill="white"/><circle cx="12" cy="9" r="1" fill="white"/><circle cx="16" cy="11" r="1" fill="white"/><circle cx="10" cy="12.5" r="1" fill="white"/><circle cx="14" cy="12.5" r="1" fill="white"/>`,
    duoBg: `<path d="M3 14a9 9 0 0118 0H3z"/>`,
  },
  {
    name: 'DateFruit',
    category: 'food',
    tags: ['date', 'fruit', 'natural', 'energy', 'gel', 'endurance', 'sugar', 'medjool'],
    // Date fruit — nature's energy gel, oval with wrinkle lines
    line: `<ellipse cx="12" cy="12" rx="5" ry="8"/><path d="M9 8c2 3 2 5 0 8" opacity="0.4"/><path d="M12 4v-2"/>`,
    solid: `<ellipse cx="12" cy="12" rx="5.75" ry="8.75"/><path d="M12 4v-2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<ellipse cx="12" cy="12" rx="5" ry="8"/>`,
  },
  {
    name: 'Cherry',
    category: 'food',
    tags: ['cherry', 'tart', 'juice', 'recovery', 'anti-inflammatory', 'sleep', 'fruit'],
    // Two cherries on stems — tart cherry juice = recovery
    line: `<circle cx="8" cy="16" r="4"/><circle cx="16" cy="14" r="3.5"/><path d="M8 12c0-4 2-7 5-9"/><path d="M16 10.5c0-3 0-5-3-7.5"/><path d="M11 4c1-.5 2-.5 3 0"/>`,
    solid: `<circle cx="8" cy="16" r="4.5"/><circle cx="16" cy="14" r="4"/><path d="M8 12c0-4 2-7 5-9M16 10.5c0-3 0-5-3-7.5M11 4c1-.5 2-.5 3 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<circle cx="8" cy="16" r="4"/><circle cx="16" cy="14" r="3.5"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VEGETABLES (4)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Broccoli',
    category: 'food',
    tags: ['broccoli', 'vegetable', 'green', 'fiber', 'micro', 'nutrient', 'iron'],
    line: `<path d="M12 22v-8"/><path d="M10 14l-2-2"/><path d="M14 14l2-2"/><circle cx="8" cy="9" r="3"/><circle cx="12" cy="7" r="3.5"/><circle cx="16" cy="9" r="3"/>`,
    solid: `<circle cx="8" cy="9" r="3.75"/><circle cx="12" cy="7" r="4.25"/><circle cx="16" cy="9" r="3.75"/><path d="M12 14v8M10 14l-2-2M14 14l2-2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>`,
    duoBg: `<circle cx="8" cy="9" r="3"/><circle cx="12" cy="7" r="3.5"/><circle cx="16" cy="9" r="3"/>`,
  },
  {
    name: 'Carrot',
    category: 'food',
    tags: ['carrot', 'vegetable', 'snack', 'beta-carotene', 'vitamin', 'a', 'crunchy'],
    line: `<path d="M12 22L8 8c2-1 4-1 8 0l-4 14z"/><path d="M10 6c-1-2 0-4 2-5"/><path d="M14 6c1-2 0-4-2-5"/><path d="M12 6c0-2 1-4 2-5"/><path d="M9 12h6" opacity="0.3"/><path d="M9.5 15h5" opacity="0.3"/>`,
    solid: `<path d="M12 22L8 8c2-1 4-1 8 0l-4 14z" fill="currentColor"/><path d="M10 6c-1-2 0-4 2-5M14 6c1-2 0-4-2-5M12 6c0-2 1-4 2-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M12 22L8 8c2-1 4-1 8 0l-4 14z"/>`,
  },
  {
    name: 'LeafyGreens',
    category: 'food',
    tags: ['leafy', 'greens', 'spinach', 'kale', 'salad', 'iron', 'vitamin', 'k'],
    line: `<path d="M12 22v-10"/><path d="M12 12c-4 0-7-3-7-7 3 0 6 2 7 5"/><path d="M12 14c4 0 7-3 7-7-3 0-6 2-7 5"/><path d="M12 10c-2.5-.5-4-2-4.5-4" opacity="0.4"/><path d="M12 12c2.5-.5 4-2 4.5-4" opacity="0.4"/>`,
    solid: `<path d="M12 12c-4 0-7-3-7-7 3 0 6 2 7 5V12z" fill="currentColor"/><path d="M12 14c4 0 7-3 7-7-3 0-6 2-7 5v2z" fill="currentColor" opacity="0.7"/><path d="M12 14v8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M5 5c0 4 3 7 7 7V10C11 8 8 5 5 5zM19 7c0 4-3 7-7 7v-2c1-3 4-5 7-5z"/>`,
  },
  {
    name: 'SweetPotato',
    category: 'food',
    tags: ['sweet', 'potato', 'complex', 'carbs', 'fiber', 'yam', 'starch'],
    line: `<ellipse cx="12" cy="12" rx="8" ry="5"/><path d="M6 10c2 1 4 .5 5-1" opacity="0.3"/><path d="M13 14c2-.5 3-2 4-3" opacity="0.3"/><path d="M14 7c1-2 2-3 4-3"/>`,
    solid: `<ellipse cx="12" cy="12" rx="8.75" ry="5.75"/><path d="M14 7c1-2 2-3 4-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<ellipse cx="12" cy="12" rx="8" ry="5"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GRAINS / CARBS (5)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Bread',
    category: 'food',
    tags: ['bread', 'carb', 'loaf', 'wheat', 'slice', 'toast', 'staple'],
    line: `<path d="M5 10c0-3 3-5 7-5s7 2 7 5v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z"/><path d="M5 10h14"/><path d="M9 13h6" opacity="0.3"/><path d="M10 16h4" opacity="0.3"/>`,
    solid: `<path d="M12 4.25c-4 0-7.75 2-7.75 5.75v8A2.75 2.75 0 007 20.75h10a2.75 2.75 0 002.75-2.75v-8c0-3.75-3.75-5.75-7.75-5.75z"/>`,
    duoBg: `<path d="M5 10c0-3 3-5 7-5s7 2 7 5v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z"/>`,
  },
  {
    name: 'Rice',
    category: 'food',
    tags: ['rice', 'grain', 'carb', 'bowl', 'staple', 'asian', 'energy'],
    // Bowl of rice with chopsticks
    line: `<path d="M4 12c0 4 3.5 7 8 7s8-3 8-7H4z"/><path d="M2 12h20"/><path d="M15 3l-3 9"/><path d="M17 3l-3 9"/>`,
    solid: `<path d="M4 12c0 4 3.5 7 8 7s8-3 8-7H4z" fill="currentColor"/><path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M15 3l-3 9M17 3l-3 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M4 12c0 4 3.5 7 8 7s8-3 8-7H4z"/>`,
  },
  {
    name: 'Pasta',
    category: 'food',
    tags: ['pasta', 'spaghetti', 'carb', 'loading', 'pre-race', 'italian', 'dinner'],
    // Pasta/spaghetti swirl on a fork
    line: `<path d="M12 22v-8"/><path d="M10 14h4"/><path d="M8 8c0 3 1.5 5 4 6 2.5-1 4-3 4-6"/><path d="M8 8c-1-2 0-4 2-4"/><path d="M16 8c1-2 0-4-2-4"/><path d="M10 4c0-1 1-2 2-2s2 1 2 2"/>`,
    solid: `<path d="M8 8c0 3 1.5 5 4 6 2.5-1 4-3 4-6" fill="currentColor" opacity="0.3"/><path d="M8 8c-1-2 0-4 2-4M16 8c1-2 0-4-2-4M10 4c0-1 1-2 2-2s2 1 2 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M12 14v8M10 14h4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M8 8c0 3 1.5 5 4 6 2.5-1 4-3 4-6H8z"/>`,
  },
  {
    name: 'Oats',
    category: 'food',
    tags: ['oats', 'oatmeal', 'porridge', 'breakfast', 'overnight', 'fiber', 'morning'],
    // Bowl with oat flakes pattern
    line: `<path d="M4 10c0 5 3.5 8 8 8s8-3 8-8H4z"/><path d="M2 10h20"/><path d="M8 13c.5-.5 1-.5 1.5 0s1 .5 1.5 0"/><path d="M13 13c.5-.5 1-.5 1.5 0s1 .5 1.5 0"/><path d="M9 4l-1 3"/><path d="M12 3v4"/><path d="M15 4l1 3"/>`,
    solid: `<path d="M4 10c0 5 3.5 8 8 8s8-3 8-8H4z" fill="currentColor"/><path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M9 4l-1 3M12 3v4M15 4l1 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M4 10c0 5 3.5 8 8 8s8-3 8-8H4z"/>`,
  },
  {
    name: 'RiceCake',
    category: 'food',
    tags: ['rice', 'cake', 'cycling', 'mid-ride', 'homemade', 'portable', 'fuel'],
    // Small rectangular rice cake in parchment — classic cycling fuel
    line: `<rect x="5" y="7" width="14" height="10" rx="1"/><path d="M3 7l2-2h14l2 2"/><path d="M3 17l2 2h14l2 2"/><path d="M8 10h8" opacity="0.3"/><path d="M9 13h6" opacity="0.3"/>`,
    solid: `<path d="M3 7l2-2h14l2 2v10l-2 2H5l-2-2V7z" fill="currentColor"/>`,
    duoBg: `<rect x="5" y="7" width="14" height="10" rx="1"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PROTEIN (5)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Egg',
    category: 'food',
    tags: ['egg', 'protein', 'breakfast', 'complete', 'amino', 'whole'],
    line: `<path d="M12 3c-3 0-6 4-6 9s2.5 9 6 9 6-4 6-9-3-9-6-9z"/>`,
    solid: `<path d="M12 2.25c-3.5 0-6.75 4.25-6.75 9.75S8.5 21.75 12 21.75s6.75-4.25 6.75-9.75S15.5 2.25 12 2.25z"/>`,
    duoBg: `<path d="M12 3c-3 0-6 4-6 9s2.5 9 6 9 6-4 6-9-3-9-6-9z"/>`,
  },
  {
    name: 'Fish',
    category: 'food',
    tags: ['fish', 'salmon', 'omega', '3', 'protein', 'seafood', 'fatty'],
    line: `<path d="M2 12c3-4 7-6 11-6s5 2 7 6c-2 4-3 6-7 6s-8-2-11-6z"/><circle cx="17" cy="12" r="1" fill="currentColor" stroke="none"/><path d="M22 8l-3 4 3 4"/>`,
    solid: `<path d="M2 12c3-4 7-6 11-6s5 2 7 6c-2 4-3 6-7 6s-8-2-11-6z" fill="currentColor"/><circle cx="17" cy="12" r="1.25" fill="white"/><path d="M22 8l-3 4 3 4" fill="currentColor"/>`,
    duoBg: `<path d="M2 12c3-4 7-6 11-6s5 2 7 6c-2 4-3 6-7 6s-8-2-11-6z"/>`,
  },
  {
    name: 'Steak',
    category: 'food',
    tags: ['steak', 'beef', 'iron', 'protein', 'red', 'meat', 'dinner'],
    line: `<ellipse cx="12" cy="12" rx="9" ry="7"/><path d="M7 10c2-1 4 0 5 1s3 2 5 1" opacity="0.4"/><path d="M8 14c1.5-.5 3 0 4 .5s3 1 4 0" opacity="0.4"/><ellipse cx="15" cy="11" rx="2" ry="1.5" opacity="0.3"/>`,
    solid: `<ellipse cx="12" cy="12" rx="9.75" ry="7.75"/>`,
    duoBg: `<ellipse cx="12" cy="12" rx="9" ry="7"/>`,
  },
  {
    name: 'Tofu',
    category: 'food',
    tags: ['tofu', 'plant', 'protein', 'vegan', 'soy', 'block', 'vegetarian'],
    line: `<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 12h16"/><path d="M12 6v12"/><circle cx="8" cy="9" r="0.5" fill="currentColor" stroke="none" opacity="0.4"/><circle cx="16" cy="15" r="0.5" fill="currentColor" stroke="none" opacity="0.4"/>`,
    solid: `<path fillRule="evenodd" d="M6 5.25A2.75 2.75 0 003.25 8v8A2.75 2.75 0 006 18.75h12a2.75 2.75 0 002.75-2.75V8A2.75 2.75 0 0018 5.25H6zm.75 7.5v4.5h4.5v-4.5h-4.5zm6 0v4.5h4.5v-4.5h-4.5zm4.5-1.5v-4.5h-4.5v4.5h4.5zm-6-4.5v4.5h-4.5v-4.5h4.5z"/>`,
    duoBg: `<rect x="4" y="6" width="16" height="12" rx="2"/>`,
  },
  {
    name: 'Nuts',
    category: 'food',
    tags: ['nuts', 'almond', 'cashew', 'snack', 'fat', 'trail', 'mix', 'energy'],
    line: `<ellipse cx="8" cy="12" rx="4" ry="5" transform="rotate(-15 8 12)"/><ellipse cx="16" cy="11" rx="3.5" ry="4.5" transform="rotate(10 16 11)"/><path d="M11 16c1.5 1 3 1.5 5 1"/>`,
    solid: `<ellipse cx="8" cy="12" rx="4.5" ry="5.5" transform="rotate(-15 8 12)"/><ellipse cx="16" cy="11" rx="4" ry="5" transform="rotate(10 16 11)"/>`,
    duoBg: `<ellipse cx="8" cy="12" rx="4" ry="5" transform="rotate(-15 8 12)"/><ellipse cx="16" cy="11" rx="3.5" ry="4.5" transform="rotate(10 16 11)"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DAIRY (3)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Milk',
    category: 'food',
    tags: ['milk', 'dairy', 'calcium', 'recovery', 'chocolate', 'protein', 'drink'],
    line: `<path d="M7 6V4h10v2"/><path d="M7 6l-1 2v12a2 2 0 002 2h8a2 2 0 002-2V8l-1-2H7z"/><path d="M7 12h10"/><path d="M10 4V2h4v2"/>`,
    solid: `<path fillRule="evenodd" d="M9.25 2a.75.75 0 01.75-.75h4a.75.75 0 01.75.75v1.25H17a.75.75 0 01.75.75v2a.75.75 0 01-.04.24l-.96 2.4V20A2.75 2.75 0 0114 22.75H10A2.75 2.75 0 017.25 20V8.64l-.96-2.4A.75.75 0 016.25 6V4a.75.75 0 01.75-.75h2.25V2z"/>`,
    duoBg: `<path d="M7 6l-1 2v12a2 2 0 002 2h8a2 2 0 002-2V8l-1-2H7z"/>`,
  },
  {
    name: 'Cheese',
    category: 'food',
    tags: ['cheese', 'dairy', 'fat', 'protein', 'calcium', 'snack', 'wedge'],
    // Cheese wedge with holes
    line: `<path d="M2 18l10-14 10 14H2z"/><circle cx="9" cy="15" r="1.5"/><circle cx="15" cy="16" r="1"/><circle cx="12" cy="12" r="0.75" fill="currentColor" stroke="none"/>`,
    solid: `<path d="M2 18l10-14 10 14H2z" fill="currentColor"/><circle cx="9" cy="15" r="1.75" fill="white" opacity="0.4"/><circle cx="15" cy="16" r="1.25" fill="white" opacity="0.4"/><circle cx="12" cy="12" r="1" fill="white" opacity="0.4"/>`,
    duoBg: `<path d="M2 18l10-14 10 14H2z"/>`,
  },
  {
    name: 'Yogurt',
    category: 'food',
    tags: ['yogurt', 'dairy', 'probiotic', 'breakfast', 'protein', 'greek', 'skyr'],
    // Yogurt cup with spoon
    line: `<path d="M6 6h12l-1.5 14H7.5L6 6z"/><path d="M4 6h16"/><path d="M18 4c1 0 2 .5 2 1.5S19 7 18 7"/><path d="M9 10h6" opacity="0.3"/>`,
    solid: `<path d="M4 5.25a.75.75 0 01.75-.75H19.25a.75.75 0 010 1.5h-.44l-1.43 13.38a.75.75 0 01-.75.67H7.37a.75.75 0 01-.75-.67L5.19 6H4.75A.75.75 0 014 5.25z"/><path d="M18 4c1 0 2 .5 2 1.5S19 7 18 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M6 6h12l-1.5 14H7.5L6 6z"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SPORTS NUTRITION PRODUCTS (8) — the actual products
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'EnergyBar',
    category: 'sport-nutrition',
    tags: ['energy', 'bar', 'wrapper', 'snack', 'fuel', 'cycling', 'portable'],
    // Bar in torn-open wrapper
    line: `<rect x="3" y="8" width="18" height="8" rx="1.5"/><path d="M6 8V6l3-1"/><path d="M6 16v2l3 1"/><path d="M7 11h10" opacity="0.3"/><path d="M7 13h8" opacity="0.3"/>`,
    solid: `<path d="M4.5 7.25A2.25 2.25 0 002.25 9.5v5a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-15z"/><path d="M6 8V6l3-1M6 16v2l3 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<rect x="3" y="8" width="18" height="8" rx="1.5"/>`,
  },
  {
    name: 'GelPacket',
    category: 'sport-nutrition',
    tags: ['gel', 'packet', 'sachet', 'energy', 'race', 'squeeze', 'isotonic'],
    // Gel sachet with tear-off top — different from IconGel (which is conceptual)
    line: `<path d="M8 4h8l1 2v12a2 2 0 01-2 2H9a2 2 0 01-2-2V6l1-2z"/><path d="M8 4l-1-1.5h2L8 4"/><path d="M8 8h8"/><path d="M10 12v4" opacity="0.3"/><path d="M12 11v5" opacity="0.3"/><path d="M14 12v4" opacity="0.3"/>`,
    solid: `<path d="M8 4h8l1 2v12a2 2 0 01-2 2H9a2 2 0 01-2-2V6l1-2z" fill="currentColor"/><path d="M8 4l-1-1.5h2L8 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M8 4h8l1 2v12a2 2 0 01-2 2H9a2 2 0 01-2-2V6l1-2z"/>`,
  },
  {
    name: 'SportsDrink',
    category: 'sport-nutrition',
    tags: ['sports', 'drink', 'bottle', 'electrolyte', 'isotonic', 'hydration', 'mix'],
    // Sports bottle with squeeze nozzle
    line: `<path d="M9 5h6v2l1 1v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V8l1-1V5z"/><path d="M11 2h2v3h-2z"/><path d="M9 12h6"/><circle cx="12" cy="16" r="1.5"/>`,
    solid: `<path fillRule="evenodd" d="M10.25 2a.75.75 0 01.75-.75h2a.75.75 0 01.75.75v2.25H15a.75.75 0 01.75.75v1.94l.72.72a.75.75 0 01.22.53V20A2.75 2.75 0 0114 22.75h-4A2.75 2.75 0 017.25 20V8.19a.75.75 0 01.22-.53l.72-.72V5a.75.75 0 01.75-.75h1.31V2z"/>`,
    duoBg: `<path d="M9 5h6v2l1 1v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V8l1-1V5z"/>`,
  },
  {
    name: 'ShakerBottle',
    category: 'sport-nutrition',
    tags: ['shaker', 'bottle', 'protein', 'recovery', 'mix', 'post-workout', 'shake'],
    // Shaker bottle with flip-top lid and mixing ball
    line: `<path d="M7 8h10l.5 12a2 2 0 01-2 2H8.5a2 2 0 01-2-2L7 8z"/><path d="M7 8l1-3h8l1 3"/><path d="M10 5V3"/><path d="M14 5V3"/><path d="M10 5h4"/><circle cx="12" cy="14" r="2" strokeDasharray="2 1"/>`,
    solid: `<path d="M7 8h10l.5 12a2 2 0 01-2 2H8.5a2 2 0 01-2-2L7 8z" fill="currentColor"/><path d="M7 8l1-3h8l1 3" fill="currentColor" opacity="0.6"/><path d="M10 5V3h4v2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M7 8h10l.5 12a2 2 0 01-2 2H8.5a2 2 0 01-2-2L7 8z"/>`,
  },
  {
    name: 'EnergyChew',
    category: 'sport-nutrition',
    tags: ['energy', 'chew', 'gummy', 'block', 'blok', 'candy', 'fuel', 'portable'],
    // Small gummy block shapes
    line: `<rect x="3" y="5" width="7" height="6" rx="1.5"/><rect x="14" y="5" width="7" height="6" rx="1.5"/><rect x="3" y="13" width="7" height="6" rx="1.5"/><rect x="14" y="13" width="7" height="6" rx="1.5"/>`,
    solid: `<rect x="3" y="5" width="7" height="6" rx="1.5" fill="currentColor"/><rect x="14" y="5" width="7" height="6" rx="1.5" fill="currentColor" opacity="0.7"/><rect x="3" y="13" width="7" height="6" rx="1.5" fill="currentColor" opacity="0.7"/><rect x="14" y="13" width="7" height="6" rx="1.5" fill="currentColor"/>`,
    duoBg: `<rect x="3" y="5" width="18" height="14" rx="2"/>`,
  },
  {
    name: 'PowderScoop',
    category: 'sport-nutrition',
    tags: ['powder', 'scoop', 'protein', 'whey', 'measure', 'serving', 'mix'],
    // Measuring scoop heaped with powder
    line: `<path d="M6 14c0-3 2.5-5 6-5s6 2 6 5"/><path d="M4 14h16v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2z"/><path d="M6 14c1-5 3-8 6-8s5 3 6 8" strokeDasharray="2 2" opacity="0.4"/>`,
    solid: `<path d="M12 5.25c-3.5 0-6.75 3.5-6.75 8.75H4a.75.75 0 00-.75.75v2A4.75 4.75 0 008 21.5h8a4.75 4.75 0 004.75-4.75v-2a.75.75 0 00-.75-.75h-1.25C18.75 8.75 15.5 5.25 12 5.25z"/>`,
    duoBg: `<path d="M4 14h16v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2z"/>`,
  },
  {
    name: 'SaltTab',
    category: 'sport-nutrition',
    tags: ['salt', 'tab', 'tablet', 'electrolyte', 'capsule', 'sodium', 'sweat'],
    // Small tablet/capsule shape
    line: `<rect x="7" y="3" width="10" height="18" rx="5"/><path d="M7 12h10"/><circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" opacity="0.4"/><circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" opacity="0.4"/>`,
    solid: `<path fillRule="evenodd" d="M12 2.25A5.75 5.75 0 006.25 8v8a5.75 5.75 0 0011.5 0V8A5.75 5.75 0 0012 2.25zm0 4.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm-4.25 5h8.5v4.25a4.25 4.25 0 11-8.5 0v-4.25z"/>`,
    duoBg: `<rect x="7" y="3" width="10" height="18" rx="5"/>`,
  },
  {
    name: 'StickPack',
    category: 'sport-nutrition',
    tags: ['stick', 'pack', 'sachet', 'drink', 'mix', 'powder', 'single', 'serve'],
    // Long thin sachet with tear notch
    line: `<rect x="8" y="2" width="8" height="20" rx="1"/><path d="M8 6h8"/><path d="M6 6l2-1"/><path d="M8 18h8"/><path d="M11 10v4" opacity="0.3"/><path d="M13 9v5" opacity="0.3"/>`,
    solid: `<path fillRule="evenodd" d="M9 1.25A1.75 1.75 0 007.25 3v18c0 .97.78 1.75 1.75 1.75h6c.97 0 1.75-.78 1.75-1.75V3A1.75 1.75 0 0015 1.25H9zm-.75 5.5h7.5v11.5h-7.5V6.75z"/>`,
    duoBg: `<rect x="8" y="2" width="8" height="20" rx="1"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEALS / PREPARATIONS (4)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Smoothie',
    category: 'food',
    tags: ['smoothie', 'shake', 'blend', 'fruit', 'post', 'workout', 'drink'],
    // Tall glass with straw and fruit garnish
    line: `<path d="M7 4h10l-1.5 16H8.5L7 4z"/><path d="M5 4h14"/><path d="M15 4l2-3"/><path d="M10 8h4" opacity="0.3"/><circle cx="14" cy="4" r="1.5"/>`,
    solid: `<path d="M5 3.25a.75.75 0 01.75-.75H18.25a.75.75 0 010 1.5h-1.06l-1.44 15.38a.75.75 0 01-.75.67H9a.75.75 0 01-.75-.67L6.81 4H5.75A.75.75 0 015 3.25z"/><circle cx="14" cy="4" r="1.75" fill="currentColor"/><path d="M15 4l2-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M7 4h10l-1.5 16H8.5L7 4z"/>`,
  },
  {
    name: 'Bowl',
    category: 'food',
    tags: ['bowl', 'acai', 'poke', 'grain', 'buddha', 'meal', 'prep'],
    // Bowl with toppings
    line: `<path d="M3 10c0 5 4 9 9 9s9-4 9-9H3z"/><path d="M2 10h20"/><circle cx="8" cy="13" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="16" cy="13" r="1.5"/>`,
    solid: `<path d="M3 10c0 5 4 9 9 9s9-4 9-9H3z" fill="currentColor"/><path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><circle cx="8" cy="13" r="1.75" fill="white" opacity="0.4"/><circle cx="12" cy="12" r="1.75" fill="white" opacity="0.4"/><circle cx="16" cy="13" r="1.75" fill="white" opacity="0.4"/>`,
    duoBg: `<path d="M3 10c0 5 4 9 9 9s9-4 9-9H3z"/>`,
  },
  {
    name: 'Sandwich',
    category: 'food',
    tags: ['sandwich', 'lunch', 'bread', 'meal', 'portable', 'wrap', 'fuel'],
    line: `<path d="M3 14l9-10 9 10"/><path d="M3 14h18"/><rect x="3" y="14" width="18" height="3" rx="0.5"/><path d="M3 17h18v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"/>`,
    solid: `<path d="M12 3.5L2.5 14h19L12 3.5z" fill="currentColor" opacity="0.3"/><rect x="2.5" y="14" width="19" height="3.5" rx="1" fill="currentColor"/><path d="M2.5 17.5h19v2a1.5 1.5 0 01-1.5 1.5H4a1.5 1.5 0 01-1.5-1.5v-2z" fill="currentColor" opacity="0.7"/>`,
    duoBg: `<path d="M3 14l9-10 9 10H3z"/>`,
  },
  {
    name: 'Soup',
    category: 'food',
    tags: ['soup', 'warm', 'broth', 'recovery', 'winter', 'bowl', 'comfort'],
    line: `<path d="M4 12c0 5 3.5 8 8 8s8-3 8-8H4z"/><path d="M2 12h20"/><path d="M8 8c0-1 .5-2 1.5-2" opacity="0.4"/><path d="M12 7c0-1.5.5-2 1.5-3" opacity="0.4"/><path d="M16 8c0-1 .5-2 1.5-2" opacity="0.4"/>`,
    solid: `<path d="M4 12c0 5 3.5 8 8 8s8-3 8-8H4z" fill="currentColor"/><path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M8 8c0-1 .5-2 1.5-2M12 7c0-1.5.5-2 1.5-3M16 8c0-1 .5-2 1.5-2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>`,
    duoBg: `<path d="M4 12c0 5 3.5 8 8 8s8-3 8-8H4z"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONDIMENTS / EXTRAS (4)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Honey',
    category: 'food',
    tags: ['honey', 'natural', 'sugar', 'energy', 'bee', 'syrup', 'carb'],
    // Honey jar with dipper
    line: `<path d="M6 10h12v8a3 3 0 01-3 3H9a3 3 0 01-3-3v-8z"/><path d="M6 10c0-2 2.5-4 6-4s6 2 6 4"/><path d="M4 10h16"/><path d="M12 6V3"/><path d="M10 3.5h4"/>`,
    solid: `<path d="M12 5.25c-3.5 0-6.75 1.75-6.75 4.75H4a.75.75 0 000 1.5h.25V18a3.75 3.75 0 003.75 3.75h8A3.75 3.75 0 0019.75 18v-6.5H20a.75.75 0 000-1.5h-1.25c0-3-3.25-4.75-6.75-4.75z"/><path d="M12 6V3M10 3.5h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M6 10h12v8a3 3 0 01-3 3H9a3 3 0 01-3-3v-8z"/>`,
  },
  {
    name: 'PeanutButter',
    category: 'food',
    tags: ['peanut', 'butter', 'pb', 'protein', 'fat', 'spread', 'cyclist', 'fuel'],
    // Jar with spreading knife
    line: `<rect x="6" y="8" width="12" height="12" rx="2"/><path d="M6 8l1-3h10l1 3"/><path d="M8 5h8"/><path d="M19 6l3-4"/><path d="M19 6l2.5-.5"/>`,
    solid: `<rect x="6" y="8" width="12" height="12" rx="2" fill="currentColor"/><path d="M7 5h10l1 3H6l1-3z" fill="currentColor" opacity="0.6"/><path d="M8 5h8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M19 6l3-4M19 6l2.5-.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<rect x="6" y="8" width="12" height="12" rx="2"/>`,
  },
  {
    name: 'MapleSyrup',
    category: 'food',
    tags: ['maple', 'syrup', 'natural', 'sugar', 'pancake', 'energy', 'canadian'],
    // Maple leaf shape — natural energy
    line: `<path d="M12 2v2l-2 2 3 1-2 3 4-1v3l3-3-1-3 3-1-2-2V2l-3 2-3-2z"/><path d="M12 14v8"/><path d="M9 19h6"/>`,
    solid: `<path d="M12 2v2l-2 2 3 1-2 3 4-1v3l3-3-1-3 3-1-2-2V2l-3 2-3-2z" fill="currentColor"/><path d="M12 14v8M9 19h6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M12 2v2l-2 2 3 1-2 3 4-1v3l3-3-1-3 3-1-2-2V2l-3 2-3-2z"/>`,
  },
  {
    name: 'Granola',
    category: 'food',
    tags: ['granola', 'trail', 'mix', 'snack', 'oat', 'cluster', 'hiking', 'energy'],
    // Scattered granola clusters
    line: `<circle cx="6" cy="10" r="2.5"/><circle cx="13" cy="8" r="3"/><circle cx="18" cy="12" r="2"/><circle cx="8" cy="16" r="2.5"/><circle cx="15" cy="15" r="2"/><circle cx="11" cy="19" r="1.5"/>`,
    solid: `<circle cx="6" cy="10" r="3"/><circle cx="13" cy="8" r="3.5"/><circle cx="18" cy="12" r="2.5"/><circle cx="8" cy="16" r="3"/><circle cx="15" cy="15" r="2.5"/><circle cx="11" cy="19" r="2"/>`,
    duoBg: `<rect x="2" y="4" width="20" height="18" rx="3"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EASTER EGGS — Sjove madting (5)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Sushi',
    category: 'food',
    tags: ['sushi', 'japanese', 'fish', 'rice', 'raw', 'treat', 'fun'],
    // Maki roll — cross section
    line: `<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="2.5"/><path d="M10 9.5c.5-.5 1.5-.5 2 0" opacity="0.4"/>`,
    solid: `<path fillRule="evenodd" d="M12 3.25a8.75 8.75 0 100 17.5 8.75 8.75 0 000-17.5zM6.25 12a5.75 5.75 0 1111.5 0 5.75 5.75 0 01-11.5 0zm3 0a2.75 2.75 0 115.5 0 2.75 2.75 0 01-5.5 0z"/>`,
    duoBg: `<circle cx="12" cy="12" r="8"/>`,
  },
  {
    name: 'Taco',
    category: 'food',
    tags: ['taco', 'mexican', 'tuesday', 'cheat', 'meal', 'treat', 'fun'],
    // Taco with fillings
    line: `<path d="M3 16c0-6 4-12 9-12s9 6 9 12"/><path d="M3 16c0 2 4 4 9 4s9-2 9-4"/><circle cx="8" cy="14" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5"/><circle cx="16" cy="14" r="1" fill="currentColor" stroke="none"/><path d="M10 16h4" opacity="0.3"/>`,
    solid: `<path d="M12 3.25c-5 0-9.75 6-9.75 12.75 0 2.5 4.25 4.75 9.75 4.75s9.75-2.25 9.75-4.75C21.75 9.25 17 3.25 12 3.25z" fill="currentColor"/><circle cx="8" cy="14" r="1.25" fill="white" opacity="0.4"/><circle cx="12" cy="12" r="1.75" fill="white" opacity="0.4"/><circle cx="16" cy="14" r="1.25" fill="white" opacity="0.4"/>`,
    duoBg: `<path d="M3 16c0-6 4-12 9-12s9 6 9 12c0 2-4 4-9 4s-9-2-9-4z"/>`,
  },
  {
    name: 'Donut',
    category: 'food',
    tags: ['donut', 'doughnut', 'sugar', 'cheat', 'guilty', 'treat', 'bakery', 'fun'],
    // Donut with frosting and sprinkles
    line: `<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M4.5 10c1-3 4-5 7.5-5s6.5 2 7.5 5" strokeWidth="2" opacity="0.3"/><path d="M8 8l.5 1" opacity="0.5"/><path d="M14 7l.5 1.5" opacity="0.5"/><path d="M17 9l-.5 1" opacity="0.5"/>`,
    solid: `<path fillRule="evenodd" d="M12 3.25a8.75 8.75 0 100 17.5 8.75 8.75 0 000-17.5zM8.25 12a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z"/>`,
    duoBg: `<circle cx="12" cy="12" r="8"/>`,
  },
  {
    name: 'Ramen',
    category: 'food',
    tags: ['ramen', 'noodle', 'soup', 'recovery', 'warm', 'japanese', 'comfort', 'fun'],
    // Ramen bowl with noodles and egg
    line: `<path d="M3 10c0 5 4 9 9 9s9-4 9-9H3z"/><path d="M2 10h20"/><path d="M7 13c1 1 2 0 3 1s2 0 3 1 2 0 3 1"/><path d="M7 15c1 1 2 0 3 1s2 0 3 1"/><ellipse cx="16" cy="12" rx="2" ry="1.5"/><path d="M9 7c0-1.5 1-2 2-2.5" opacity="0.4"/><path d="M13 6c0-1.5 1-2 2-2" opacity="0.4"/>`,
    solid: `<path d="M3 10c0 5 4 9 9 9s9-4 9-9H3z" fill="currentColor"/><path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><ellipse cx="16" cy="12" rx="2.25" ry="1.75" fill="white" opacity="0.5"/><path d="M9 7c0-1.5 1-2 2-2.5M13 6c0-1.5 1-2 2-2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>`,
    duoBg: `<path d="M3 10c0 5 4 9 9 9s9-4 9-9H3z"/>`,
  },
  {
    name: 'Pancakes',
    category: 'food',
    tags: ['pancakes', 'breakfast', 'carbs', 'weekend', 'stack', 'syrup', 'morning', 'fun'],
    // Stack of pancakes with dripping syrup
    line: `<ellipse cx="12" cy="18" rx="8" ry="2.5"/><ellipse cx="12" cy="14" rx="7" ry="2"/><ellipse cx="12" cy="10" rx="6" ry="2"/><ellipse cx="12" cy="6" rx="5" ry="2"/><path d="M17 6c1 1 1.5 2 .5 3" opacity="0.4"/><path d="M16 10c1.5.5 2 1.5 1 2.5" opacity="0.4"/>`,
    solid: `<ellipse cx="12" cy="18" rx="8.75" ry="3" fill="currentColor"/><ellipse cx="12" cy="14" rx="7.75" ry="2.5" fill="currentColor" opacity="0.85"/><ellipse cx="12" cy="10" rx="6.75" ry="2.5" fill="currentColor" opacity="0.7"/><ellipse cx="12" cy="6" rx="5.75" ry="2.5" fill="currentColor" opacity="0.55"/>`,
    duoBg: `<ellipse cx="12" cy="12" rx="8" ry="8"/>`,
  },
]

// ─── Generators (same pattern) ───────────────────────────────────────────────

function lineFile(icon) {
  return `${COPYRIGHT}
import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const Icon${icon.name} = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    ${icon.line}
  </IconBase>
))
Icon${icon.name}.displayName = 'Icon${icon.name}'
`
}
function lightFile(icon) {
  return `${COPYRIGHT}
import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const Icon${icon.name} = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    ${icon.line}
  </IconBaseLight>
))
Icon${icon.name}.displayName = 'Icon${icon.name}'
`
}
function solidFile(icon) {
  return `${COPYRIGHT}
import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const Icon${icon.name}Solid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    ${icon.solid}
  </IconBaseSolid>
))
Icon${icon.name}Solid.displayName = 'Icon${icon.name}Solid'
`
}
function duoFile(icon) {
  return `${COPYRIGHT}
import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const Icon${icon.name}Duo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      ${icon.duoBg}
    </g>
    {/* Foreground */}
    ${icon.line}
  </IconBaseDuo>
))
Icon${icon.name}Duo.displayName = 'Icon${icon.name}Duo'
`
}
function catalogEntry(icon) {
  return `  {
    name: 'Icon${icon.name}',
    category: '${icon.category}',
    tags: [${icon.tags.map(t => `'${t}'`).join(', ')}],
    hasLine: true,
    hasSolid: true,
    hasDuo: true,
    hasAnimated: false,
  },`
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log(`\n🍌 Generating Wave 12 food icons: ${ICONS.length} icons × 4 variants = ${ICONS.length * 4} files\n`)

const lineExports = [], lightExports = [], solidExports = [], duoExports = [], catalogEntries = []

for (const icon of ICONS) {
  writeFileSync(join(BASE, 'line', `Icon${icon.name}.tsx`), lineFile(icon))
  lineExports.push(`export { Icon${icon.name} } from './Icon${icon.name}'`)
  writeFileSync(join(BASE, 'light', `Icon${icon.name}.tsx`), lightFile(icon))
  lightExports.push(`export { Icon${icon.name} } from './Icon${icon.name}'`)
  writeFileSync(join(BASE, 'solid', `Icon${icon.name}Solid.tsx`), solidFile(icon))
  solidExports.push(`export { Icon${icon.name}Solid } from './Icon${icon.name}Solid'`)
  writeFileSync(join(BASE, 'duo', `Icon${icon.name}Duo.tsx`), duoFile(icon))
  duoExports.push(`export { Icon${icon.name}Duo } from './Icon${icon.name}Duo'`)
  catalogEntries.push(catalogEntry(icon))
  console.log(`  ✓ Icon${icon.name}`)
}

const divider = '\n// --- Wave 12: Food & Sports Nutrition Products ---\n'
appendFileSync(join(BASE, 'line', 'index.ts'), divider + lineExports.join('\n') + '\n')
appendFileSync(join(BASE, 'light', 'index.ts'), divider + lightExports.join('\n') + '\n')
appendFileSync(join(BASE, 'solid', 'index.ts'), divider + solidExports.join('\n') + '\n')
appendFileSync(join(BASE, 'duo', 'index.ts'), divider + duoExports.join('\n') + '\n')

const catalogPath = join(BASE, 'catalog.ts')
let catalogContent = readFileSync(catalogPath, 'utf-8')
const newEntriesBlock = `\n  // ─── Wave 12: Food & Sports Nutrition Products (${ICONS.length}) ──────────\n${catalogEntries.join('\n')}\n`
catalogContent = catalogContent.replace(/\n\]\n$/, newEntriesBlock + ']\n')
const totalCount = (catalogContent.match(/name: 'Icon/g) || []).length
catalogContent = catalogContent.replace(/Icon catalog metadata \(\d+ icons/, `Icon catalog metadata (${totalCount} icons`)
writeFileSync(catalogPath, catalogContent)

console.log(`\n✓ Total: ${totalCount} base icons × 4 = ${totalCount * 4} components`)
