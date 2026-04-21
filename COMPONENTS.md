# Ghid Componente InuWood

Documentația pentru toate componentele reutilizabile ale website-ului InuWood.

## 📁 Structura Componentelor

```
src/components/
├── SEO/
│   ├── SEOHead.astro              # Meta tags complete (title, OG, Twitter)
│   ├── OrganizationSchema.astro   # Schema.org Organization
│   └── LocalBusinessSchema.astro  # Schema.org LocalBusiness
├── UI/
│   ├── Hero.astro                 # Hero section reutilizabil
│   ├── SectionHeader.astro        # Header-e pentru secțiuni
│   ├── ProductCard.astro          # Card produs cu Schema.org
│   ├── BlogCard.astro             # Card articol blog
│   └── CTASection.astro           # Call-to-action section
├── Navigation.astro               # Navigare principală
└── Footer.astro                   # Footer global
```

---

## 🎯 Componente SEO

### 1. SEOHead.astro

**Scop**: Meta tags complete pentru toate paginile (Title, Description, OG, Twitter Cards)

**Utilizare**:
```astro
<SEOHead 
  title="Titlu Pagină"
  description="Descriere optimizată SEO..."
  keywords="keyword1, keyword2, keyword3"
  ogImage="/og-image.svg"
  ogType="website"
  canonicalURL="https://inuwood.ro/page"
  noindex={false}
/>
```

**Props**:
- `title` (string, required) - Titlul paginii
- `description` (string, optional) - Descriere meta (default: descriere generică)
- `keywords` (string, optional) - Keywords SEO
- `ogImage` (string, optional) - Imagine pentru social sharing (default: '/og-image.svg')
- `ogType` (string, optional) - Tip Open Graph (default: 'website')
- `canonicalURL` (string, optional) - URL canonic (default: URL curent)
- `noindex` (boolean, optional) - Previne indexarea (default: false)

**Output**:
- Title tag
- Meta tags (description, keywords, author, robots)
- Canonical link
- Favicon links
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Theme color

---

### 2. OrganizationSchema.astro

**Scop**: Schema.org Organization markup pentru informații business globale

**Utilizare**:
```astro
<OrganizationSchema />
```

**Props**: Niciunul (toate datele sunt hard-coded)

**Output JSON-LD**:
- Organization type
- Name: InuWood
- URL, logo
- Address: Bacău, BC 600001
- Contact: telefon, email
- Social media links

**Unde se folosește**: În Layout.astro (global pe toate paginile)

---

### 3. LocalBusinessSchema.astro

**Scop**: Schema.org pentru LocalBusiness cu program și locație

**Utilizare**:
```astro
<LocalBusinessSchema includedIn="WebPage" />
<LocalBusinessSchema includedIn="ContactPage" />
```

**Props**:
- `includedIn` ('WebPage' | 'ContactPage') - Tipul de pagină

**Output JSON-LD**:
- WebPage sau ContactPage type
- LocalBusiness cu:
  - Adresă Bacău
  - GeoCoordinates (lat: 46.5670, long: 26.9146)
  - Telefon: +40 234 555 198
  - Program: L-V 9-17, Sâ 10-15
  - Price range: $$-$$$

**Unde se folosește**:
- Homepage (includedIn="WebPage")
- Contact page (includedIn="ContactPage")

---

## 🎨 Componente UI

### 4. Hero.astro

**Scop**: Hero section reutilizabil pentru toate paginile

**Utilizare**:
```astro
<Hero 
  label="Label Opțional"
  heading="Titlu Mare"
  description="Descriere detaliată..."
  ariaLabelledBy="heading-id"
  minHeight="min-h-[60vh]"
/>
```

**Props**:
- `label` (string, optional) - Label mic deasupra heading-ului
- `heading` (string, required) - Titlul principal (H1)
- `description` (string, required) - Paragraf descriptiv
- `ariaLabelledBy` (string, optional) - ID pentru ARIA (default: 'hero-heading')
- `minHeight` (string, optional) - Clasa Tailwind pentru înălțime (default: 'min-h-[60vh]')

**Features**:
- Responsive typography (6xl-8xl)
- Reveal animation
- Max-width pentru descriere
- Semantic HTML (section + h1 + p)

---

### 5. SectionHeader.astro

**Scop**: Header consistent pentru secțiuni

**Utilizare**:
```astro
<SectionHeader 
  label="Label Secțiune"
  heading="Titlu Secțiune"
  headingId="section-id"
  alignment="center"
/>
```

**Props**:
- `label` (string, required) - Label util-label
- `heading` (string, required) - Titlu H2
- `headingId` (string, optional) - ID pentru heading
- `alignment` ('left' | 'center', optional) - Aliniere (default: 'left')

**Features**:
- Typography consistent (5xl-7xl)
- Reveal animation
- Util-label styling
- Text-center când alignment="center"

