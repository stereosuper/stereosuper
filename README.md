# Stereosuper

## Adding a portfolio item

### SLUG
Choisissez pour l'item une version simple et sans charactères spéciaux de son nom, qui servira un peu partout, et que j'appellerai [SLUG] ensuite.

### IMAGES
- Dans le dossier /img/ ajouter l'image qui servira dans l'accueil, nom: bg-[SLUG].png (ou .jpg), width: 960, height: 150
- Dans le dossier /portfolio/ ajouter l'image desktop retina, nom: cover-[SLUG]@2.png (ou .jpg), width: 2000; l'image desktop non retina, nom: cover-[SLUG].png (ou .jpg), width: 1000; l'image responsive, nom: mb-cover-[SLUG].png, width: 1100
- Générer le logo avec icomoon, l'importer en svg dans le projet, puis cliquer sur "generate svg & more", "download", et copier le < symbol > correspondant dans le fichier depuis icomoon/symbol-defs.svg vers src/templates/layout/layout.html.twig

- Si "souvenir", créer la silhouette de l'image cover, en noir, meme dimensions (avec du vide à la place des ombres), dans /img/portfolio/, nom: bg-[SLUG]-mask.svg

### HTML - Index
Dans /templates/layout/layout.html.twig, ajouter dans le svg sous le footer le symbol svg du logo précédemment généré avec icomoon, et relever son id.
Puis dans templates/index.html.twig:
- Ajouter un nouveau < li > en première position dans le ul class='portfolio-items'
- Classes du li: portfolio-item [SLUG]-item
- Ajouter également le [SLUG] en id
- Compléter avec les skills voulues, virgule entre chaque, sans espaces (strategy,identity,design,animation,dev)
- Mettre l'url dans le href, le nom entier dans le .logo et le .title, l'id de l'icone svg dans le use xlink:href, la date dans le time (et dans l'attribut datetime), ajouter l'icone souvenir si nécessaire

### HTML - Page portfolio
- Créer un nouveau fichier twig appelé [URL_NAME].html.twig dans le dossier /templates/
- Remplir le block "portfolio_slug" avec le [SLUG]
- Remplir les block "title" et "description" correspondent aux balises title, og:title et meta description, og:description
- Remplir la variable og_url avec le nom de fichier
- Remplir la variable url_en (si fr) ou url_fr (si en) avec l'url complete correspondante
- Remplir les block "portfolio_title", "portfolio_text" et "portfolio_role" qui correspondent aux textes du contenu (ne pas ajouter d'images ici, elles seront automatiquement ajoutées)
- Remplir la variable "cover_ext" avec l'extension de l'image détail desktop
- Remplir la variable "cover_class" selon le placement souhaité de l'image (pas besoin pour les images non détourées): centered (ordi avec bras sur les cotés), portrait (exemple: iadvize), top (venant du haut), left (venant de la gauche), souvenir; si ces classes ne sont pas suffisantes, vous pouvez en ajouter une custom puis l'utliser dans /pages/_portfolio.scss (vers la ligne 157)
- Remplir les variables "strategy", "identity", "design", "animation", "dev" avec true (la compétence s'affichera) ou false
- Remplir la variable "website" avec true pour afficher un bouton menant vers un lien que l'on remplit dans le block "portfolio_url"
- Remplir les variables "prev_ref_link" et "next_ref_link" avec les liens des items de portfolio suivants et précédents et "prev_ref_name" et "next_ref_name" avec leurs noms (affichés dans le lien)

### SASS
A chaque ajout d'un item il faut compléter plusieurs variables dans le fichier /abstracts/_variables.scss:
- $portfolio: ajouter le [SLUG], la couleur du nouvel item, la largeur affichée du logo, la hauteur affichée du logo, l'extension de l'image qui apparaitra en home
- si "souvenir", $portfolioSouvenir: [SLUG]
