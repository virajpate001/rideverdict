export const slugify = (s) =>
  s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&amp;/g, 'and')
   .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const TRANSFORM = /^((f|q|w|h|c|g|e|ar|dpr|fl|b|o|r|x|y|z)_[\w.:-]+)(,(f|q|w|h|c|g|e|ar|dpr|fl|b|o|r|x|y|z)_[\w.:-]+)*$/;


// Injects Cloudinary auto-format/quality/width. Paste the plain Cloudinary URL in JSON.
export const cld = (url, w = 800) => {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  const [head, tail] = url.split('/upload/');
  const parts = tail.split('/');
  while (parts.length > 1 && TRANSFORM.test(parts[0])) parts.shift(); // drop old transformations
  return `${head}/upload/f_auto,q_auto,w_${w}/${parts.join('/')}`;
};

export const cldSet = (url, ws = [400, 700, 1100]) => ws.map((w) => `${cld(url, w)} ${w}w`).join(', ');

// Tiny safe inline formatter: **bold** and [text](url)
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const inline = (t) =>
  esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');