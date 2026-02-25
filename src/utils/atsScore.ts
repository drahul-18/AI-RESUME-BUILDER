import type { ResumeData } from '../types/resume';
import { getTotalSkillCount } from '../types/resume';

/** Check if text contains measurable impact (numbers, %, k, etc.) */
function hasMeasurableImpact(text: string): boolean {
  return /[\d%]|\bk\b/i.test(text);
}

/** Count words in text */
function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Education entry has all required fields filled */
function isEducationComplete(edu: ResumeData['education'][0]): boolean {
  return !!(
    edu.institution?.trim() &&
    edu.degree?.trim() &&
    edu.field?.trim() &&
    edu.startDate?.trim() &&
    edu.endDate?.trim()
  );
}

export function computeATSScore(data: ResumeData): number {
  let score = 0;

  // +15 if summary length is 40–120 words
  const summaryWords = wordCount(data.summary);
  if (summaryWords >= 40 && summaryWords <= 120) score += 15;

  // +10 if at least 2 projects
  if (data.projects.length >= 2) score += 10;

  // +10 if at least 1 experience entry
  if (data.experience.length >= 1) score += 10;

  // +10 if skills list has ≥ 8 items
  if (getTotalSkillCount(data.skills) >= 8) score += 10;

  // +10 if GitHub or LinkedIn link exists
  if (data.links.github?.trim() || data.links.linkedin?.trim()) score += 10;

  // +15 if any experience/project bullet contains a number (%, X, k, etc.)
  const bullets = [
    ...data.experience.map((e) => e.description),
    ...data.projects.map((p) => p.description),
  ];
  if (bullets.some((b) => b && hasMeasurableImpact(b))) score += 15;

  // +10 if education section has complete fields (at least one complete entry)
  if (data.education.some(isEducationComplete)) score += 10;

  return Math.min(score, 100);
}

export function getATSSuggestions(data: ResumeData): string[] {
  const suggestions: string[] = [];

  const summaryWords = wordCount(data.summary);
  if (summaryWords < 40 || summaryWords > 120) {
    suggestions.push('Write a stronger summary (40–120 words).');
  }

  if (data.projects.length < 2) {
    suggestions.push('Add at least 2 projects.');
  }

  const bullets = [
    ...data.experience.map((e) => e.description),
    ...data.projects.map((p) => p.description),
  ];
  if (!bullets.some((b) => b && hasMeasurableImpact(b))) {
    suggestions.push('Add measurable impact (numbers) in bullets.');
  }

  if (getTotalSkillCount(data.skills) < 8) {
    suggestions.push('Add more skills (target 8+).');
  }

  if (!data.links.github?.trim() && !data.links.linkedin?.trim()) {
    suggestions.push('Add GitHub or LinkedIn link.');
  }

  if (data.experience.length < 1) {
    suggestions.push('Add at least 1 experience entry.');
  }

  if (!data.education.some(isEducationComplete)) {
    suggestions.push('Complete education section with all fields.');
  }

  return suggestions.slice(0, 3);
}

/** Top 3 Improvements for the Improvement Panel */
export function getTopImprovements(data: ResumeData): string[] {
  const improvements: string[] = [];

  if (data.projects.length < 2) {
    improvements.push('Add at least 2 projects to strengthen your profile.');
  }

  const bullets = [
    ...data.experience.map((e) => e.description),
    ...data.projects.map((p) => p.description),
  ];
  if (!bullets.some((b) => b && /[\d%]|\bk\b/i.test(b))) {
    improvements.push('Add measurable impact (numbers, %, metrics) in bullets.');
  }

  const summaryWords = data.summary.trim().split(/\s+/).filter(Boolean).length;
  if (summaryWords < 40) {
    improvements.push('Expand your summary to 40+ words for better impact.');
  }

  if (getTotalSkillCount(data.skills) < 8) {
    improvements.push('Expand skills list to 8+ items.');
  }

  if (data.experience.length < 1) {
    improvements.push('Add internship or project work as experience.');
  }

  return improvements.slice(0, 3);
}

