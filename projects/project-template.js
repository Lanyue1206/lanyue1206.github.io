
const projects = [
  {
    id: "atlanta",
    number: "02",
    title: "Atlanta: A Geographic Overview",
    category: "Signature Map / GIS Visualization",
    image: "p2-atlanta.png",
    alt: "Four thematic maps of Atlanta, Georgia",
    description: [
      "This project explores the physical and human geography of Atlanta, Georgia, through four thematic maps: topography, hydrography, population density, and transportation networks.",
      "Using data from the USGS and U.S. Census Bureau, I developed a consistent map layout to compare different geographic characteristics of the city. I processed elevation data to visualize terrain, mapped streams and waterbodies, classified population density, and symbolized major transportation routes.",
      "The four-panel design highlights relationships between Atlanta's physical landscape and urban development, particularly the concentration of population and transportation infrastructure."
    ],
    info: {
      Year: "2026",
      Software: "ArcGIS Pro",
      Methods: "DEM Processing, Terrain Visualization, Choropleth Mapping, Transportation Mapping",
      Data: "USGS; U.S. Census Bureau",
      Category: "GIS & Cartography"
    },
    previous: {
      title: "Open Space in the Tri-Metro Region",
      url: "open-space.html"
    },
    next: "hydrography"
  },

  {
    id: "hydrography",
    number: "03",
    title: "Hydrography and Parks",
    category: "Hydrology / Cartographic Generalization",
    image: "a5-hydrography.png",
    alt: "Portland hydrography and parks map",
    description: [
      "This project focuses on simplifying and visualizing the hydrological network of the Portland Tri-Metro region.",
      "Using ArcGIS Pro, I applied cartographic generalization techniques to reduce unnecessary stream detail while preserving the overall structure of the river network. I tested seven line simplification tolerances and selected 1,200 feet to balance visual clarity and geographic detail.",
      "I also filtered smaller waterbodies and integrated the resulting hydrographic features with terrain and park boundaries. The final map combines shaded relief, rivers, lakes, and recreational areas to illustrate the region's physical landscape."
    ],
    info: {
      Year: "2026",
      Software: "ArcGIS Pro",
      Methods: "Stream Simplification, Feature Selection, Hydrographic Generalization, Hillshade",
      Data: "GEOG 455 Portland GIS datasets",
      Category: "Hydrology & Cartography"
    },
    previous: "atlanta",
    next: "choropleth"
  },

  {
    id: "choropleth",
    number: "04",
    title: "Choropleth Classification Methods",
    category: "Thematic Cartography / Population Density",
    image: "a3-choropleth.jpg",
    alt: "Four choropleth maps comparing classification methods",
    description: [
      "This project explores how different classification methods affect the visual representation of population density in the Portland Tri-Metro region.",
      "Using 2010 census tract population data, I calculated population density and created four choropleth maps using Quantile, Jenks Natural Breaks, Equal Interval, and Geometric Interval classification. Each map uses the same geographic extent, color scheme, and number of classes to allow direct comparison.",
      "The results show how classification choices influence the visibility of high-density areas and broader spatial patterns, highlighting the importance of appropriate data classification in thematic cartography."
    ],
    info: {
      Year: "2026",
      Software: "ArcGIS Pro",
      Methods: "Population Density Calculation, Jenks Natural Breaks, Quantile, Equal Interval, Geometric Interval",
      Data: "2010 Census Tract Population; GEOG 455 GIS datasets",
      Category: "Thematic Cartography"
    },
    previous: "hydrography",
    next: "transportation"
  },

  {
    id: "transportation",
    number: "05",
    title: "Tri-Metro Regional Transportation Map",
    category: "Transportation / Cartographic Design",
    image: "a6-transportation.png",
    alt: "Regional transportation map of Portland, Oregon",
    description: [
      "This project presents a regional transportation map of Portland, Oregon, integrating road networks with terrain, waterways, vegetation, and major landmarks.",
      "Using ArcGIS Pro, I organized roads into different categories and applied a visual hierarchy to distinguish freeways, highways, primary roads, and secondary roads. I also incorporated shaded terrain, major water features, park areas, and a locator map to provide geographic context.",
      "Careful symbolization and labeling were used to balance transportation detail with readability. The final map illustrates how multiple geographic datasets can be combined into a coherent cartographic product."
    ],
    info: {
      Year: "2026",
      Software: "ArcGIS Pro",
      Methods: "Transportation Symbolization, Road Classification, Terrain Visualization, Cartographic Labeling",
      Data: "GEOG 455 Portland GIS datasets",
      Category: "Transportation & Cartography"
    },
    previous: "choropleth",
    next: "population"
  },

  {
    id: "population",
    number: "06",
    title: "Population Distribution",
    category: "Proportional Symbols / Dot Density",
    image: "a2-population.png",
    alt: "Four population distribution maps of Portland",
    description: [
      "This project compares four cartographic techniques for representing population distribution in the Portland Tri-Metro area.",
      "Using 2010 population data, I created maps with directly scaled proportional symbols, Flannery-compensated symbols, classified proportional symbols, and dot density. Each approach emphasizes different aspects of population distribution, from the magnitude of population counts to their spatial concentration.",
      "By arranging the four maps in a consistent layout, I examined how symbol size, classification, and visual perception influence the interpretation of demographic information. The project demonstrates the importance of choosing appropriate visual representations when communicating quantitative geographic data."
    ],
    info: {
      Year: "2026",
      Software: "ArcGIS Pro",
      Methods: "Proportional Symbol Mapping, Flannery Compensation, Classified Symbols, Dot Density",
      Data: "2010 Population Data; GEOG 455 GIS datasets",
      Category: "Population & Cartography"
    },
    previous: "transportation",
    next: null
  }
];

