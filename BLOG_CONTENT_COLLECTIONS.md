# Blog cu Astro Content Collections ✅

## ✅ **Implementare Completă - Best Practices Astro!**

Blogul InuWood folosește acum **Astro Content Collections** cu fișiere `.md`, rute dinamice `[slug].astro` și paginare `[...page].astro` - exact cum recomandă documentația Astro!

---

## 🎯 **Arhitectură Modernă**

### **Content Collections**
- ✅ Fișiere `.md` în `src/content/blog/`
- ✅ Schema TypeScript validată
- ✅ Frontmatter cu meta date
- ✅ Type-safe content queries

### **Rute Dinamice**
- ✅ `[slug].astro` - Articole individuale (build time)
- ✅ `[...page].astro` - Index cu paginare (build time)
- ✅ `getStaticPaths()` pentru generare statică

---

## 📁 **Structura Nouă**

```
src/
├── content/
│   ├── config.ts                          ← Schema definit ion
│   └── blog/
│       ├── arta-imbunarilor-coada-de-randu-nica.md
│       ├── alegerea-lemnului-potrivit.md
│       ├── silvicultura-sustenabila.md
│       ├── restaurare-credinta-mid-century.md
│       ├── unelte-esentiale-tamplarie.md
│       └── frumusetea-designului-live-edge.md
├── pages/
│   └── blog/
│       ├── [slug].astro                   ← Rută dinamică articole
│       └── [...page].astro                ← Index cu paginare
└── components/
    ├── Blog/
    │   └── BlogPost.astro                 ← Layout articole
    └── SEO/
        └── BlogPostSchema.astro           ← Schema.org

Vechile fișiere .astro din src/pages/blog/ au fost ȘTERSE ✅
```

---

## 🔧 **Content Collections Config**

### `src/content/config.ts`

```typescript
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    category: z.string(),
    image: z.string(),
    readTime: z.string(),
    author: z.string().optional().default('InuWood'),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  'blog': blogCollection,
};
```

**Beneficii:**
- ✅ Validare automată frontmatter
- ✅ TypeScript type safety
- ✅ Autocomplete în IDE
- ✅ Erori la build dacă lipsesc câmpuri

---

## 📝 **Format Fișiere Markdown**

### Exemplu: `arta-imbunarilor-coada-de-randu-nica.md`

```markdown
---
title: 'Arta Îmbinărilor Coadă de Rândunică'
excerpt: 'Descoperă tehnica intemporală...'
date: '15 Martie 2024'
category: 'Tehnici'
image: 'https://...'
readTime: '5 min citire'
---

## Heading 2

Conținut markdown cu **bold**, *italic*, liste, etc.

### Heading 3

Mai mult conținut...
```

**Avantaje .md vs .astro:**
- ✅ Mai ușor de scris/editat
- ✅ Separă conținut de layout
- ✅ Portabil (poate fi mutat la alt CMS)
- ✅ Git-friendly (diff-uri clare)

---

## 🚀 **Rută Dinamică [slug].astro**

### Caracteristici

```astro
export async function getStaticPaths() {
  const blogEntries = await getCollection('blog', ({ data }) => {
    return data.draft !== true;  // Exclude draft-uri
  });
  
  return blogEntries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}
```

**Ce face:**
- ✅ Generează toate rutele la **build time** (SSG)
- ✅ Exclude articolele cu `draft: true`
- ✅ Slug-ul este auto-generat din numele fișierului
- ✅ Type-safe props cu TypeScript

**URL-uri generate:**
- `/blog/arta-imbunarilor-coada-de-randu-nica`
- `/blog/alegerea-lemnului-potrivit`
- `/blog/silvicultura-sustenabila`
- etc.

### CTA Personalizat pe Categorie

Fiecare articol are CTA relevant bazat pe categorie:

- **Tehnici** → "Vrei Mobilier cu Îmbinări Tradiționale?"
- **Materiale** → "Ai Nevoie de Consultanță pentru Lemn?"
- **Sustenabilitate** → "Vrei Mobilier Sustenabil?"
- **Studiu de Caz** → "Ai Mobilier de Restaurat?"
- **Unelte** → "Vezi Uneltele în Acțiune?"
- **Design** → "Visezi la Live Edge?"

---

## 📄 **Paginare [...page].astro**

### Caracteristici

```astro
export const getStaticPaths = async ({ paginate }) => {
  const allPosts = await getCollection('blog');
  
  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.data.date) - new Date(a.data.date);
  });

  return paginate(sortedPosts, { pageSize: 6 });
};
```