---

### 6. ProductCard.astro

**Scop**: Card produs cu Schema.org Product markup

**Utilizare**:
```astro
<ProductCard 
  title="Nume Produs"
  category="Categorie"
  wood="Tip Lemn"
  year="2024"
  image="https://..."
  alt="Descriere imagine"
  delay={100}
/>
```

**Props**:
- `title` (string, required) - Numele produsului
- `category` (string, required) - Categoria (Scaune, Mese, etc)
- `wood` (string, required) - Tip lemn (Nuc, Stejar, etc)
- `year` (string, required) - Anul realizării
- `image` (string, required) - URL imagine
- `alt` (string, required) - Alt text pentru imagine
- `delay` (number, optional) - Delay pentru animație (default: 0)

**Features**:
- Aspect ratio 3:4
- Grayscale → color la hover
- Scale animation la hover
- Lazy loading imagine
- Schema.org Product markup
- Reveal animation cu delay

---

### 7. BlogCard.astro

**Scop**: Card articol blog cu Schema.org BlogPosting

**Utilizare**:
```astro
<BlogCard 
  title="Titlu Articol"
  excerpt="Rezumat scurt..."
  date="15 Martie 2024"
  category="Tehnici"
  image="https://..."
  readTime="5 min citire"
  slug="titlu-articol"
  delay={50}
/>
```

**Props**:
- `title` (string, required) - Titlul articolului
- `excerpt` (string, required) - Rezumat
- `date` (string, required) - Data publicării
- `category` (string, required) - Categoria
- `image` (string, required) - URL imagine
- `readTime` (string, required) - Timp estimat citire
- `slug` (string, required) - URL slug pentru link
- `delay` (number, optional) - Delay animație (default: 0)

**Features**:
- Aspect ratio 4:3
- Scale animation la hover
- Schema.org BlogPosting
- Link către `/blog/{slug}`
- Meta info (category, date, readTime)

---

### 8. CTASection.astro

**Scop**: Call-to-action section reutilizabil

**Utilizare**:
```astro
<CTASection 
  heading="Titlu CTA"
  description="Descriere motivațională..."
  ctaText="Buton Text"
  ctaLink="/contact"
  ctaAriaLabel="Label accesibilitate"
  backgroundColor="bg-accent"
/>
```

**Props**:
- `heading` (string, required) - Titlul CTA
- `description` (string, required) - Descriere
- `ctaText` (string, required) - Textul butonului
- `ctaLink` (string, required) - Link-ul butonului
- `ctaAriaLabel` (string, optional) - ARIA label (default: ctaText)
- `backgroundColor` (string, optional) - Culoare de fundal (default: 'bg-accent')

**Features**:
- Culori adaptative bazate pe background
- Responsive padding
- Reveal animation
- Max-width pentru descriere
- Icon arrow

---

## 🔧 Cum să Folosești Componentele

### Exemplu: Pagină Nouă

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/UI/Hero.astro';
import SectionHeader from '../components/UI/SectionHeader.astro';
import CTASection from '../components/UI/CTASection.astro';
import LocalBusinessSchema from '../components/SEO/LocalBusinessSchema.astro';

const pageTitle = "Pagină Nouă - InuWood";
const pageDescription = "Descriere SEO...";
---

<Layout 
  title={pageTitle}
  description={pageDescription}
>
  <Hero 
    label="Label"
    heading="Pagină Nouă"
    description="Descriere hero..."
  />

  <section class="py-32 px-6 bg-secondary-bg">
    <div class="max-w-[1440px] mx-auto">
      <SectionHeader 
        label="Secțiune"
        heading="Titlu Secțiune"
      />
      
      <!-- Conținut -->
    </div>
  </section>

  <CTASection 
    heading="Call to Action"
    description="Text motivațional..."
    ctaText="Contactează-ne"
    ctaLink="/contact"
  />

  <LocalBusinessSchema includedIn="WebPage" />
</Layout>
```

---

## ✅ Best Practices

1. **Folosește întotdeauna componentele UI** pentru consistență
2. **Nu duplica cod** - dacă vezi pattern repetat, creează component
3. **SEO components** sunt obligatorii pe fiecare pagină
4. **Props validation** - verifică TypeScript errors
5. **Accessibility** - toate componentele au ARIA labels

---

## 🚀 Beneficii Componente

✅ **Reutilizabilitate** - Scrii o dată, folosești peste tot  
✅ **Consistență** - Design uniform pe tot site-ul  
✅ **Ușor de editat** - Modifici într-un singur loc  
✅ **SEO automat** - Schema.org inclus  
✅ **Type-safe** - Props cu TypeScript  
✅ **Performance** - Code-splitting automat  

---

Website-ul InuWood este acum 100% bazat pe componente reutilizabile!
