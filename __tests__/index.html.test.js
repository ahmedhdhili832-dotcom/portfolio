/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.resolve(__dirname, "../index.html"),
  "utf-8"
);

let doc;

beforeEach(() => {
  doc = new DOMParser().parseFromString(html, "text/html");
});

describe("index.html meta and head", () => {
  test("has a DOCTYPE declaration (html string starts with <!DOCTYPE)", () => {
    expect(html.trimStart().startsWith("<!DOCTYPE html>")).toBe(true);
  });

  test("lang attribute is set to en", () => {
    expect(doc.documentElement.getAttribute("lang")).toBe("en");
  });

  test("contains charset meta tag set to UTF-8", () => {
    const charset = doc.querySelector('meta[charset="UTF-8"]');
    expect(charset).not.toBeNull();
  });

  test("contains viewport meta tag", () => {
    const viewport = doc.querySelector('meta[name="viewport"]');
    expect(viewport).not.toBeNull();
    expect(viewport.getAttribute("content")).toContain("width=device-width");
  });

  test("has a title element with content", () => {
    const title = doc.querySelector("title");
    expect(title).not.toBeNull();
    expect(title.textContent.length).toBeGreaterThan(0);
  });

  test("has meta description", () => {
    const desc = doc.querySelector('meta[name="description"]');
    expect(desc).not.toBeNull();
    expect(desc.getAttribute("content").length).toBeGreaterThan(0);
  });

  test("has Open Graph title and description", () => {
    const ogTitle = doc.querySelector('meta[property="og:title"]');
    const ogDesc = doc.querySelector('meta[property="og:description"]');
    expect(ogTitle).not.toBeNull();
    expect(ogDesc).not.toBeNull();
  });

  test("links to styles.css", () => {
    const link = doc.querySelector('link[rel="stylesheet"]');
    expect(link).not.toBeNull();
    expect(link.getAttribute("href")).toBe("styles.css");
  });
});

describe("index.html header and navigation", () => {
  test("has a sticky site-header element", () => {
    expect(doc.querySelector("header.site-header")).not.toBeNull();
  });

  test("header contains brand link with initials AH", () => {
    const mark = doc.querySelector(".brand-mark");
    expect(mark).not.toBeNull();
    expect(mark.textContent.trim()).toBe("AH");
  });

  test("nav contains links to all major sections", () => {
    const nav = doc.querySelector("nav.nav");
    const links = Array.from(nav.querySelectorAll("a")).map((a) =>
      a.getAttribute("href")
    );
    expect(links).toEqual(
      expect.arrayContaining([
        "#services",
        "#skills",
        "#experience",
        "#contact",
      ])
    );
  });
});

describe("index.html hero section", () => {
  test("hero section exists with h1", () => {
    const hero = doc.querySelector("section.hero");
    expect(hero).not.toBeNull();
    expect(hero.querySelector("h1")).not.toBeNull();
  });

  test("hero has email and WhatsApp action buttons", () => {
    const actions = doc.querySelector(".hero-actions");
    const links = Array.from(actions.querySelectorAll("a"));
    const hrefs = links.map((a) => a.getAttribute("href"));
    expect(hrefs.some((h) => h.startsWith("mailto:"))).toBe(true);
    expect(hrefs.some((h) => h.startsWith("https://wa.me/"))).toBe(true);
  });

  test("hero panel has a profile image", () => {
    const img = doc.querySelector(".hero-panel .profile-art");
    expect(img).not.toBeNull();
    expect(img.getAttribute("alt")).toBeTruthy();
  });

  test("stat grid has exactly 3 entries", () => {
    const stats = doc.querySelectorAll(".stat-grid div");
    expect(stats.length).toBe(3);
  });
});

describe("index.html services section", () => {
  test("services section exists with id='services'", () => {
    expect(doc.querySelector("#services")).not.toBeNull();
  });

  test("has 6 service cards", () => {
    const cards = doc.querySelectorAll("#services .card");
    expect(cards.length).toBe(6);
  });

  test("each card has an icon, heading, and description", () => {
    const cards = doc.querySelectorAll("#services .card");
    cards.forEach((card) => {
      expect(card.querySelector(".card-icon")).not.toBeNull();
      expect(card.querySelector("h3")).not.toBeNull();
      expect(card.querySelector("p")).not.toBeNull();
    });
  });
});

describe("index.html skills section", () => {
  test("skills section exists with id='skills'", () => {
    expect(doc.querySelector("#skills")).not.toBeNull();
  });

  test("tag-list contains at least 5 skill tags", () => {
    const tags = doc.querySelectorAll(".tag-list span");
    expect(tags.length).toBeGreaterThanOrEqual(5);
  });

  test("language box lists Arabic, French, and English", () => {
    const rows = doc.querySelectorAll(".language-row");
    const langs = Array.from(rows).map(
      (r) => r.querySelector("span").textContent
    );
    expect(langs).toEqual(expect.arrayContaining(["Arabic", "French", "English"]));
  });
});

describe("index.html experience/focus section", () => {
  test("experience section exists with id='experience'", () => {
    expect(doc.querySelector("#experience")).not.toBeNull();
  });

  test("focus-list has at least 3 items", () => {
    const items = doc.querySelectorAll(".focus-list div");
    expect(items.length).toBeGreaterThanOrEqual(3);
  });
});

describe("index.html contact section", () => {
  test("contact section exists with id='contact'", () => {
    expect(doc.querySelector("#contact")).not.toBeNull();
  });

  test("contact has email link", () => {
    const contact = doc.querySelector("#contact");
    const mailto = contact.querySelector('a[href^="mailto:"]');
    expect(mailto).not.toBeNull();
  });

  test("contact has WhatsApp link", () => {
    const contact = doc.querySelector("#contact");
    const wa = contact.querySelector('a[href^="https://wa.me/"]');
    expect(wa).not.toBeNull();
  });

  test("contact has GitHub profile link", () => {
    const gh = doc.querySelector(".github-card");
    expect(gh).not.toBeNull();
    expect(gh.getAttribute("href")).toContain("github.com");
  });
});

describe("index.html footer", () => {
  test("footer exists with class site-footer", () => {
    expect(doc.querySelector("footer.site-footer")).not.toBeNull();
  });

  test("footer has #year span for dynamic year", () => {
    const yearSpan = doc.querySelector("footer #year");
    expect(yearSpan).not.toBeNull();
  });

  test("footer has back-to-top link", () => {
    const footer = doc.querySelector("footer.site-footer");
    const topLink = footer.querySelector('a[href="#top"]');
    expect(topLink).not.toBeNull();
  });
});

describe("index.html accessibility", () => {
  test("all images have alt attributes", () => {
    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      expect(img.hasAttribute("alt")).toBe(true);
    });
  });

  test("nav has aria-label", () => {
    const nav = doc.querySelector("nav.nav");
    expect(nav.getAttribute("aria-label")).toBeTruthy();
  });

  test("script tag references script.js", () => {
    const script = doc.querySelector('script[src="script.js"]');
    expect(script).not.toBeNull();
  });

  test("external links have rel='noreferrer'", () => {
    const externalLinks = doc.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach((link) => {
      expect(link.getAttribute("rel")).toContain("noreferrer");
    });
  });
});
