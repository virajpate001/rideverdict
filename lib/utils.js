export const slugify = (s) =>
  s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&amp;/g, 'and')
   .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

// Injects Cloudinary auto-format/quality/width. Paste the plain Cloudinary URL in JSON.
export const cld = (url, w = 800) =>
  url && url.includes('res.cloudinary.com') && url.includes('/upload/')
    ? url.replace('/upload/', `/upload/f_auto,q_auto,w_${w}/`)
    : url;

// Tiny safe inline formatter: **bold** and [text](url)
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const inline = (t) =>
  esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');