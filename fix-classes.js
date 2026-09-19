import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let filepath = path.join(dir, file);
    let stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith('.tsx')) {
      callback(filepath);
    }
  });
}

walk('artifacts/freightshift/src/components', (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Replacements
  const replacements = [
    [/font-mono text-xs uppercase tracking-widest font-bold/g, 'text-sm font-medium tracking-wide'],
    [/font-mono text-xs uppercase tracking-wider font-bold/g, 'text-sm font-medium tracking-wide'],
    [/font-mono text-sm uppercase tracking-widest font-bold/g, 'text-base font-medium tracking-wide'],
    [/font-mono text-sm uppercase tracking-wider font-bold/g, 'text-base font-medium tracking-wide'],
    [/font-mono font-bold uppercase tracking-wider/g, 'font-medium tracking-wide'],
    [/font-mono text-sm font-bold uppercase tracking-widest/g, 'text-sm font-medium tracking-wide'],
    [/font-mono uppercase tracking-widest text-xs/g, 'text-sm font-medium tracking-wide'],
    [/font-mono uppercase tracking-widest/g, 'font-medium tracking-wide'],
    [/font-mono tracking-tight/g, 'font-medium tracking-tight'],
    [/font-mono/g, 'font-medium'],
    [/uppercase/g, ''],
    [/rounded-none/g, 'rounded-xl'],
    [/border-b-2/g, 'border-b'],
    [/border-t-2/g, 'border-t'],
    [/border-l-2/g, 'border-l'],
    [/border-r-2/g, 'border-r'],
    [/border-2/g, 'border'],
    [/bg-brand-orange/g, 'bg-primary'],
    [/text-brand-orange/g, 'text-primary'],
    [/text-brand-blue/g, 'text-foreground\/60'],
    [/border-brand-blue/g, 'border-border'],
    [/bg-section-alt/g, 'bg-muted\/30'],
    [/bg-foreground text-background/g, 'bg-foreground text-primary-foreground'],
    [/\bsection-grid\b/g, ''],
    [/\bfont-bold\b/g, 'font-semibold'],
    [/\bfont-display\b/g, 'font-serif'],
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
});
