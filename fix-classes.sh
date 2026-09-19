#!/bin/bash

# Find all files to process
FILES=$(find artifacts/freightshift/src/components -type f -name "*.tsx")

for file in $FILES; do
  # Replace standard uppercase, font-mono, and harsh borders with softer ones
  sed -i 's/font-mono text-xs uppercase tracking-widest font-bold/font-medium text-sm tracking-wide/g' "$file"
  sed -i 's/font-mono text-xs uppercase tracking-wider font-bold/font-medium text-sm tracking-wide/g' "$file"
  sed -i 's/font-mono text-sm uppercase tracking-widest font-bold/font-medium text-base tracking-wide/g' "$file"
  sed -i 's/font-mono text-sm uppercase tracking-wider font-bold/font-medium text-base tracking-wide/g' "$file"
  sed -i 's/font-mono font-bold uppercase tracking-wider/font-medium tracking-wide/g' "$file"
  sed -i 's/font-mono tracking-tight/font-medium tracking-tight/g' "$file"
  sed -i 's/font-mono/font-medium/g' "$file"
  
  sed -i 's/uppercase//g' "$file"
  sed -i 's/rounded-none/rounded-lg/g' "$file"
  sed -i 's/border-b-2/border-b/g' "$file"
  sed -i 's/border-t-2/border-t/g' "$file"
  sed -i 's/border-l-2/border-l/g' "$file"
  sed -i 's/border-r-2/border-r/g' "$file"
  sed -i 's/border-2/border/g' "$file"
  
  sed -i 's/bg-brand-orange/bg-primary/g' "$file"
  sed -i 's/text-brand-orange/text-primary/g' "$file"
  sed -i 's/text-brand-blue/text-foreground\/60/g' "$file"
  sed -i 's/border-brand-blue/border-border/g' "$file"
  sed -i 's/bg-section-alt/bg-background/g' "$file"
  sed -i 's/bg-foreground text-background/bg-foreground text-primary-foreground/g' "$file"
  
  # Ensure we don't accidentally ruin class spacing if we stripped `uppercase ` (leaves double spaces)
  sed -i 's/  / /g' "$file"
done

