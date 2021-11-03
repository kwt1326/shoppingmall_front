export const categoryMapper = (category: string) => {
  switch (category) {
    case 'holoen':
      return 1;
    case 'holojp':
      return 2;
    default:
      return null;
  }
}