# UIT University Logo Setup

## How to Add Your Logo

1. **Save the UIT logo image** as `uit-logo.png` in this directory (`public/images/`)
2. **The logo should be in PNG format** with transparent background for best results
3. **Recommended size**: 200x200 pixels or larger (will be automatically resized)
4. **The header and footer** will automatically use this logo

## File Structure
```
public/
  images/
    logo_with_text_final__6_-removebg-preview (2).png  <- Place your logo here
    README.md     <- This file
```

## Fallback Behavior
- If the logo image is not found, the header and footer will show a fallback "U" text logo
- This ensures the website always displays properly even without the image

## Logo Requirements
- **Format**: PNG (preferred) or JPG
- **Background**: Transparent PNG recommended
- **Size**: Any size (will be automatically scaled to fit)
- **Name**: Must be exactly `uit-logo.png`

## Current Status
- ✅ Header component updated to use logo
- ✅ Footer component updated to use logo  
- ✅ Fallback text logo configured
- ⏳ **Next step**: Add `uit-logo.png` file to this directory