**Ce face:**
- ✅ Generează pagini multiple automat
- ✅ 6 articole per pagină
- ✅ Sortare cronologică (cele mai noi primul)
- ✅ Navigation cu Previous/Next

**URL-uri generate:**
- `/blog` (pagina 1 - implicit)
- `/blog/2` (pagina 2)
- `/blog/3` (dacă sunt >12 articole)
- etc.

### UI Paginare

```html
<!-- Buton Previous (doar dacă nu e prima pagină) -->
<a href={page.url.prev}>← Anterior</a>

<!-- Numere pagini -->
<a href="/blog">1</a>
<a href="/blog/2">2</a>
<a href="/blog/3">3</a>

<!-- Buton Next (doar dacă nu e ultima pagină) -->
<a href={page.url.next}>Următor →</a>
```

---

## 📊 **Build Output**

```bash
✓ Completed in 1.49s

generating static routes:
  ▶ src/pages/blog/[slug].astro
    ├─ /blog/alegerea-lemnului-potrivit/index.html
    ├─ /blog/arta-imbunarilor-coada-de-randu-nica/index.html
    ├─ /blog/frumusetea-designului-live-edge/index.html
    ├─ /blog/restaurare-credinta-mid-century/index.html
    ├─ /blog/silvicultura-sustenabila/index.html
    └─ /blog/unelte-esentiale-tamplarie/index.html
  
  ▶ src/pages/blog/[...page].astro
    └─ /blog/index.html

✓ 11 page(s) built
```

**Beneficii SSG:**
- ⚡ Ultra-rapid (HTML static pre-generat)
- 🔒 Securitate (no server-side vulnerabilities)
- 💰 Ieftin (poate fi hostat pe CDN gratuit)
- 📈 SEO perfect (crawlable instant)

---

## ✨ **Cum Să Adaugi Articol Nou**

### 1. Creează fișier `.md`

```bash
# Crează în src/content/blog/
touch src/content/blog/nou-articol.md
```

### 2. Adaugă frontmatter și conținut

```markdown
---
title: 'Titlu Articol Nou'
excerpt: 'Descriere scurtă SEO...'
date: '21 Aprilie 2024'
category: 'Tehnici'
image: 'https://images.unsplash.com/...'
readTime: '6 min citire'
draft: false
---

## Primul Heading

Conținut articol în markdown...
```

### 3. Build și testează

```bash
npm run build
npm run preview
```

**Asta e tot!** Astro generează automat:
- ✅ Ruta `/blog/nou-articol`
- ✅ SEO meta tags
- ✅ Schema.org BlogPosting
- ✅ Adaugă în index cu paginare
- ✅ CTA personalizat

---

## 🎯 **Best Practices Respectate**

✅ **Content Collections** - Standardul Astro pentru content management  
✅ **Static Site Generation** - Toate rutele generate la build time  
✅ **Type Safety** - Schema validation cu Zod  
✅ **Markdown** - Content separat de presentation  
✅ **Dynamic Routes** - `[slug].astro` pentru scalabilitate  
✅ **Pagination** - `[...page].astro` pentru liste mari  
✅ **SEO** - Meta tags + Schema.org pe fiecare articol  
✅ **Performance** - Zero JS pentru conținut static  

---

## 📈 **Avantaje vs. Versiunea Veche**

| Aspect | Vechi (.astro) | Nou (Content Collections) |
|--------|----------------|---------------------------|
| **Editare** | Cod Astro | Markdown simplu ✅ |
| **Validare** | Manuală | Automată cu Zod ✅ |
| **Type Safety** | Nu | Da ✅ |
| **Scalabilitate** | Fișier per articol | Dinamic `[slug]` ✅ |
| **Paginare** | Manuală | Automată `[...page]` ✅ |
| **Performance** | Bună | Optimizată SSG ✅ |
| **Portabilitate** | Blocat în Astro | Markdown portabil ✅ |

---

## 🎉 **Blogul Este Acum Production-Grade!**

✅ **6 articole** cu conținut complet (1000-1500 cuvinte)  
✅ **Content Collections** cu validare TypeScript  
✅ **Rute dinamice** cu `getStaticPaths()`  
✅ **Paginare** automată (6 articole/pagină)  
✅ **SEO perfect** pe fiecare articol  
✅ **Build time** 1.49s pentru 11 pagini  
✅ **100% static** HTML - ultra-rapid  

**Website-ul InuWood are acum un blog modern, scalabil și optimizat conform best practices Astro 2024!** 🚀
