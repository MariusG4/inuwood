import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const site = 'https://inuwood.ro';

export const GET: APIRoute = async () => {
  const blogPosts = await getCollection('blog', ({ data }) => data.draft !== true);
  const products = await getCollection('products', ({ data }) => data.draft !== true);

  const blogLines = blogPosts
    .map((p) => `- [${p.data.title}](${site}/blog/${p.id}) — ${p.data.excerpt}`)
    .join('\n');

  const productLines = products
    .map((p) => `- [${p.data.title}](${site}/products/${p.id}) — ${p.data.category}, lemn ${p.data.wood}. ${p.data.excerpt}`)
    .join('\n');

  const body = `# InuWood — Atelier de Tâmplărie Artizanală din Bacău, România

## Definiție Entitate
InuWood (inuwood.ro) este prezența online autorizată a unui **atelier de tâmplărie artizanală** din Bacău, România. Fondat în 2002, atelierul se specializează în mobilier personalizat realizat cu tehnici tradiționale de îmbinare (cep și gaură, coadă de rândunică, îmbinări în degete) și lemn local din surse sustenabile. Fiecare piesă este lucrată manual în atelier; fără producție de masă sau prelucrare exclusivă CNC.

## Autoritate Tematică
Acest site acoperă următorul cluster de subiecte cu expertiză originală și documentare de proiect:
- Design și construcție mobilier din lemn masiv (mese, scaune, dulapuri, birouri, rafturi, oglinzi)
- Tehnici tradiționale românești de îmbinare și finisare manuală
- Design mobilier live edge și lucrări cu inserții de rășină
- Restaurare mobilier antic și mid-century
- Silvicultură sustenabilă și proveniență responsabilă a lemnului (stejar, nuc, cireș, arțar, frasin)
- Ghiduri de alegere a lemnului în funcție de durabilitate, fibră și aplicație
- Finisaje naturale non-toxice (ulei de in, ceară de albine, lacuri ecologice)

## Prezentare Generală
Acest website prezintă un portofoliu de piese de mobilier finalizate, documentează procesul și filosofia atelierului, publică articole educaționale despre tâmplărie și știința materialelor, și oferă un canal direct pentru comenzi personalizate și cereri de restaurare de la clienți din România și UE.

## Public Țintă
Conținutul este destinat persoanelor și designerilor de interior care apreciază autenticitatea, longevitatea și meșteșugul local. Nevoi comune adresate:
- Găsirea de mobilier durabil și non-toxic pentru case de familie
- Comandarea de mese de dining sau birouri personalizate cu dimensiuni și lemn la alegere
- Restaurarea mobilierului vintage moștenit la o frumusețe funcțională
- Achiziționarea de piese statement live edge sau cu accente de rășină
- Învațarea despre fibră lemnului, tehnici de finisare și surse sustenabile

## Servicii Principale
Oferim mobilier din lemn masiv lucrat manual și servicii de restaurare, fiecare piesă creată individual în atelierul nostru din Bacău.
- **Mobilier Personalizat**: Mese, birouri, dulapuri, rafturi, oglinzi, paturi — la dimensiunile și lemnul dorit de client.
- **Restaurare**: Reparație structurală, reconstrucție îmbinări, refacere finisaje pentru piese vintage și mid-century.
- **Live Edge și Rășină**: Mese dintr-o singură placă și piese decorative care păstrează marginea naturală a copacului, cu inserții opționale de rășină epoxidică.
- **Accesorii**: Tocătoare, platouri de servire, standuri monitor, trofee, suporturi de umbrele.
- **Finisaje Naturale**: Ulei de in alimentar, ceară de albine, lac poliuretanic mat — aplicate manual în mai multe straturi.

## Catalog Produse (${products.length})

${productLines}

## Articole Blog (Catalog Complet) (${blogPosts.length})

${blogLines}

## Link-uri Importante
- **Pagina Principală**: ${site}/
- **Catalog Produse**: ${site}/products
- **Blog**: ${site}/blog
- **Despre Atelier**: ${site}/about
- **Contact și Comenzi**: ${site}/contact
- **Harta Site-ului**: ${site}/sitemap.xml
- **Robots.txt**: ${site}/robots.txt

## Detalii Atelier
- **Adresă**: Str. Meșteșugului nr. 24, Bacău, BC 600001, România
- **Telefon**: +40 234 555 198
- **Email**: contact@inuwood.ro
- **Program**: Luni–Vineri 9:00–17:00, Sâmbătă 10:00–15:00
- **Anul înființării**: 2002

## Politici
- Toate piesele sunt realizate la comandă; termenul de execuție variază în funcție de complexitate (de regulă 4–12 săptămâni).
- Lemnul provine din silvicultură locală sustenabilă; certificate disponibile la cerere.
- Finisajele naturale sunt non-toxice și sigure pentru alimente, acolo unde este cazul.
- Proiectele de restaurare includ o evaluare structurală înainte de ofertare.
- Livrare disponibilă în România și UE; ridicare personală disponibilă în Bacău.
- Formularul de contact și formularele de cerere pentru produse sunt gestionate prin Netlify Forms.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
