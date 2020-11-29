export const generateEnglishAlphabet = (uppercase = true) => Array(26)
    .fill(null)
    .map((_, index) => (uppercase ? 'A' : 'a').charCodeAt(0) + index)
    .map(charCode => String.fromCharCode(charCode)) 