const projectId = document.body.dataset.project;
const project = projects.find(p => p.id === projectId);
const root = document.getElementById("project-root");

function projectLink(id) {
  if (!id) return null;
  if (typeof id === "object") return id;

  const item = projects.find(p => p.id === id);
  return item
    ? { title: item.title, url: item.id + ".html" }
    : null;
}

if (project && root) {
  document.title = project.title + " — Lanyue Zhang";

  const infoHTML = Object.entries(project.info)
    .map(([label, value]) => `
      <dt>${label}</dt>
      <dd>${value}</dd>
    `).join("");

  const descriptionHTML = project.description
    .map(paragraph => `<p>${paragraph}</p>`)
    .join("");

  const previous = projectLink(project.previous);
  const next = projectLink(project.next);

  root.innerHTML = `
    <header class="site-header">
      <nav class="nav container" aria-label="Main navigation">
        <a class="logo" href="../index.html">LANYUE ZHANG</a>
        <div class="nav-links">
          <a href="../index.html">Home</a>
          <a class="active" href="../work.html">Work</a>
          <a href="../research.html">Research</a>
          <a href="../about.html">About</a>
          <a href="../contact.html">Contact</a>
        </div>
      </nav>
    </header>

    <main class="container detail-page">

      <a class="back-link" href="../work.html">
        ← ALL WORK / 2026
      </a>

      <div class="project-layout">

        <div>
          <button class="map-button" id="enlargeMap"
                  aria-label="Enlarge project map">
            <img class="map-large"
                 src="../images/${project.image}"
                 alt="${project.alt}">
          </button>

          <p class="zoom-caption">
            Click the map to view the full-resolution image.
          </p>
        </div>

        <div class="detail-info">
          <p class="eyebrow">
            PROJECT ${project.number} / ${project.category}
          </p>

          <h1>${project.title}</h1>

          <div class="info-block">
            <div class="info-heading">Description</div>
            ${descriptionHTML}
          </div>

          <div class="info-block">
            <div class="info-heading">Project Information</div>
            <dl class="metadata">${infoHTML}</dl>
          </div>
        </div>

      </div>

      <div class="project-navigation">
        <div>
          ${previous ? `
            <a href="${previous.url}">
              <span>← PREVIOUS PROJECT</span>
              <strong>${previous.title}</strong>
            </a>` : ""}
        </div>

        <div class="next-project">
          ${next ? `
            <a href="${next.url}">
              <span>NEXT PROJECT →</span>
              <strong>${next.title}</strong>
            </a>` : ""}
        </div>
      </div>
    </main>

    <footer class="site-footer">
      <div class="container footer-inner">
        <span>© Lanyue Zhang</span>
        <span>Portfolio</span>
      </div>
    </footer>

    <dialog id="mapDialog" class="map-dialog"
            aria-label="Enlarged project map">
      <button class="dialog-close" id="closeDialog"
              aria-label="Close enlarged map">×</button>
      <img src="../images/${project.image}"
           alt="${project.alt}">
    </dialog>
  `;

  const dialog = document.getElementById("mapDialog");

  document.getElementById("enlargeMap")
    .addEventListener("click", () => dialog.showModal());

  document.getElementById("closeDialog")
    .addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
}

