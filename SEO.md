# Ghid SEO - InuWood Website

Acest document descrie toate optimizările SEO implementate pe website-ul InuWood.

## 📊 Rezumat SEO

Website-ul InuWood este complet optimizat pentru motoarele de căutare cu:
- ✅ Conținut 100% în limba română
- ✅ Meta tags complete (title, description, keywords)
- ✅ Open Graph tags pentru social media
- ✅ Twitter Cards
- ✅ Structured Data (JSON-LD Schema.org)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ URL-uri canonice
- ✅ Atribute semantice HTML5
- ✅ ARIA labels pentru accesibilitate
- ✅ Imagini cu alt text descriptiv

## 🎯 Cuvinte Cheie Țintite

### Pagina Principală
- mobilier lemn masiv
- tâmplărie artizanală
- mobilier handmade
- design mobilier personalizat
- restaurare mobilier lemn
- atelier lemn Cluj-Napoca

### Pagina Despre Noi
- despre InuWood
- atelier tâmplărie Cluj
- meșteri lemn România
- experiență tâmplărie

### Pagina Produse
- mobilier lemn masiv
- catalog mobilier artizanal
- scaune lemn masiv
- mese lemn natural
- birou lemn masiv

### Pagina Contact
- contact InuWood
- atelier lemn Cluj contact
- comanda mobilier personalizat

### Pagina Blog
- blog tâmplărie
- tehnici lemn masiv
- design mobilier articole

## 🔧 Implementări Tehnice SEO

### 1. Meta Tags (Toate Paginile)

Fiecare pagină include:
```html
<title>Titlu Optimizat | InuWood</title>
<meta name="description" content="..." />
<meta name="keywords" content="..." />
<meta name="robots" content="index, follow, max-image-preview:large" />
<link rel="canonical" href="..." />
```

### 2. Open Graph Tags

Pentru partajare optimizată pe Facebook, LinkedIn:
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="/og-image.svg" />
<meta property="og:locale" content="ro_RO" />
```

### 3. Twitter Cards

Pentru partajare optimizată pe Twitter/X:
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

### 4. Structured Data (JSON-LD)

#### Organization Schema (Layout Global)
- Nume, logo, adresă
- Informații contact
- Social media profiles

#### WebPage Schema (Homepage)
- LocalBusiness cu detalii complete
- GeoCoordinates
- Opening hours
- Price range

#### AboutPage Schema (Despre Noi)
- Informații despre companie
- Founding date
- Knowledge areas

#### Product Schema (Produse)
- ItemList cu toate produsele
- Detalii fiecare produs
- Brand information

#### ContactPage Schema (Contact)
- Business hours
- Contact information
- Address

#### Blog Schema (Blog)
- BlogPosting pentru fiecare articol
- Author, date, category

### 5. Sitemap.xml

Locație: `/public/sitemap.xml`

Conține toate paginile cu:
- URL complet
- Ultima modificare
- Frecvență actualizare
- Prioritate

### 6. Robots.txt

Locație: `/public/robots.txt`

Configurări:
- Allow all pentru motoare majore
- Sitemap reference
- Crawl delay optimizat

## 🚀 Performanță & Core Web Vitals

### Optimizări Implementate

1. **Imagini**
   - Lazy loading pentru toate imaginile
   - Atribute width/height pentru evitarea layout shift
   - Alt text descriptiv în română
   - Format optimizat (WebP prin Unsplash)

2. **Fonturi**
   - Preconnect la Google Fonts
   - Font loading optimizat (media="print" + onload)
   - Fallback sans-serif

3. **JavaScript**
   - Script-uri minime
   - Iconify loaded asincron
   - Intersection Observer pentru animații

4. **HTML**
   - HTML comprimat (compressHTML: true)
   - Semantic HTML5
   - ARIA labels pentru accesibilitate

## 📱 SEO Mobile

- Viewport meta tag configurat
- Design responsive
- Touch targets >= 48px
- Font sizes optimizate pentru mobile

## 🌐 SEO Local (Cluj-Napoca)

Optimizări pentru căutare locală:
- Adresă completă în footer și Contact
- Schema.org LocalBusiness
- GeoCoordinates (46.7712, 23.6236)
- Mențiuni oraș în content
- Business hours în Structured Data

## ✅ Checklist SEO

- [x] Toate paginile au titluri unice și descriptive
- [x] Meta descriptions sub 160 caractere
- [x] Keywords relevante și naturale
- [x] URL-uri clean și descriptive
- [x] Heading hierarchy corectă (H1 → H2 → H3)
- [x] Alt text pentru toate imaginile
- [x] Internal linking între pagini
- [x] External links cu rel="noopener noreferrer"
- [x] Schema.org markup
- [x] Sitemap.xml prezent
- [x] Robots.txt configurat
- [x] Canonical URLs
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Mobile responsive
- [x] Performance optimizat
- [x] ARIA labels pentru accesibilitate
- [x] Semantic HTML

## 🔍 Testare SEO

### Tool-uri Recomandate

1. **Google Search Console**
   - Submit sitemap.xml
   - Monitor indexare
   - Verifică mobile usability

2. **Google PageSpeed Insights**
   - Test performanță
   - Core Web Vitals
   - Mobile vs Desktop

3. **Schema.org Validator**
   - https://validator.schema.org/
   - Verifică structured data

4. **Rich Results Test**
   - https://search.google.com/test/rich-results
   - Test rich snippets

5. **Mobile-Friendly Test**
   - https://search.google.com/test/mobile-friendly

## 📈 Monitorizare Post-Launch

După deployment:
1. Submit sitemap în Google Search Console
2. Verifică indexarea paginilor
3. Monitor poziții cuvinte cheie
4. Analizează trafic organic
5. Verifică Core Web Vitals lunar
6. Update sitemap la adăugare pagini noi

## 🎯 Recomandări Viitoare

1. **Content Marketing**
   - Publică articole blog regulat
   - Actualizează produse cu descrieri detaliate
   - Adaugă testimoniale clienți

2. **Link Building**
   - Directoare locale (Google Business, Yelp România)
   - Parteneriate cu designeri interioare
   - PR local Cluj-Napoca

3. **Technical SEO**
   - Implementează HTTP/2
   - Consideră CDN pentru imagini
   - Monitorizează broken links

4. **Analytics**
   - Implementează Google Analytics 4
   - Tracking conversii formulare
   - Event tracking pentru CTA-uri

---

Website-ul InuWood respectă toate standardele SEO moderne și este gata pentru indexare optimă în motoarele de căutare!
