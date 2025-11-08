// Script to generate PWA icons
// Run with: node scripts/generate-icons.js
// Note: This requires a base icon.png (512x512) in the public/icons/ directory

const fs = require('fs')
const path = require('path')

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const iconsDir = path.join(process.cwd(), 'public', 'icons')

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

console.log('PWA Icons Setup:')
console.log('1. Create a 512x512 icon.png file')
console.log('2. Place it in public/icons/icon-512x512.png')
console.log('3. Use an image editor to generate other sizes:')
sizes.forEach(size => {
  console.log(`   - icon-${size}x${size}.png (${size}x${size})`)
})

console.log('\nFor now, placeholder icons will be referenced in the manifest.')
console.log('Replace them with actual icons for production.')