/* Shared project page styling */

const styles = document.createElement("style");
styles.textContent = `
  .detail-page {
    padding-top: 55px;
    padding-bottom: 110px;
  }

  .back-link {
    font-size: 12px;
    color: #777;
    letter-spacing: 0.04em;
  }

  .project-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    gap: 65px;
    align-items: start;
    margin-top: 55px;
  }

  .map-button {
    border: none;
    padding: 0;
    background: none;
    width: 100%;
    cursor: zoom-in;
    text-align: left;
  }

  .map-large {
    display: block;
    width: 100%;
    height: auto;
    background: #efeee9;
  }

  .zoom-caption {
    font-size: 12px;
    color: #777;
    margin-top: 12px;
  }

  .detail-info {
    position: sticky;
    top: 35px;
  }

  .detail-info h1 {
    font-family: var(--serif);
    font-size: clamp(42px, 4vw, 65px);
    font-weight: 600;
    line-height: 1.08;
    margin: 15px 0 35px;
  }

  .detail-info p {
    font-size: 14px;
    color: #484848;
    line-height: 1.9;
  }

  .info-heading {
    font-size: 11px;
    font-weight: 600;
    color: #777;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 15px;
  }

  .info-block {
    border-top: 1px solid var(--line);
    padding-top: 23px;
    margin-top: 28px;
  }

  .metadata {
    display: grid;
    grid-template-columns: 95px 1fr;
    gap: 12px;
    font-size: 13px;
    line-height: 1.7;
    margin: 0;
  }

  .metadata dt {
    color: #888;
  }

  .metadata dd {
    margin: 0;
    overflow-wrap: anywhere;
  }

  .project-navigation {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    border-top: 1px solid var(--line);
    margin-top: 75px;
    padding-top: 30px;
  }

  .project-navigation a {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .project-navigation span {
    color: #888;
    font-size: 11px;
    letter-spacing: 0.08em;
  }

  .project-navigation strong {
    font-family: var(--serif);
    font-size: 25px;
    font-weight: 500;
  }

  .next-project {
    text-align: right;
  }

  .map-dialog {
    position: fixed;
    inset: 0;
    width: 96vw;
    height: 94vh;
    max-width: none;
    max-height: none;
    padding: 65px 20px 25px;
    border: 0;
    background: #171717;
    overflow: auto;
    text-align: center;
  }

  .map-dialog::backdrop {
    background: rgba(0,0,0,0.85);
  }

  .map-dialog img {
    display: block;
    width: auto;
    max-width: none;
    height: auto;
    margin: 0 auto;
  }

  .dialog-close {
    position: sticky;
    top: -45px;
    float: right;
    background: #171717;
    color: white;
    border: 0;
    font-size: 30px;
    cursor: pointer;
    z-index: 2;
  }

  @media (max-width: 800px) {
    .project-layout {
      grid-template-columns: 1fr;
      gap: 35px;
    }

    .detail-info {
      position: static;
    }

    .detail-page {
      padding-top: 35px;
    }

    .project-navigation strong {
      font-size: 20px;
    }
  }
`;

document.head.appendChild(styles);
