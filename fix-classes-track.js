import fs from 'fs';
import path from 'path';

let filepath = 'artifacts/freightshift/src/pages/track.tsx';
let content = fs.readFileSync(filepath, 'utf8');

// Replacements
const replacements = [
  [/font-mono text-xs font-bold uppercase tracking-widest/g, 'text-sm font-medium tracking-wide'],
  [/font-mono text-xs uppercase tracking-widest/g, 'text-sm font-medium tracking-wide'],
  [/font-mono text-[10px] font-bold uppercase tracking-\[0.16em\]/g, 'text-xs font-medium tracking-wider'],
  [/font-mono font-bold uppercase tracking-\[0.2em\]/g, 'font-medium tracking-wider'],
  [/font-mono text-[11px] font-bold uppercase tracking-\[0.2em\]/g, 'text-xs font-medium tracking-wider'],
  [/font-mono text-[10px] font-bold uppercase tracking-widest/g, 'text-xs font-medium tracking-wider'],
  [/font-mono text-xs font-bold uppercase tracking-wider/g, 'text-sm font-medium tracking-wide'],
  [/font-mono text-sm font-bold uppercase/g, 'text-sm font-medium'],
  [/font-mono font-bold uppercase tracking-wider/g, 'font-medium tracking-wide'],
  [/font-mono font-bold tracking-wider uppercase/g, 'font-medium tracking-wide'],
  [/font-mono text-xs font-bold tracking-wider uppercase/g, 'text-sm font-medium tracking-wide'],
  [/font-mono text-sm font-bold uppercase tracking-wider/g, 'text-base font-medium tracking-wide'],
  [/font-display font-bold uppercase tracking-tight/g, 'font-serif font-semibold tracking-tight'],
  [/font-display text-2xl font-bold uppercase leading-none tracking-wide/g, 'font-serif text-2xl font-semibold leading-none tracking-wide'],
  [/font-display text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tight/g, 'font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight'],
  [/font-mono/g, 'font-sans'],
  [/uppercase/g, ''],
  [/rounded-none/g, 'rounded-2xl'],
  [/border-b-2/g, 'border-b'],
  [/border-t-2/g, 'border-t'],
  [/border-l-2/g, 'border-l'],
  [/border-r-2/g, 'border-r'],
  [/border-2/g, 'border'],
  [/bg-brand-orange/g, 'bg-primary'],
  [/text-brand-orange/g, 'text-primary'],
  [/border-brand-orange/g, 'border-primary'],
  [/text-brand-blue/g, 'text-primary'],
  [/bg-brand-blue/g, 'bg-primary'],
  [/border-brand-blue/g, 'border-primary'],
  [/shadow-\[6px_6px_0_hsl\(var\(--brand-blue\)\/0\.12\)\]/g, 'shadow-lg'],
  [/shadow-\[8px_8px_0_hsl\(var\(--foreground\)\/0\.1\)\]/g, 'shadow-xl'],
  [/shadow-\[3px_3px_0_hsl\(var\(--foreground\)\/0\.14\)\]/g, 'shadow-sm rounded-full'],
  [/bg-foreground px-2 py-0.5 text-\[10px\] font-medium font-semibold tracking-widest text-background/g, 'bg-primary\/10 text-primary px-2 py-0.5 rounded-full text-xs font-semibold'],
  [/\bsection-grid\b/g, ''],
  [/\/\/\sTRACKING ID/g, 'Tracking ID'],
  [/\/\/\sTIMELINE/g, 'Timeline'],
];

let newContent = content;
replacements.forEach(([regex, replacement]) => {
  newContent = newContent.replace(regex, replacement);
});

// Clean up double spaces in classNames
newContent = newContent.replace(/className="([^"]+)"/g, (match, p1) => {
  return `className="${p1.replace(/\s+/g, ' ').trim()}"`;
});
newContent = newContent.replace(/className={`([^`]+)`}/g, (match, p1) => {
  return `className={\`${p1.replace(/ {2,}/g, ' ')}\`}`;
});

if (content !== newContent) {
  fs.writeFileSync(filepath, newContent, 'utf8');
}

