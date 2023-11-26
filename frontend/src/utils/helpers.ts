export function checkString(substring: string, str: string): boolean {
  if (!substring) {
    return false;
  }
  for (let i = 0; i < substring.length; i++) {
    if (substring[i].toLowerCase() !== str[i].toLowerCase()) {
      return false;
    }
  }

  return true;
}
